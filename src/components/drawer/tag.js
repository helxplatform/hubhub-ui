import { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Box, Divider, 
  Link, Stack, Typography, useTheme, 
} from '@mui/material'
import {
  GitHub as GitHubIcon,
} from '@mui/icons-material'
import { Artifact } from './artifact'

export const Tag = ({ repo, tag_name, github_tag_date, github_commit_hash, github_commit_date, artifacts }) => {
  const theme = useTheme()

  return (
    <Fragment>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        margin: `${ theme.spacing(2) } 0`,
        '& .link-stack': {
          fontSize: '90%',
          '& .date': {
            color: theme.palette.text.secondary,
            filter: 'opacity(0.5)',
            transition: 'filter 250ms',
            fontStyle: 'italic',
          },
          '& .hash': {
            color: theme.palette.text.secondary,
            fontStyle: 'italic',
          }
        },
      }}>
        <GitHubIcon
          fontSize="large"
          sx={{ color: github_commit_hash ? theme.palette.primary.main : theme.palette.grey[600] }}
        />
        <Stack spacing={ 0.5 } className="link-stack">
          <span>
            <Link 
              href={ `https://github.com/helxplatform/${ repo }/releases/tag/${ tag_name }` }
              target="_blank"
              rel="noopener noreferrer"
            >helxplatform/{ repo }/releases/tag/{ tag_name }</Link>
            <span className="date">
              {' '}&mdash;{' '} { new Date(github_tag_date).toDateString() || 'date unknown' }
            </span>
          </span>

          {
            github_commit_hash
              ? (
                <span>
                  <Link
                    href={ `https://github.com/helxplatform/${ repo }/commit/${ github_commit_hash }` }
                    className="hash"
                    target="_blank"
                    rel="noopener noreferrer"
                  >{ github_commit_hash }</Link>
                  <span className="date">
                    {' '}&mdash;{' '} { new Date(github_commit_date).toDateString() || 'date unknown' }
                  </span>
                </span>
              ) : <Typography className="hash">hash unknown</Typography>
          }
        </Stack>
      </Box>

      <Divider>Artifacts</Divider>
      
      {
        Object.keys(artifacts).length
          ? Object.keys(artifacts).map(key => <Artifact key={ `${ tag_name }-${ key }` } location={ key } { ...artifacts[key] } />)
          : <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>None</Typography>
      }
    </Fragment>
  )
}

Tag.propTypes = {
  tag_name: PropTypes.string.isRequired,
  github_tag_date: PropTypes.string,
  repo: PropTypes.string.isRequired,
  github_commit_hash: PropTypes.string,
  github_commit_date: PropTypes.string,
  artifacts: PropTypes.object.isRequired,
}

