import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { AppBar, Box, Divider, IconButton, Stack, Switch, Toolbar, useTheme } from '@mui/material'
import helxLogoLight from '../../images/helx-logo-light.png'
import helxLogoDark from '../../images/helx-logo-dark.png'
import { useApp } from '../../context'
import { ProjectDrawer } from '../drawer'
import './layout.scss'
import {
  Brightness7 as LightModeIcon,
  Brightness4 as DarkModeIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material'

const LOGOS = {
  'light': helxLogoDark,
  'dark': helxLogoLight,
}

export const Layout = ({ children }) => {
  const theme = useTheme()
  const { drawerOpen, colorMode, MODES, onlyConnected, setOnlyConnected, toggleColorMode, refresh } = useApp()

  const handleClickRefresh = () => {
    refresh()
  }

  return (
    <Fragment>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: 0,
          transition: 'background-color 200ms',
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
          <Stack direction="row" spacing={ 1 } sx={{ marginRight: theme.spacing(2), height: '100%' }} alignItems="stretch">
            <Divider orientation="vertical" flexItem />

            <Stack justifyContent="center">
              <IconButton onClick={ handleClickRefresh }>
                <RefreshIcon color="primary" />
              </IconButton>
            </Stack>

            <Divider orientation="vertical" flexItem />

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <Box sx={{ textAlign: 'right', marginLeft: theme.spacing(1) }}>
                <Box sx={{
                  fontSize: '85%',
                  filter: `opacity(${ onlyConnected ? '1.0' : '0.25' })`,
                  color: theme.palette.success.main,
                }}
                >Connected</Box>
                <Box sx={{
                  fontSize: '85%',
                  filter: `opacity(${ onlyConnected ? '0.25' : '1.0' })`,
                  color: theme.palette.text.secondary,
                }}
                >All</Box>
              </Box>
              <Switch
                onChange={ event => setOnlyConnected(event.target.checked) }
                color="primary"
                size="small"
                checked={ onlyConnected }
                sx={{ transform: 'rotate(-90deg)' }}
              />
            </Box>
            
            <Divider orientation="vertical" flexItem />
            
            <Stack justifyContent="center">
              <IconButton sx={{ ml: 1 }} onClick={ toggleColorMode } color="inherit">
                { colorMode === MODES.dark ? <DarkModeIcon color="primary" /> : <LightModeIcon color="secondary" /> }
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{
        backgroundColor: theme.palette.background.default,
        transition: 'background-color 400ms',
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
