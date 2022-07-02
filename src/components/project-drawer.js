import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Accordion, AccordionSummary, AccordionDetails,
  CardContent, Divider, Drawer, IconButton,
  Stack, Toolbar, Typography, useMediaQuery,
} from '@mui/material'
import {
  Close as CloseIcon,
  ExpandMore as ExpandIcon,
  UnfoldMore as ExpandAllIcon,
  UnfoldLess as CollapseAllIcon,
} from '@mui/icons-material'
import { useApp } from '../context'

export const ProjectDrawer = ({ open }) => {
  const { projects, closeDrawer, currentProjectID } = useApp()
  const [expandedPanels, setExpandedPanels] = useState(new Set())
  const smallScreen = useMediaQuery(`(max-width: 600px)`)

  const allExpanded = useMemo(() => {
    if (!project) { return false }
    return Object.keys(project.tags).some((tag, i) => expandedPanels.has(i))
  }, [project, expandedPanels])
  
  const project = useMemo(() => projects[currentProjectID], [currentProjectID])

  const handleClickPanel = key => {
    let _expandedPanels = new Set(expandedPanels)
    if (_expandedPanels.has(key)) {
      _expandedPanels.delete(key)
    } else {
      _expandedPanels.add(key)
    }
    setExpandedPanels(_expandedPanels)
  }

  const handleClickCollapseAll = () => {
    setExpandedPanels(new Set())
  }
  const handleClickExpandAll = () => {
    const n = Object.keys(project.tags).length
    const newExpandedPanels = new Set([...Array(n).keys()])
    setExpandedPanels(newExpandedPanels)
  }

  console.log(expandedPanels, allExpanded)
  
  return (
    <Drawer
      anchor="right"
      open={ open }
      onClose={ closeDrawer }
      PaperProps={{ sx: {
        width: '100%',
        maxWidth: smallScreen ? '100%' : 'calc(100% - 12rem)',
        '& .drawer-header': {
          backgroundColor: '#fff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          minHeight: '64px',
          zIndex: 9,
        },
        '& .drawer-content': {
          padding: 0,
          overflowY: 'auto',
        },
      } }}
    >
      <Toolbar disableGutters className="drawer-header">
        <Stack
          direction="row"
          alignItems="stretch"
          sx={{ height: '100%', width: '100%' }}
        >
          <IconButton
            onClick={ closeDrawer }
            sx={{ borderRadius: 0, height: '100%', width: '64px' }}
          >
            <CloseIcon />
          </IconButton>
          <Divider orientation="vertical" />
          <Typography variant="h4" sx={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
            { project?.repository_name || '...' }
          </Typography>
          <Divider orientation="vertical" />
          <IconButton
            onClick={ handleClickCollapseAll }
            sx={{ borderRadius: 0, height: '100%', width: '32px' }}
          >
            <CollapseAllIcon />
          </IconButton>
          <Divider orientation="vertical" />
          <IconButton
            onClick={ handleClickExpandAll }
            sx={{ borderRadius: 0, height: '100%', width: '32px' }}
          >
            <ExpandAllIcon />
          </IconButton>
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
                    onChange={ () => handleClickPanel(i) }
                    key={ `${ project.repository_name }-${ tag.tag_name }` }
                    elevation={ 0 }
                    defaultExpanded={ i === 0 }
                    expanded={ expandedPanels.has(i) }
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
