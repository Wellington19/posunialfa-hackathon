import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme(
  {
    colors: {
      gray: {
        '900': '#181B23',
        '800': '#1F2029',
        '700': '#353646',
        '600': '#4B4D63',
        '500': '#616480',
        '400': '#797D9A',
        '300': '#9699B0',
        '200': '#B3B5C6',
        '100': '#D1D2DC',
        '50': '#EEEEF2'
      },
      blue: {
        '900': '#1A135A',
        '800': '#232D6B',
        '700': '#0064B0',
        '600': '#2B6CB0',
        '500': '#3182CE',
        '400': '#4299E1',
        '300': '#63B3ED',
        '200': '#90CDF4',
        '100': '#BEE3F8',
        '50': '#EBF8FF'
      }
    },
    fonts: {
      heading: 'Roboto, Segoe UI, Arial',
      body: 'Roboto, Segoe UI, Arial'
    },
    styles: {
      global: {
        body: {
          bg: 'gray.50',
          overflow: 'hidden'
        }
      }
    }
  }
)

export default theme
