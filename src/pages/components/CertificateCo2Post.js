// import React, { useContext } from 'react'
//
// import { Context } from '../../utils/Context'
//
// import useAxios from '../../hooks/use-axios'
//
// export default function CertificateCo2Post() {
//   const {
//     currentCommitmentSalt,
//     currentEnergyConsumedWh,
//     currentProductionStartTime,
//     currentProductionEndTime,
//   } = useContext(Context)
//   const url = 'https://swapi.dev/api/people/1/'
//   const { data /*, error, loading*/ } = useAxios(true, url)
//   return (
//     <>
//       <code>
//         currentCommitmentSalt: {currentCommitmentSalt} <br />
//         currentEnergyConsumedWh: {currentEnergyConsumedWh} <br />
//         currentProductionStartTime: {currentProductionStartTime} <br />
//         currentProductionEndTime: {currentProductionEndTime} <br />
//         <br />
//         TODO: embed the co2 data w/ <br />
//         GET /v1/certificate ( get the latest that matches the above ) <br />
//         POST v1/certificate/$emma_local_id <br />
//         POST v1/certificate/$emma_local_id/issuance
//         <hr />
//         <small>{data && <>DATA</>}</small>
//         <hr />
//       </code>
//     </>
//   )
// }

import React, { useContext } from 'react'

import { Context } from '../../utils/Context'
import { personas } from '../../App'

import useAxios from '../../hooks/use-axios'

export default function CertificateCo2Post({ hash, salt, energy, start, end }) {
  const { current } = useContext(Context)
  const persona = personas.find(({ id }) => id === current)
  const origin = persona.origin
  const path = '/v1/certificate'
  const u = `${origin}${path}`
  const { data: all, error: errorAll, loading: loadingAll } = useAxios(true, u)
  const cert = all.find(({ commitment }) => commitment === hash)
  if (loadingAll) return <p>Loading...</p>
  if (errorAll) return <p>Error: {JSON.stringify(errorAll)}</p>
  return (
    <>
      <p>Data: {all ? JSON.stringify(all.length) : 0}</p>
      {/* <small>Data: {all ? JSON.stringify(all) : 0}</small> */}
      <hr />
      <small>Data: {all ? JSON.stringify(all[all.length - 1]) : 0}</small>
      <hr />
      ema_response <br />
      {JSON.stringify(all?.find(({ commitment }) => commitment === hash))}
      <hr />
      hash: {hash} <br />
      salt: {salt} <br />
      energy: {energy} <br />
      start: {start} <br />
      end: {end} <br />
      <hr />
      <h3>FINAL</h3>
      <small>{JSON.stringify(cert)}</small>
      <hr />
    </>
  )
}
