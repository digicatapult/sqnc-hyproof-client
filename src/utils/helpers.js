export const formatDate = (date) =>
  new Date(date).toLocaleString('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  })

export const checkCO2Status = (cert) =>
  cert.embodied_co2 && ['pending', 'initiated'].includes(cert.state)
    ? 'co2'
    : cert.state

export const formatCertName = (cert) =>
  `SQNC-HYPROOF-${(cert.original_token_id || '0').toString().padStart(4, '0')}`

export const xor = (a, b) => ((a || b) && !(a && b ))
