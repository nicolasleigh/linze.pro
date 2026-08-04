import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './i18n' // Initialize i18n
import { ThemeProvider } from './hooks/useTheme'

const queryClient = new QueryClient()

function App() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
