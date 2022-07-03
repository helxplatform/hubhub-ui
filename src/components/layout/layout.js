import { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { AppBar, Box, Switch, Toolbar, useTheme } from '@mui/material'
import helxLogoLight from '../../images/helx-logo-light.png'
import helxLogoDark from '../../images/helx-logo-dark.png'
import { useApp } from '../../context'
import { ProjectDrawer } from '../project-drawer'
import './layout.scss'

const LOGOS = {
  'light': helxLogoDark,
  'dark': helxLogoLight,
}

export const Layout = ({ children }) => {
  const theme = useTheme()
  const { drawerOpen, colorMode, MODES, setColorMode } = useApp()

  const switchStyle = useMemo(() => ({
    width: 62,
    height: 34,
    marginRight: '1rem',
    '& .MuiSwitch-switchBase': {
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="m 14.368073,22 c 1.82,0 3.53,-0.5 5,-1.35 -2.99,-1.73 -5,-4.95 -5,-8.65 0,-3.7 2.01,-6.92 5,-8.65 -1.47,-0.85 -3.18,-1.35 -5,-1.35 -5.5199999,0 -9.9999999,4.48 -9.9999999,10 0,5.52 4.48,10 9.9999999,10 z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.background.default,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.primary.dark,
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.background.default,
      borderRadius: 20 / 2,
    },
  }), [colorMode])

  return (
    <Fragment>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: 0,
        }}
      >
        <Toolbar disableGutters sx={{
          width: '100%',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px',
          '& a': {
            height: '100%',
            padding: '16px',
          },
        }}>
          <Link to="/"><img src={ LOGOS[colorMode] } height="100%" alt="" /></Link>
          <Switch
            checked={ colorMode === MODES.dark }
            onChange={ () => setColorMode(event.target.checked ? MODES.dark : MODES.light) }
            sx={ switchStyle }
          />
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{
        backgroundColor: theme.palette.background.default,
      }}>
        { children }
      </Box>
      <ProjectDrawer open={ drawerOpen } />
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
