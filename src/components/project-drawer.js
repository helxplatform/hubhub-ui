import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { CardContent, Divider, Drawer, IconButton, Stack, Toolbar } from '@mui/material'
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
      PaperProps={{ sx: { minWidth: 'calc(100% - 6rem)' } }}
    >
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
