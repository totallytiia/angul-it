/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    colors: {
      'torch-red': {
        50: '#FFF2F4',
        100: '#FFE6E9',
        200: '#FEC0C8',
        300: '#FE9BA7',
        400: '#FD4F66',
        500: '#FC0424',
        600: '#E30420',
        700: '#970216',
        800: '#710210',
        900: '#4C010B',
      },

      'alabaster': {
        50: '#FFFFFF',
        100: '#FFFFFF',
        200: '#FEFEFE',
        300: '#FDFDFD',
        400: '#FCFCFC',
        500: '#FBFBFB',
        600: '#E2E2E2',
        700: '#979797',
        800: '#717171',
        900: '#4B4B4B',
      },

      'black-pearl': {
        50: '#F2F3F4',
        100: '#E6E8E9',
        200: '#C0C4C8',
        300: '#9BA1A7',
        400: '#4F5B66',
        500: '#041424',
        600: '#041220',
        700: '#020C16',
        800: '#020910',
        900: '#01060B',
      },

      'bright-turquoise': {
        50: '#F2FEFC',
        100: '#E6FCFA',
        200: '#C0F8F2',
        300: '#9BF4EA',
        400: '#4FEBDB',
        500: '#04E3CB',
        600: '#04CCB7',
        700: '#02887A',
        800: '#02665B',
        900: '#01443D',
      },

    },
  },
};
export const plugins = [];