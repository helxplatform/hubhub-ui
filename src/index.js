import { App } from './app'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './context'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

const container = document.getElementById('root')
const root = createRoot(container)

const queryClient = new QueryClient()

const ProvisionedApp = () => (
  <QueryClientProvider client={ queryClient }>
    <ThemeProvider theme={ theme }>
      <AppContextProvider>
        <BrowserRouter basename={ process.env.NODE_ENV === 'production' ? '/hubhub-ui' : '' }>
          <App />
        </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

root.render(<ProvisionedApp />)
