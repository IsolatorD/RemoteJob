import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#00BFFF',
  secondary: '#FF6347',
  tertiary: '#FFD700',
  black: '#000',
  white: '#FFF',
  gray: '#D3D3D3',
  darkgray: '#808080',
}

export const SIZES = {
  base: 8,
  font: 14,
  radius: 6,
  padding: 25,
  margin: 25,
  // fonts
  h1: 34,
  h2: 24,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 14,
  body: 14,
  caption: 12,
  // Screen Dimensions
  width,
  height,
}


export const FONTS = {
  h1: {
    fontSize: SIZES.h1,
    // fontWeight: 'bold',
  },
  h2: {
    fontSize: SIZES.h2,
    // fontWeight: 'bold',
  },
  h3: {
    fontSize: SIZES.h3,
    // fontWeight: 'bold',
  },
  h4: {
    fontSize: SIZES.h4,
    // fontWeight: 'bold',
  },
  h5: {
    fontSize: SIZES.h5,
    // fontWeight: 'bold',
  },
  h6: {
    fontSize: SIZES.h6,
    // fontWeight: 'bold',
  },
  body: {
    fontSize: SIZES.body,
    // fontWeight: 'bold',
  },
  caption: {
    fontSize: SIZES.caption,
    // fontWeight: 'bold',
  }
}

const appTheme = {
  COLORS,
  SIZES,
  FONTS,
}

export default appTheme;