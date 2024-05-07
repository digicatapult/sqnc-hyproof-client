#!/usr/bin/env -S node --no-warnings
/* eslint-disable no-console */

import { randomUUID } from 'node:crypto'

const hydrogenProducerAlias = 'Heidi'
const energyProviderAlias = 'Emma'
const regulatorAlias = 'Reginald'
const numberCertificatesToIssue = 3

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function makeRandomCert() {
  const minDate = new Date('2023-01-01').getTime()
  const maxDate = new Date('2023-12-01').getTime()

  const productionStartTimestamp = Math.round(
    minDate + Math.random() * (maxDate - minDate)
  )
  const productionEndTimestamp =
    productionStartTimestamp + 7 * 24 * 60 * 60 * 1000

  const batchSize = 1000 * Math.round(1000 + Math.random() * 9000)
  const energyConsumed = batchSize * 1.5

  return {
    energy_consumed_wh: energyConsumed,
    production_start_time: new Date(productionStartTimestamp).toISOString(),
    production_end_time: new Date(productionEndTimestamp).toISOString(),
    energy_owner: energyProviderAlias,
    regulator: regulatorAlias,
    hydrogen_quantity_wh: batchSize,
  }
}

async function checkServiceHealth(serviceName, port) {
  console.log(`Checking health of service ${serviceName} on port ${port}`)

  const healthEndpoint = `http://localhost:${port}/health`

  try {
    const result = await fetch(healthEndpoint)

    if (result.ok) {
      console.log(`Service ${serviceName} is healthy`)
      return true
    }
    const errorBody = await result.text()

    const errorMessage = `Service ${serviceName} is unhealthy. Status: ${result.status}, body ${errorBody}`
    console.error(errorMessage)
    return false
  } catch (e) {
    const errorMessage = `Service ${serviceName} is unhealthy. Error thrown: ${e?.message}`
    console.error(errorMessage)
    return false
  }
}

async function getSelfIdentity(port) {
  const selfEndpoint = `http://localhost:${port}/v1/self`
  const result = await fetch(selfEndpoint)

  if (!result.ok) {
    const message = `Unexpected error getting self address: ${result.statusText}`
    console.error(message)
    throw new Error(message)
  }

  const body = await result.json()
  return body.address
}

async function setIdentity(address, alias, port) {
  const setAliasEndpoint = `http://localhost:${port}/v1/members/${address}`
  const result = await fetch(setAliasEndpoint, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ alias }),
  })

  if (!result.ok) {
    const message = `Error setting alias for address ${address} to ${alias} on port ${port}. Error was ${result.statusText}`
    console.error(message)
    throw new Error(message)
  }
}

async function setIdentities(identityMap, port) {
  const { hydrogenSelf, energySelf, regulatorSelf } = identityMap
  // first set the alias to a random alias as the API returns a 409 if it's already set
  await Promise.all([
    setIdentity(hydrogenSelf, randomUUID(), port),
    setIdentity(energySelf, randomUUID(), port),
    setIdentity(regulatorSelf, randomUUID(), port),
  ])
  // now set the alias to the value we want
  await Promise.all([
    setIdentity(hydrogenSelf, hydrogenProducerAlias, port),
    setIdentity(energySelf, energyProviderAlias, port),
    setIdentity(regulatorSelf, regulatorAlias, port),
  ])
}

async function waitForCertificateState(certificateId, state, port) {
  const txEndpoint = `http://localhost:${port}/v1/certificate/${certificateId}`
  for (let timeout = 0; timeout < 20000; timeout += 100) {
    const result = await fetch(txEndpoint)
    if (!result.ok && result.status !== 404) {
      const message = `Error getting certificate ${certificateId} on port ${port}. Error was ${result.statusText}`
      console.error(message)
      throw new Error(message)
    }
    const body = await result.json()
    if (body.state === state) {
      return body
    }
    await delay(100)
  }
  const message = `Timeout waiting for state ${state} on certificate ${certificateId} for port ${port}`
  console.error(message)
  throw new Error(message)
}

async function initiateCertificate(hydrogenProducerPort, energyProviderPort) {
  const createCertEndpoint = `http://localhost:${hydrogenProducerPort}/v1/certificate`
  const baseCert = makeRandomCert()
  const createResult = await fetch(createCertEndpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(baseCert),
  })
  if (!createResult.ok) {
    const message = `Error creating certificate on port ${hydrogenProducerPort}. Error was ${createResult.statusText}`
    console.error(message)
    throw new Error(message)
  }

  const { id: certId } = await createResult.json()

  const initEndpoint = `http://localhost:${hydrogenProducerPort}/v1/certificate/${certId}/initiation`
  const initResult = await fetch(initEndpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  })
  if (!initResult.ok) {
    const message = `Error initiating certificate ${certId} on port ${hydrogenProducerPort}. Error was ${initResult.statusText}`
    console.error(message)
    throw new Error(message)
  }

  const waitForComplete = async () => {
    const initiatedCert = await waitForCertificateState(
      certId,
      'initiated',
      hydrogenProducerPort
    )
    await waitForCertificateState(
      initiatedCert.original_token_id,
      'initiated',
      energyProviderPort
    )
    return initiatedCert
  }
  return waitForComplete
}

async function issueCertificate(
  certificate,
  hydrogenProducerPort,
  energyProviderPort
) {
  const {
    original_token_id: id,
    commitment_salt,
    energy_consumed_wh,
    production_end_time,
    production_start_time,
  } = certificate
  const commitment = {
    commitment_salt,
    energy_consumed_wh,
    production_end_time,
    production_start_time,
  }

  const updateEndpoint = `http://localhost:${energyProviderPort}/v1/certificate/${id}`
  const updateResult = await fetch(updateEndpoint, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(commitment),
  })

  if (!updateResult.ok) {
    const message = `Error updating certificate ${id} on port ${energyProviderPort}. Error was ${updateResult.statusText}`
    console.error(message)
    throw new Error(message)
  }

  const issueEndpoint = `http://localhost:${energyProviderPort}/v1/certificate/${id}/issuance`

  const carbonIntensityApiUrl = `https://api.carbonintensity.org.uk/intensity/${new Date(production_end_time).toISOString()}/${new Date(production_start_time).toISOString()}`

  // const bodyStrEmpty = JSON.stringify({})

  const hardcodedFactor = (gap) => Math.random() * (gap[1] - gap[0]) + gap[0]
  const hardcodedEco2 = (e) => Math.floor(hardcodedFactor([0.03, 0.11]) * e)
  // const bodyStrHardCodedFactor = JSON.stringify({
  //   embodied_co2: getHardcodedEco2(energy_consumed_wh),
  // })

  const defaultCertOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  }

  const hardcodedCertOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      embodied_co2: hardcodedEco2(energy_consumed_wh),
    }),
  }

  const issueAndWaitForComplete = async (options) => {
    const issueResult = await fetch(issueEndpoint, options)
    if (!issueResult.ok) {
      const message = `Error issuing certificate ${id} on port ${energyProviderPort}. Error was ${issueResult.statusText}`
      console.error(message)
      throw new Error(message)
    }
    const waitForComplete = async () => {
      await waitForCertificateState(id, 'issued', energyProviderPort)
      const finalCert = await waitForCertificateState(
        id,
        'issued',
        hydrogenProducerPort
      )
      return finalCert
    }
    return waitForComplete
  }

  return fetch(carbonIntensityApiUrl)
    .then(async () => {
      // Handle successful response
      return issueAndWaitForComplete(defaultCertOptions)
    })
    .catch(async () => {
      // Handle failure response
      console.log('Detected off-line mode when using fetch. Using random vals.')
      return issueAndWaitForComplete(hardcodedCertOptions)
    })
}

const healthChecks = await Promise.all([
  checkServiceHealth('hydrogen-producer-api', 8000),
  checkServiceHealth('energy-owner-api', 8010),
  checkServiceHealth('regulator-api', 8020),
  checkServiceHealth('hydrogen-producer-identity', 9000),
  checkServiceHealth('energy-owner-identity', 9010),
  checkServiceHealth('regulator-identity', 9020),
])
if (!healthChecks.every((v) => v)) {
  process.exit(1)
}

console.log('Fetching addresses')

const [hydrogenSelf, energySelf, regulatorSelf] = await Promise.all([
  getSelfIdentity(9000),
  getSelfIdentity(9010),
  getSelfIdentity(9020),
])
const identityMap = { hydrogenSelf, energySelf, regulatorSelf }

console.log('Setting aliases')

await Promise.all([
  await setIdentities(identityMap, 9000),
  await setIdentities(identityMap, 9010),
  await setIdentities(identityMap, 9020),
])

console.log('Initiating certificates')

const waitInitFns = []
for (let i = 0; i < numberCertificatesToIssue; i++) {
  const waitFn = await initiateCertificate(8000, 8010)
  await delay(100)
  waitInitFns.push(waitFn)
}
const certificates = await Promise.all(waitInitFns.map((f) => f()))

console.log('Issuing certificates')

const waitIssueFns = []
for (const cert of certificates) {
  // const { production_start_time: s, production_end_time: e } = cert
  // const check = await checkCarbonIntensityAPIset(s, e)
  // console.log({ check })
  // console.log('await issueCertificate', Math.random())
  const waitFn = await issueCertificate(cert, 8000, 8010)
  await delay(100)
  waitIssueFns.push(waitFn)
}
const finalCertificates = await Promise.all(waitIssueFns.map((f) => f()))

for (const finalCert of finalCertificates) {
  console.log(
    `Created certificate ${finalCert.original_token_id} which is now in state ${finalCert.state}`
  )
}
