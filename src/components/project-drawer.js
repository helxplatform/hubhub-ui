import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { AppBar, CardContent, Divider, Drawer, IconButton, Stack, Toolbar } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useApp } from '../context'

export const ProjectDrawer = ({ open }) => {
  const { projects, closeDrawer, currentProjectID } = useApp()
  
  const project = useMemo(() => {
    return projects[currentProjectID]
  }, [currentProjectID])
  
  return (
    <Drawer
      anchor="right"
      open={ open }
      onClose={ closeDrawer }
      PaperProps={{ sx: {
        width: 'calc(100% - 6rem)',
        maxWidth: '100%',
      } }}
    >
      <AppBar position="static">
        <Toolbar disableGutters>
          <Stack
            direction="row"
            alignItems="stretch"
            sx={{ height: '100%' }}
          >
            <IconButton
              onClick={ closeDrawer }
              sx={{ borderRadius: 0, height: '100%', width: '64px' }}
            >
              <CloseIcon />
            </IconButton>
            <Divider orientation="vertical" />
          </Stack>
        </Toolbar>
      </AppBar>
      <Divider />
      <CardContent>
        <pre>
          { JSON.stringify(project, null, 2) }
        </pre>
      </CardContent>
    </Drawer>
  )
}

ProjectDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
}

ProjectDrawer.defaultProps = {
  open: false,
}
