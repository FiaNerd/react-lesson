import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ThemeContextProvider from './contexts/ThemeContextProvider.tsx'
import App from './App.tsx'

// Create a React Query Client and set default behaviour & options
const queryClient = new QueryClient({
    // Om man inte vill hämta om data för att en flik återfår fokus. 
    // Datan laddas annars om om du går från en flik till en annan så varje gång hämtar dem ny data för varje gång
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 15, // 15 seconds
		}
	}
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>

        {/*  Nu tillandahåller QueryClient till allt som ligger under - queryClient som tillhandahålls*/}
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ThemeContextProvider>
					<App />
				</ThemeContextProvider>
			</BrowserRouter>
		</QueryClientProvider>

	</React.StrictMode>,
)
