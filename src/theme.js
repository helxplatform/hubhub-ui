const typography = {
  htmlFontSize: 16,
  h1: {
    fontSize: 'clamp(2rem, 6vw, 3rem)',
  },
  h2: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
  },
  h3: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
  },
  h4: {
    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
    color: '#456',
  },
  h5: {
    fontSize: '1.25rem',
    color: '#789',
  },
  h6: {
    fontSize: '1rem',
    color: '#333',
  },
}

const shape = {
  borderRadius: 0,
}

export const lightTheme = {
  palette: {
    primary: {
      main: '#36688b',
    },
    secondary: {
      main: '#6E368B',
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
      main: '#0097a7',
    },
    secondary: {
      main: '#6E368B',
    },
    background: {
      default: '#444',
      paper: '#222',
    },
    text: {
      primary: '#fff',
      secondary: '#999',
    },
  },
  typography,
  shape,
}

