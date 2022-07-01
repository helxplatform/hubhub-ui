import { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Accordion, AccordionSummary, AccordionDetails,
  CardContent, Divider, Drawer, IconButton,
  Stack, Toolbar, Typography,
} from '@mui/material'
import {
  Close as CloseIcon,
  ExpandMore as ExpandIcon,
} from '@mui/icons-material'
import { useApp } from '../context'

export const ProjectDrawer = ({ open }) => {
  const { projects, closeDrawer, currentProjectID } = useApp()
  
  const project = useMemo(() => projects[currentProjectID], [currentProjectID])
  
  return (
    <Drawer
      anchor="right"
      open={ open }
      onClose={ closeDrawer }
      PaperProps={{ sx: {
        width: 'calc(100% - 6rem)',
        maxWidth: '100%',
        '& .drawer-header': {
          position: 'sticky',
          top: 0,
          backgroundColor: '#fff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          minHeight: '64px',
          zIndex: 9,
        },
        '& .drawer-content': {
          padding: 0,
        },
      } }}
    >
      <Toolbar disableGutters className="drawer-header">
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
          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
            { project?.repository_name || '...' }
          </Typography>
        </Stack>
      </Toolbar>
      {
        project && (
          <CardContent className="drawer-content">
            {
              Object.keys(project.tags).map((key, i) => {
                const tag = project.tags[key]
                return (
                  <Accordion
                    key={ `${ project.repository_name }-${ tag.tag_name }` }
                    elevation={ 0 }
                    defaultExpanded={ i === 0 }
                  >
                    <AccordionSummary
                      expandIcon={ <ExpandIcon /> }
                      aria-controls={ `${ tag.tag_name }-content` }
                      id={ `${ tag.tag_name }-header` }
                    >
                      <Typography variant="h5">{ tag.tag_name }</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: '#ddd' }}>
                      <pre style={{
                        fontSize: '75%',
                        whiteSpace: 'pre-wrap',
                        padding: '0.5rem',
                      }}>
                        { JSON.stringify(tag, null, 2) }
                      </pre>
                    </AccordionDetails>
                  </Accordion>
                )
              })
            }
          </CardContent>
        )
      }
    </Drawer>
  )
}

ProjectDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
}

ProjectDrawer.defaultProps = {
  open: false,
}
