import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'

const AppContext = createContext({})

export const AppContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [currentProjectID, setCurrentProjectID] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { isLoading, data } = useQuery('projects', () => 
    fetch('https://hubhub-jeffw.apps.renci.org/app/current')
      .then(response => response.json())
      .then(data => setProjects(data.projects))
  )

  useEffect(() => {
    setDrawerOpen(!!currentProjectID)
  }, [currentProjectID])

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <AppContext.Provider value={{ currentProjectID, setCurrentProjectID, drawerOpen, closeDrawer, projects }}>
      { !isLoading ? children : <div>loading...</div> }
    </AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.node,
}

export const useApp = () => useContext(AppContext)
