import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'

const AppContext = createContext({})

export const AppContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [currentProjectID, setCurrentProjectID] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

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

  return (
    <AppContext.Provider value={{ currentProjectID, setCurrentProjectID, drawerOpen, closeDrawer, projects, isLoading }}>
      { children }
    </AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.node,
}

export const useApp = () => useContext(AppContext)
