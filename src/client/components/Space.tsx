import styled, { CSSObject } from '@emotion/styled'
import { BREAKPOINTS, MEDIA_QUERIES } from '../utils/mediaQueries'

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

type BaseProps = {
  x?: number | PartialRecord<keyof typeof BREAKPOINTS | 'base', number>
  y?: number | PartialRecord<keyof typeof BREAKPOINTS | 'base', number>
}

export const Space = styled.div<BaseProps>({}, ({ x, y }) => {
  const styles: CSSObject = {}
  const selector = '> :not([hidden]) ~ :not([hidden])'

  if (typeof x === 'number') {
    styles[selector] = { marginLeft: `${x}rem` }
  } else if (x) {
    const levels = Object.keys(x) as Array<keyof typeof x>
    levels.forEach((level) => {
      const style: CSSObject = { marginLeft: `${x[level]}rem` }

      if (level === 'base') {
        styles[selector] = style
      } else {
        styles[MEDIA_QUERIES[level]] = {
          [selector]: style,
        }
      }
    })
  }

  if (typeof y === 'number') {
    styles[selector] = { marginTop: `${y}rem` }
  } else if (y) {
    const levels = Object.keys(y) as Array<keyof typeof y>
    levels.forEach((level) => {
      const style: CSSObject = { marginTop: `${y[level]}rem` }

      if (level === 'base') {
        styles[selector] = style
      } else {
        styles[MEDIA_QUERIES[level]] = {
          [selector]: style,
        }
      }
    })
  }

  return styles
})
