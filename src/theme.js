import { createTheme } from '@mui/material/styles'

const typography = {
  htmlFontSize: 16,
  h1: {
    fontSize: 'clamp(2rem, 6vw, 4rem)',
  },
  h2: {
    fontSize: 'clamp(1.7rem, 4vw, 3.5rem)',
  },
  h3: {
    fontSize: 'clamp(1.55rem, 4vw, 3rem)',
  },
  h4: {
    fontSize: 'clamp(1.4rem, 3vw, 2.5rem)',
    color: '#456',
  },
  h5: {
    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
    color: '#789',
  },
  h6: {
    fontSize: 'clamp(0.9rem, 1vw, 1rem)',
  },
}

const shape = {
  borderRadius: 0,
}

export const lightTheme = {
  palette: {
    primary: {
      main: '#375b77',
    },
    secondary: {
      main: '#468',
    },
    background: {
      default: '#ddd',
      paper: '#eee',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
  typography,
  shape,
}

export const darkTheme = {
  palette: {
    primary: {
      main: '#678ba7',
    },
    secondary: {
      main: '#468',
    },
    background: {
      default: '#666',
      paper: '#222',
    },
    text: {
      primary: '#fff',
      secondary: '#666',
    },
  },
  typography,
  shape,
}

