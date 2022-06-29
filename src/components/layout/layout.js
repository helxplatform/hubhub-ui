import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Toolbar } from '@mui/material'
import helxLogo from '../../images/helx-logo.png'
import { useApp } from '../../context'
import { ProjectDrawer } from '../project-drawer'
import './layout.scss'

export const Layout = ({ children }) => {
  const { drawerOpen } = useApp()

  return (
    <Fragment>
      <Toolbar disableGutters sx={{
        backgroundColor: '#222',
        padding: '1rem',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link to="/"><img src={ helxLogo } width="75" alt="" /></Link>
      </Toolbar>
      <main>
        { children }
      </main>
      <ProjectDrawer open={ drawerOpen } />
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
