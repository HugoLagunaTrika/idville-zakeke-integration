export interface StylerProps {
  items: CSSProps[]
}

export type CSSProps = {
  __editorItemTitle: string
  width?: string
  height?: string
  padding?: string
  margin?: string
  backgroundColor?: string
  color?: string
  fontSize?: string
  textAlign?: string
  display?: string
  maxWidth?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderRadius?: string
}

export const schema = {
  title: 'Styles CSS rules',
  type: 'array',
  items: {
    type: 'object',
    properties: {
      __editorItemTitle: {
        title: 'Screen',
        type: 'string',
        default: 'Global',
        enum: [
          'Global',
          'min-width: 80rem',
          'min-width: 64rem',
          'min-width: 40rem',
        ],
        enumNames: [
          'Global',
          'Desktop (min: 80rem)',
          'Tablet (min: 64rem)',
          'Mobile HD (min: 40rem)',
        ],
      },
      order: {
        title: 'Order',
        type: 'string',
        default: '',
        enum: [
          'order-0',
          'order-1',
          'order-2',
          'order-3',
          'order-4',
          'order-5',
        ],
      },
      width: {
        title: 'Width',
        type: 'string',
        default: '',
        enum: [
          '',
          'w-10',
          'w-20',
          'w-25',
          'w-30',
          'w-third',
          'w-33',
          'w-34',
          'w-40',
          'w-50',
          'w-60',
          'w-two-thirds',
          'w-70',
          'w-75',
          'w-80',
          'w-90',
          'w-100',
        ],
        enumNames: [
          '',
          'Width 10%',
          'Width 20%',
          'Width 25%',
          'Width 30%',
          'Width 1/3',
          'Width 33%',
          'Width 34%',
          'Width 40%',
          'Width 50%',
          'Width 60%',
          'Width 2/3',
          'Width 70%',
          'Width 75%',
          'Width 80%',
          'Width 90%',
          'Width 100%',
        ],
      },
      height: {
        title: 'Height',
        type: 'string',
        default: '',
        enum: ['', 'h1', 'h2', 'h3', 'h4', 'h5'],
        enumNames: ['', '1rem', '2rem', '4rem', '8rem', '16rem'],
      },
      padding: {
        title: 'Padding',
        type: 'string',
        default: '',
        enum: ['', 'pa0', 'pa1', 'pa2', 'pa3', 'pa4', 'pa5', 'pa6', 'pa7'],
        enumNames: [
          '',
          'none',
          '.25rem',
          '.50rem',
          '1rem',
          '2rem',
          '4rem',
          '8rem',
          '16rem',
        ],
      },
      margin: {
        title: 'Margin',
        type: 'string',
        default: '',
        enum: [
          '',
          'center',
          'ma0',
          'ma1',
          'ma2',
          'ma3',
          'ma4',
          'ma5',
          'ma6',
          'ma7',
        ],
        enumNames: [
          '',
          'center auto',
          'none',
          '.25rem',
          '.50rem',
          '1rem',
          '2rem',
          '4rem',
          '8rem',
          '16rem',
        ],
      },
      backgroundColor: {
        title: 'Background color',
        type: 'string',
        default: '',
        enum: [
          '',
          'bg-black',
          'bg-white',
          'bg-transparent',
          'bg-idville-blue-light',
          'bg-idville-blue-dark',
          'bg-idville-soft-gray',
          'bg-base',
          'bg-base--inverted',
          'bg-action-primary',
          'bg-action-secondary',
          'bg-emphasis',
          'bg-disabled',
          'bg-success',
          'bg-success--faded',
          'bg-danger',
          'bg-danger--faded',
          'bg-warning',
          'bg-warning--faded',
          'bg-light-red',
        ],
      },
      color: {
        title: 'Color',
        type: 'string',
        default: '',
        enum: [
          '',
          'white',
          'black',
          'light-gay',
          'dark-gray',
          'idville',
          'idville-orange',
          'black-90',
          'black-80',
          'black-70',
          'black-60',
          'black-50',
          'black-40',
          'black-30',
          'black-20',
          'black-10',
          'black-05',
          'black-025',
          'black-0125',
          'white-90',
          'white-80',
          'white-70',
          'white-60',
          'white-50',
          'white-40',
          'white-30',
          'white-20',
          'white-10',
          'white-05',
          'white-025',
          'white-0125',
        ],
      },
      fontSize: {
        title: 'Font size',
        type: 'string',
        default: '',
        enum: ['', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7'],
        enumNames: [
          '',
          '3.00rem',
          '2.25rem',
          '1.50rem',
          '1.25rem',
          '1.00rem',
          '.875rem',
          '.75rem',
        ],
      },
      fontType: {
        title: 'Font weight',
        type: 'string',
        default: '',
        enum: ['', 'b', 'normal', 'i'],
        enumNames: ['', 'bold', 'normal', 'italic'],
      },
      textAlign: {
        title: 'Text align',
        type: 'string',
        enum: ['', 'tc', 'tj', 'tl', 'tr'],
        enumNames: ['', 'center', 'justify', 'left', 'right'],
      },
      display: {
        title: 'Display',
        type: 'string',
        default: '',
        enum: ['', 'db', 'dn', 'dib', 'di', 'dit', 'flex'],
        enumNames: [
          '',
          'block',
          'none',
          'inline-block',
          'inline',
          'inline-table',
          'flex',
        ],
      },
      flexWrap: {
        title: 'Flex wrap',
        type: 'string',
        default: '',
        enum: ['', 'flex-wrap', 'flex-wrap-reverse', 'flex-nowrap'],
      },
      flexJustify: {
        title: 'Flex justify',
        type: 'string',
        default: '',
        enum: [
          '',
          'justify-center',
          'justify-around  ',
          'justify-between',
          'justify-end',
          'justify-start',
        ],
      },
      flexAlign: {
        title: 'Flex align',
        type: 'string',
        default: '',
        enum: [
          '',
          'items-start',
          'items-end',
          'items-center',
          'items-baseline',
        ],
      },
      maxWidth: {
        title: 'Max width',
        type: 'string',
        default: '',
        enum: [
          '',
          'mw1',
          'mw2',
          'mw3',
          'mw4',
          'mw5',
          'mw6',
          'mw7',
          'mw8',
          'mw9',
        ],
        enumNames: [
          '',
          '1rem',
          '2rem',
          '4rem',
          '8rem',
          '16rem',
          '32rem',
          '48rem',
          '63rem',
          '96rem',
        ],
      },
      borderWidth: {
        title: 'Border width',
        type: 'string',
        default: '',
        enum: ['', 'bw1', 'bw2', 'bw3', 'bw4', 'bw5'],
        enumNames: ['', '.125rem', '.25rem', '.5rem', '1rem', '2rem'],
      },
      borderStyle: {
        title: 'Border Style',
        type: 'string',
        default: '',
        enum: ['', 'b--none', 'b--solid', 'b--dashed', 'b--dotted'],
        enumNames: ['', 'none', 'solid', 'dashed', 'dotted'],
      },
      borderColor: {
        title: 'Border Color',
        type: 'string',
        default: '',
        enum: [
          '',
          'b--action-primary',
          'b--action-secondary',
          'b--emphasis',
          'b--disabled',
          'b--success',
          'b--success--faded',
          'b--danger',
          'b--danger--faded',
          'b--warning',
          'b--warning--faded',
        ],
      },
      borderRadius: {
        title: 'Border radius',
        type: 'string',
        default: '',
        enum: ['', 'br1', 'br2', 'br3', 'br4', 'br-100', 'br-0'],
        enumNames: ['', '.125rem', '.25rem', '.5rem', '1rem', '100%', '0'],
      },
    },
  },
}

const useStyler = (props: StylerProps) => {
  const { items } = props

  if (items.length === 0) return ''

  const RAWglobal = items
    .map(e => {
      const clean = { ...e }
      const keys: { [key: string]: string } = {
        Global: ' ',
        'min-width: 80rem': '-xl ',
        'min-width: 64rem': '-l ',
        'min-width: 40rem': '-m ',
      }

      clean.__editorItemTitle = ''

      return Object.values(clean)
        .filter(css => css)
        .map(css => css?.concat(keys[e.__editorItemTitle]))
        .join(' ')
        .replace(/ {2,50}/g, ' ')
        .replace(/,/g, '')
    })
    .join(' ')

  return `${RAWglobal}`
}

export default useStyler
