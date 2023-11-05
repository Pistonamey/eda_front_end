import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#393E46',
    },
    secondary: {
      main: '#929AAB',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
    blue: {
      '50': '#E9F1FD',
      '100': '#C3D8FB',
      '200': '#9DBEF9',
      '300': '#7795F7',
      '400': '#5171F5',
      '500': '#1A73E8',
      '600': '#155AB4',
      '700': '#10408F',
      '800': '#0B266B',
      '900': '#061547',
  },
  
  gray: {
      '50': '#F5F6F8',
      '100': '#EAECEE',
      '200': '#DFE2E4',
      '300': '#D4D7D9',
      '400': '#C9CDD0',
      '500': '#9DA5B4',
      '600': '#7F8996',
      '700': '#626D78',
      '800': '#454F5A',
      '900': '#29323C',
  },
  
  red: {
      '50': '#FCE8E9',
      '100': '#F9D0D3',
      '200': '#F5B7BC',
      '300': '#F09FA5',
      '400': '#EC868E',
      '500': '#E63946',
      '600': '#BF2D3A',
      '700': '#991F2D',
      '800': '#731221',
      '900': '#4D0415',
  },
  
  white: {
      '50': '#ffffff',
      '100': '#f7f7f7',
      '200': '#efefef',
      '300': '#e7e7e7',
      '400': '#dfdfdf',
      '500': '#d7d7d7',
      '600': '#cfcfcf',
      '700': '#c7c7c7',
      '800': '#bfbfbf',
      '900': '#b7b7b7',
  },
  
  charcoal: {
      '50': '#E0E0E0',
      '100': '#BFBFBF',
      '200': '#9E9E9E',
      '300': '#7D7D7D',
      '400': '#5C5C5C',
      '500': '#2C2C2C',
      '600': '#232323',
      '700': '#191919',
      '800': '#0F0F0F',
      '900': '#050505',
  },
  
  silver: {
      '50': '#EDEDED',
      '100': '#DBDBDB',
      '200': '#C8C8C8',
      '300': '#B6B6B6',
      '400': '#A3A3A3',
      '500': '#C0C0C0',
      '600': '#A0A0A0',
      '700': '#808080',
      '800': '#606060',
      '900': '#404040',
  },
  
    
    
  },
  typography: {
    fontFamily: '"Inter","Roboto", "Arial", sans-serif',
  },
});

export default theme;
