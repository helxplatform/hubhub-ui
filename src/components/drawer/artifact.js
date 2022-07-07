import PropTypes from 'prop-types'
import {
  Box, Stack, Typography, useTheme, 
} from '@mui/material'
import dockerLogo from '../../images/docker-logo.svg'
import renciDash from '../../images/renci-dash.svg'

const ARTIFACT_LOGO = {
  dockerhub: dockerLogo,
  containers: renciDash,
}

const ARTIFACT_LOCATION = {
  dockerhub: 'DockerHub',
  containers: 'containers.renci.org',
}

export const Artifact = ({ location, digest }) => {
  const theme = useTheme()
  
  return (
    <Box sx={{
      padding: `0 ${ theme.spacing(1) }`,
      display: 'flex',
      alignItems: 'center',
      overflow: 'auto',
      gap: theme.spacing(1),
      '& .location-logo': {
        display: 'flex',
        flex: '0 0 32px',
        height: '32px',
        backgroundPosition: 'center center',
        backgroundSize: '32px 32px',
      },
      '& .location': {
      },
      '& .digest': {
        flex: 1,
        color: theme.palette.text.secondary,
      },
    }}>
      <Box
        className="location-logo"
        sx={{ backgroundImage: `url("${ ARTIFACT_LOGO[location] }")` }}
      />
      <Stack sx={{ flex: 1 }}>
        <Typography className="location" variant="caption">{ ARTIFACT_LOCATION[location] }</Typography>
        <Typography className="digest">{ digest }</Typography>
      </Stack>
    </Box>
  )
}

Artifact.propTypes = {
  location: PropTypes.string.isRequired,
  digest: PropTypes.string.isRequired,
}

