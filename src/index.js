import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ContextProvider } from './utils/Context.js'
import App from './App'
import GlobalFonts from './assets/fonts/fonts'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
      <QueryClientProvider client={new QueryClient()}>

    <ContextProvider>
      <App />
      <GlobalFonts />
    </ContextProvider>
      </QueryClientProvider>
  </React.StrictMode>
)
