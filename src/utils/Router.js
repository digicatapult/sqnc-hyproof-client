import { createBrowserRouter } from 'react-router-dom'

import Certificates from '../pages/Certificates'

export const router = createBrowserRouter([
  { path: '/', Component: Certificates },
  { path: '/certificates', Component: Certificates },
])
