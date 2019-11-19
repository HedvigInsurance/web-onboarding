import styled from '@emotion/styled'

export enum Size {
  SM,
  MD,
  LG,
}

const spaceSizes: Record<Size, number> = {
  [Size.SM]: 12,
  [Size.MD]: 16,
  [Size.LG]: 20,
}

type spacingAttribute =
  | 'marginTop'
  | 'marginBottom'
  | 'marginRight'
  | 'marginLeft'
  | 'paddingTop'
  | 'paddingBottom'
  | 'paddingRight'
  | 'paddingLeft'

type Props = Partial<Record<spacingAttribute, Size>>

export const Spacing = styled('div')<Props>((props) =>
  Object.keys(props).reduce(
    (acc, key) => ({
      ...acc,
      [key]:
        spaceSizes[((props as any) as Props)[key as spacingAttribute] as Size],
    }),
    {},
  ),
)
