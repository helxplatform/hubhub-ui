import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar } from '@mui/material'
import helxLogo from '../../images/helx-logo.png'
import { useApp } from '../../context'
import { ProjectDrawer } from '../project-drawer'
import './layout.scss'

export const Layout = ({ children }) => {
  const { drawerOpen } = useApp()

  return (
    <Fragment>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#eee',
          padding: 0,
        }}
      >
        <Toolbar disableGutters sx={{
          width: '100%',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          height: '64px',
          '& a': {
            height: '100%',
            padding: '16px',
          },
        }}>
          <Link to="/"><img src={ helxLogo } height="100%" alt="" /></Link>
        </Toolbar>
      </AppBar>
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
