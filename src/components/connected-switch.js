import { Box, Switch, useTheme } from '@mui/material'
import { useApp } from '../context'

export const ConnectedSwitch = () => {
  const theme = useTheme()
  const { drawerOpen, refetch, settings } = useApp()

  const switchStyle = {
      display: 'flex',
      alignItems: 'center',
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
  }

  return (
    <Box sx={ switchStyle }>
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
  )
}