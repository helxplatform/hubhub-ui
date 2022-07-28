import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Accordion, AccordionSummary, AccordionDetails,
  Box, CardContent, Divider, Drawer, IconButton,
  Stack, Toolbar, Tooltip, Typography, useTheme, 
} from '@mui/material'
import {
  Close as CloseIcon,
  ExpandMore as ExpandIcon,
  UnfoldMore as ExpandAllIcon,
  UnfoldLess as CollapseAllIcon,
  Circle as ConnectedIcon,
} from '@mui/icons-material'
import { useApp } from '../../context'
import { Tag } from './tag'

//

export const ProjectDrawer = ({ open }) => {
  const theme = useTheme()
  const { projects, closeDrawer, currentProjectID, settings, smallScreen } = useApp()
  const [expandedPanels, setExpandedPanels] = useState(new Set([0]))

  const project = useMemo(() => projects[currentProjectID], [currentProjectID])

  const visibleTags = useMemo(() => {
    if (!project) { return {} }
    if (settings.onlyConnected) {
      return Object.keys(project.tags)
        .reduce((acc, key) => {
          if (project.tags[key].is_connected) {
            return { ...acc, [key]: project.tags[key] }
          }
          return { ...acc }
        }, {})
    }
    return { ...project.tags }
  }, [settings.onlyConnected, project])

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
          divider={ <Divider orientation="vertical" /> }
          sx={{ height: '100%', width: '100%' }}
        >
          <IconButton
            onClick={ closeDrawer }
            color="secondary"
            sx={{ borderRadius: 0, height: '100%', width: '64px' }}
          >
            <CloseIcon />
          </IconButton>
          
          <Typography variant="h3" sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            color: theme.palette.text.primary,
          }}>
            { project?.repository_name || '...' }
          </Typography>
          
          <IconButton
            onClick={ handleClickCollapseAll }
            disabled={ expandedPanels.size === 0 }
            color="secondary"
            sx={{ borderRadius: 0, height: '100%', width: '32px' }}
          >
            <CollapseAllIcon />
          </IconButton>
          
          <IconButton
            onClick={ handleClickExpandAll }
            disabled={ project && expandedPanels.size === Object.keys(project.tags).length }
            color="secondary"
            sx={{ borderRadius: 0, height: '100%', width: '32px' }}
          >
            <ExpandAllIcon />
          </IconButton>

        </Stack>
      </Toolbar>
    )
  }, [expandedPanels, project, settings.onlyConnected])

  return (
    <Drawer
      anchor="right"
      open={ open }
      onClose={ closeDrawer }
      PaperProps={{ sx: {
        width: '100%',
        maxWidth: smallScreen ? '100%' : 'calc(100% - 12rem)',
        '& .drawer-header': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          minHeight: '64px',
          zIndex: 9,
        },
        '& .drawer-content': {
          padding: '0 !important',
          overflow: 'auto',
          flex: 1,
        },
        '& .MuiAccordion-root': {
          '& .accordion-title': {
            color: theme.palette.text.secondary,
            transition: 'color 150ms',
          },
          '& .connected-icon': {
            filter: 'opacity(0.5)',
            transition: 'filter 250ms',
          },
          '& .expand-icon': {
            filter: 'opacity(0.5)',
            transition: 'filter 250ms',
          },
          '&:hover': {
            '& .accordion-title': {
              color: theme.palette.text.primary,
            },
            '& .connected-icon': {
              filter: 'opacity(1.0)',
            },
            '& .expand-icon': {
              filter: 'opacity(1.0)',
            },
            '& .date': {
              filter: 'opacity(1.0)',
            }
          },
        },
        '& .MuiAccordionSummary-content': {
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }
      } }}
    >
      <DrawerHeader />
      <CardContent className="drawer-content">
        {
          settings.debugMode ? (
            <pre style={{
              backgroundColor: `#0001`,
              color: theme.palette.text.primary,
              padding: theme.spacing(1),
              margin: 0,
            }}>
              {
                JSON.stringify(Object.keys(visibleTags)
                  .reduce((acc, key) => [...acc, project.tags[key]], []), null, 2)
              }
            </pre>
          ) : Object.keys(visibleTags).length > 0
            ? Object.keys(visibleTags).map((key, i) => {
              const tag = project.tags[key]
              return (
                <Accordion
                  onChange={ () => handleClickPanel(i) }
                  key={ `${ project.repository_name }-${ tag.tag_name }` }
                  elevation={ 0 }
                  defaultExpanded={ i === 0 }
                  expanded={ expandedPanels.has(i) }
                  TransitionProps={{ unmountOnExit: true }}
                >
                  <AccordionSummary
                    expandIcon={ <ExpandIcon color="secondary" className="expand-icon" /> }
                    aria-controls={ `${ tag.tag_name }-content` }
                    id={ `${ tag.tag_name }-header` }
                  >
                    <Typography variant="h5" className="accordion-title">
                      { tag.tag_name }
                    </Typography>
                    <Tooltip placement="right" title={ `${ !tag.is_connected ? 'DIS' : '' }CONNECTED` }>
                      <ConnectedIcon color={ tag.is_connected ? 'success' : 'disabled' } fontSize="small" className="connected-icon" />
                    </Tooltip>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: theme.palette.background.default }}>
                    <Tag repo={ project.repository_name } { ...tag } />
                  </AccordionDetails>
                </Accordion>
              )
            }) : (
              <Box sx={{
                height: '33%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
                <Typography variant="h2" color="text.secondary">Nothing to see here!</Typography>
              </Box>
            )
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