import styled from 'react-emotion'

export const Mufflable = styled('div')(
  ({
    muffled,
    unMuffled = false,
    direction = 'left',
  }: {
    muffled: boolean
    unMuffled?: boolean
    direction?: string
  }) => ({
    opacity: muffled && !unMuffled ? 0.5 : 1,
    fontSize: muffled ? 16 : 20,
    transformOrigin: `top ${direction}`,
    transition: 'opacity 200ms, font 200ms',
  }),
)
