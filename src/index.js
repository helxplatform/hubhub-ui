import { App } from './app'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './context'

const container = document.getElementById('root')
const root = createRoot(container)

const queryClient = new QueryClient()

const ProvisionedApp = () => (
  <QueryClientProvider client={ queryClient }>
    <AppContextProvider>
      <BrowserRouter basename={ process.env.NODE_ENV === 'production' ? '/hubhub-ui' : '' }>
        <App />
      </BrowserRouter>
    </AppContextProvider>
  </QueryClientProvider>
)

root.render(<ProvisionedApp />)
