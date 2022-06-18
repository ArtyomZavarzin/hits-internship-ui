import {createTheme} from '@mui/material'
import {indigo} from '@mui/material/colors'

const defaultTheme = createTheme()

const theme = createTheme({
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: {
      main: indigo['A200'],
    },
  },
  typography: {
    fontFamily: 'Raleway, Roboto, Helvetica, Arial, sans-serif',
  },
  components: {
    // MuiCssBaseline: {
    //   styleOverrides: `
    //     @font-face {
    //       font-family: 'SF Compact';
    //       font-style: normal;
    //       font-display: swap;
    //       font-weight: 400;
    //       src: local('SF Compact'), url(${SFpro}) format('dmg');
    //       unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    //     }
    //   `,
    // },
  },
})

export default theme
