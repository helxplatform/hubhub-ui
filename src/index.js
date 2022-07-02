import { App } from './app'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './context'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const container = document.getElementById('root')
const root = createRoot(container)

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    primary: {
      main: '#375B77',
    }
  },
  typography: {
    htmlFontSize: 16,
    h1: {
      fontSize: 'clamp(2rem, 6vw, 4rem)',
    },
    h2: {
      fontSize: 'clamp(1.7rem, 4vw, 3.5rem)',
    },
    h3: {
      fontSize: 'clamp(1.55rem, 4vw, 3rem)',
    },
    h4: {
      fontSize: 'clamp(1.4rem, 3vw, 2.5rem)',
      color: '#456',
    },
    h5: {
      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
      color: '#789',
    },
    h6: {
      fontSize: 'clamp(0.9rem, 1vw, 1rem)',
    },
  }
})

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
