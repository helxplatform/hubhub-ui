import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Accordion, AccordionSummary, AccordionDetails,
  Box, CardContent, Divider, Drawer, IconButton,
  Link, Stack, Toolbar, Tooltip, Typography, useTheme, 
} from '@mui/material'
import {
  Close as CloseIcon,
  ExpandMore as ExpandIcon,
  UnfoldMore as ExpandAllIcon,
  UnfoldLess as CollapseAllIcon,
  GitHub as GitHubIcon,
  Star as ConnectedIcon,
  Circle as DisconnectedIcon,
} from '@mui/icons-material'
import { useApp } from '../../context'

import { Artifact } from './artifact'

//

const TagDetails = ({ tag_name, repo, github_commit_hash, artifacts }) => {
  const theme = useTheme()

  return (
    <Fragment>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        margin: `${ theme.spacing(1) } 0`,
        '& a': {
          textDecoration: 'underline',
          fontSize: '80%',
        },
        '& .hash': {
          color: theme.palette.text.secondary,
          fontStyle: 'italic',
          fontSize: '80%',
        }
      }}>
        <GitHubIcon
          sx={{ color: github_commit_hash ? theme.palette.primary.main : theme.palette.grey[600] }}
        />
        <Stack>
          <Link 
            href={ `https://github.com/helxplatform/${ repo }/releases/tag/${ tag_name }` }
            target="_blank"
            rel="noopener noreferrer"
          >helxplatform/{ repo }/releases/tag/{ tag_name }</Link>

          {
            github_commit_hash
              ? (
                <Link
                  href={ `https://github.com/helxplatform/tycho/commit/${ github_commit_hash }` }
                  className="hash"
                  target="_blank"
                  rel="noopener noreferrer"
                >{ github_commit_hash }</Link>
              ) : <Typography className="hash">hash unknown</Typography>
          }
        </Stack>
      </Box>

      <Typography sx={{ color: 'text.primary' }} variant="h6">Artifacts</Typography>
      
      {
        Object.keys(artifacts).length
          ? Object.keys(artifacts).map(key => <Artifact key={ `${ tag_name }-${ artifacts[key] }` } location={ key } { ...artifacts[key] } />)
          : <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>None</Typography>
      }
    </Fragment>
  )
}

TagDetails.propTypes = {
  tag_name: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  github_commit_hash: PropTypes.string,
  artifacts: PropTypes.string.isRequired,
}

//

export const ProjectDrawer = ({ open }) => {
  const theme = useTheme()
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
            color="secondary"
            sx={{ borderRadius: 0, height: '100%', width: '64px' }}
          >
            <CloseIcon />
          </IconButton>

          <Divider orientation="vertical" />
          
          <Typography variant="h3" sx={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 1rem', color: theme.palette.text.primary }}>
            { project?.repository_name || '...' }
          </Typography>
          
          <Divider orientation="vertical" />
          
          <IconButton
            onClick={ handleClickCollapseAll }
            disabled={ expandedPanels.size === 0 }
            color="secondary"
            sx={{ borderRadius: 0, height: '100%', width: '32px' }}
          >
            <CollapseAllIcon />
          </IconButton>
          
          <Divider orientation="vertical" />
          
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
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          minHeight: '64px',
          zIndex: 9,
        },
        '& .drawer-content': {
          padding: 0,
          overflow: 'auto',
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
                  expandIcon={ <ExpandIcon color="secondary" /> }
                  aria-controls={ `${ tag.tag_name }-content` }
                  id={ `${ tag.tag_name }-header` }
                >
                  <Typography variant="h5" sx={{ color: theme.palette.text.secondary }}>
                    { tag.tag_name }
                  </Typography>
                  <Tooltip placement="right" title={ `${ !tag.is_connected ? 'DIS' : '' }CONNECTED` }>
                    {
                      tag.is_connected
                        ? <ConnectedIcon color="primary" />
                        : <DisconnectedIcon color="secondary" sx={{ filter: 'opacity(0.1)' }} />
                    }
                  </Tooltip>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: theme.palette.background.default }}>
                  <TagDetails repo={ project.repository_name } { ...tag } />
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
