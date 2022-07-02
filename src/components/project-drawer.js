import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Accordion, AccordionSummary, AccordionDetails,
  CardContent, Divider, Drawer, IconButton,
  Stack, Toolbar, Typography,
} from '@mui/material'
import {
  Close as CloseIcon,
  ExpandMore as ExpandIcon,
  UnfoldMore as ExpandAllIcon,
  UnfoldLess as CollapseAllIcon,
} from '@mui/icons-material'
import { useApp } from '../context'

export const ProjectDrawer = ({ open }) => {
  const { projects, closeDrawer, currentProjectID, smallScreen } = useApp()
  const [expandedPanels, setExpandedPanels] = useState(new Set([0]))

  const project = useMemo(() => projects[currentProjectID], [currentProjectID])

  useEffect(() => {
    setExpandedPanels(new Set([0]))
  }, [project])

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
    const allPanels = new Set([...Array(n).keys()])
    setExpandedPanels(allPanels)
  }

  const DrawerHeader = useCallback(() => {
    return (
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
            disabled={ expandedPanels.size === 0 }
            sx={{ borderRadius: 0, height: '100%', width: '32px' }}
          >
            <CollapseAllIcon />
          </IconButton>
          <Divider orientation="vertical" />
          <IconButton
            onClick={ handleClickExpandAll }
            disabled={ project && expandedPanels.size === Object.keys(project.tags).length }
            sx={{ borderRadius: 0, height: '100%', width: '32px' }}
          >
            <ExpandAllIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    )
  }, [project, expandedPanels])

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
      <DrawerHeader />
      <CardContent className="drawer-content">
        {
          project ? Object.keys(project.tags).map((key, i) => {
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
          }) : <div>no project found</div>
        }
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
