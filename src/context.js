import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from './theme'
import { useLocalStorage } from './hooks'

const AppContext = createContext({})

const MODES = {
  light: 'light',
  dark: 'dark',
}

const fetchProjects = async () => {
  const response = await fetch('https://hubhub-jeffw.apps.renci.org/app/current')
  if (!response.ok) {
    throw new Error('An error occurred while fetching data.')
  }
  return response.json()
}

export const AppContextProvider = ({ children }) => {
  const [currentProjectID, setCurrentProjectID] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const smallScreen = useMediaQuery(`(max-width: 600px)`)
  const [colorMode, setColorMode] = useLocalStorage('colorMode', MODES.light)
  const [onlyConnected, setOnlyConnected] = useLocalStorage('onlyConnected', true)
  const [debugMode, setDebugMode] = useState(false)

  const theme = useMemo(() => createTheme({
    ...(colorMode === MODES.light ? lightTheme : darkTheme),
  }), [colorMode])

  const { data, isLoading, isError, refetch } = useQuery('projects', fetchProjects)

  const projects = useMemo(() => data ? data.projects : [], [data])

  useEffect(() => setDrawerOpen(!!currentProjectID), [currentProjectID])

  const closeDrawer = () => {
    setDrawerOpen(false)
    const unsetProject = setTimeout(() => setCurrentProjectID(null), 250)
    return () => clearTimeout(unsetProject)
  }

  const toggleColorMode = useCallback(() => {
    if (colorMode === MODES.light) {
      setColorMode(MODES.dark)
      return
    }
    setColorMode(MODES.light)
  }, [colorMode])

  const toggleDebugMode = () => setDebugMode(!debugMode)

  return (
    <AppContext.Provider value={{
      currentProjectID, setCurrentProjectID,
      drawerOpen, closeDrawer,
      projects, isLoading, isError,
      smallScreen,
      MODES, colorMode, setColorMode, toggleColorMode,
      onlyConnected, setOnlyConnected, refetch,
      debugMode, toggleDebugMode,
    }}>
      <ThemeProvider theme={ theme }>
        { children }
      </ThemeProvider>
    </AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.node,
}

export const useApp = () => useContext(AppContext)
