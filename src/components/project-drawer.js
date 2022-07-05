import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Accordion, AccordionSummary, AccordionDetails,
  Box, CardContent, Divider, Drawer, IconButton,
  Link, Stack, Toolbar, Typography, useTheme, 
} from '@mui/material'
import {
  Close as CloseIcon,
  ExpandMore as ExpandIcon,
  UnfoldMore as ExpandAllIcon,
  UnfoldLess as CollapseAllIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material'
import { useApp } from '../context'
import dockerLogo from '../images/docker-logo.svg'
import renciDash from '../images/renci-dash.svg'

//

const ARTIFACT_LOGO = {
  dockerhub: <img src={ dockerLogo } width="28" />,
  containers: <img src={ renciDash } width="28" />,
}

//

const Artifact = ({ location, digest }) => {
  const theme = useTheme()
  
  return (
    <Box sx={{
      padding: `0 ${ theme.spacing(1) }`,
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      '& .location': {},
      '& .digest': {
        flex: 1,
      },
    }}>
      <Box className="location">{ ARTIFACT_LOGO[location] }</Box>
      <Typography className="digest">{ digest }</Typography>
    </Box>
  )
}

Artifact.propTypes = {
  location: PropTypes.string.isRequired,
  digest: PropTypes.string.isRequired,
}

//

const TagDetails = ({ tag_name, github_commit_hash, artifacts }) => {
  const theme = useTheme()

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        margin: `${ theme.spacing(1) } 0`,
        '& a': {
          textDecoration: 'underline',
          fontSize: '80%',
        },
        '& .unknown-hash': {
          color: theme.palette.grey[600],
          fontStyle: 'italic',
          fontSize: '80%',
        }
      }}>
        <GitHubIcon
          fontSize="large"
          sx={{ color: github_commit_hash ? theme.palette.primary.light : theme.palette.grey[400] }}
        />
        <Stack>
          <Link
            href={ `https://github.com/helxplatform/tycho/releases/tag/${ tag_name }` }
            target="_blank"
            rel="noopener noreferrer"
          >{ tag_name }</Link>
          {
            github_commit_hash
              ? (
                <Link
                  href={ `https://github.com/helxplatform/tycho/commit/${ github_commit_hash }` }
                  target="_blank"
                  rel="noopener noreferrer"
                >{ github_commit_hash }</Link>
              ) : <Typography className="unknown-hash">hash unknown</Typography>
          }
        </Stack>
      </Box>
      <Typography color="primary" variant="h6">Artifacts</Typography>
      {
        Object.keys(artifacts).length
          ? Object.keys(artifacts).map(key => <Artifact key={ `${ tag_name }-${ artifacts[key] }` } location={ key } { ...artifacts[key] } />)
          : <Typography>None</Typography>
      }
    </Box>
  )
}

TagDetails.propTypes = {
  tag_name: PropTypes.string.isRequired,
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
                  expandIcon={ <ExpandIcon color="secondary" /> }
                  aria-controls={ `${ tag.tag_name }-content` }
                  id={ `${ tag.tag_name }-header` }
                >
                  <Typography variant="h5" sx={{ color: theme.palette.text.secondary }}>
                    { tag.tag_name }
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: theme.palette.background.default }}>
                  <TagDetails { ...tag } />
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
