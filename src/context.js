import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from './theme'

const AppContext = createContext({})

const MODES = {
  light: 'light',
  dark: 'dark',
}

export const AppContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [currentProjectID, setCurrentProjectID] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const smallScreen = useMediaQuery(`(max-width: 600px)`)
  const [colorMode, setColorMode] = useState(MODES.light)
  const [onlyConnected, setOnlyConnected] = useState(true)

  const theme = useMemo(() => createTheme({
    ...(colorMode === MODES.light ? lightTheme : darkTheme),
  }), [colorMode])


  const { isLoading } = useQuery('projects', () => 
    fetch('https://hubhub-jeffw.apps.renci.org/app/current')
      .then(response => response.json())
      .then(data => setProjects(data.projects))
  )

  useEffect(() => {
    setDrawerOpen(!!currentProjectID)
  }, [currentProjectID])

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

  return (
    <AppContext.Provider value={{
      currentProjectID, setCurrentProjectID,
      drawerOpen, closeDrawer,
      projects, isLoading,
      smallScreen,
      MODES, colorMode, setColorMode, toggleColorMode,
      onlyConnected, setOnlyConnected,
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
