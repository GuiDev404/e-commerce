import { extendTheme } from '@chakra-ui/react';

const fonts = {
  heading: 'Inter, sans-serif',
  body: 'Inter, sans-serif',
};

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,

  fonts,
});

export default theme;
