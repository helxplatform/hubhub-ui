import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { AppBar, Box, Divider, IconButton, Stack, Switch, Tooltip, Toolbar, useTheme } from '@mui/material'
import helxLogoLight from '../../images/helx-logo-light.png'
import helxLogoDark from '../../images/helx-logo-dark.png'
import { useApp } from '../../context'
import { ProjectDrawer } from '../drawer'
import './layout.scss'
import {
  Brightness7 as LightModeIcon,
  Brightness4 as DarkModeIcon,
  Refresh as RefreshIcon,
  BugReport as DebugIcon,
} from '@mui/icons-material'

const LOGOS = {
  'light': helxLogoDark,
  'dark': helxLogoLight,
}

export const Layout = ({ children }) => {
  const theme = useTheme()
  const { drawerOpen, refetch, settings } = useApp()

  const handleClickReSync = () => {
    refetch()
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
          '& .data-toggler': {
            display: 'flex',
            alignItems: 'center',
          },
          '& .label': {
            fontSize: '85%',
            '&.connected': {
              filter: `opacity(${ settings.onlyConnected ? '1.0' : '0.25' })`,
              color: theme.palette.success.main,
            },
            '&.all': {
              filter: `opacity(${ settings.onlyConnected ? '0.25' : '1.0' })`,
              color: theme.palette.text.secondary,
            },
          },
          '& .switch': {
            transform: 'rotate(-90deg)',
          }
        }}>
          <Link to="/"><img src={ LOGOS[settings.color.mode] } height="100%" alt="" /></Link>
          <Stack
            direction="row"
            divider={ <Divider orientation="vertical" flexItem /> }
            sx={{ height: '100%', }}
          >
            {/* this <span /> gets Stack to create a leading divider. */}
            <span />

            <Tooltip placement="bottom" title="Re-sync project data">
              <IconButton
                onClick={ handleClickReSync }
                color="inherit"
                sx={{ borderRadius: 0, height: '100%', width: '48px' }}
              >
                <RefreshIcon color="secondary" />
              </IconButton>
            </Tooltip>

            <Tooltip placement="bottom" title={ `${ settings.debugMode ? 'Leave' : 'Enter' } debug mode` }>
              <IconButton
                onClick={ settings.toggleDebugMode }
                sx={{ borderRadius: 0, height: '100%', width: '48px' }}
              >
                <DebugIcon sx={{ color: settings.debugMode ? theme.palette.secondary.light : theme.palette.secondary.dark }} />
              </IconButton>
            </Tooltip>

            <Tooltip
              placement="bottom"
              title={ settings.onlyConnected ? 'Show all projects' : `Show only projects with connected artifacts` }
            >
              <Box className="data-toggler">
                <Box sx={{ textAlign: 'right', marginLeft: theme.spacing(1) }}>
                  <Box className="connected label">Connected</Box>
                  <Box className="all label">All</Box>
                </Box>
                <Switch
                  onChange={ event => settings.setOnlyConnected(event.target.checked) }
                  color="primary"
                  size="small"
                  checked={ settings.onlyConnected }
                  className="switch"
                />
              </Box>
            </Tooltip>
            
            <Tooltip placement="bottom" title={ `Switch to ${settings.color.mode === settings.color.modes.dark ? 'light' : 'dark' } mode` }>
              <IconButton
                onClick={ settings.color.toggleMode }
                color="inherit"
                sx={{ borderRadius: 0, height: '100%', width: '48px' }}
              >
                { settings.color.mode === settings.color.modes.dark ? <DarkModeIcon color="primary" /> : <LightModeIcon color="secondary" /> }
              </IconButton>
            </Tooltip>
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
