import styled from 'react-emotion'

export const Mufflable = styled('div')(
  ({
    muffled,
    direction = 'left',
  }: {
    muffled: boolean
    direction?: string
  }) => ({
    opacity: muffled ? 0.5 : 1,
    fontSize: muffled ? 16 : 20,
    transformOrigin: `top ${direction}`,
    transition: 'opacity 200ms, font 200ms, maxHeight: 300ms',
  }),
)
