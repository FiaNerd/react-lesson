import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'

// Måste skappa upp den nya queryn, det gör man med hjälp av new

const queryClient = new QueryClient({
    /* Om den ska hämta om Queryn så fort man växlar mellan två tabarm tex från vs code till browsern, kan sätta hur länge datan ska vara färsk */
    defaultOptions: {
        // Nu hämtar den inte om data för att man cäxlar mellan tabbarna a
        queries: {
            refetchOnWindowFocus: false,
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <App />
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
