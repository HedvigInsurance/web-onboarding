import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'

export const Heading = styled('h1')`
  font-family: ${fonts.GEOMANIST};
  font-size: 4rem;
  line-height: 4rem;
  font-weight: 600;
  letter-spacing: -0.91px;
  margin: 0;
`

export const HeadingWhite = styled(Heading)`
  color: ${colorsV2.white};
`

export const HeadingBlack = styled(Heading)`
  color: ${colorsV2.black};
`

export const SubHeading = styled('h2')`
  font-family: ${fonts.GEOMANIST};
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: 500;
  letter-spacing -0.34px;
`

export const SubHeadingWhite = styled(SubHeading)`
  color: ${colorsV2.white};
`

export const SubHeadingBlack = styled(SubHeading)`
  color: ${colorsV2.black};
`

export const SubSubHeading = styled('h2')`
  font-family: ${fonts.GEOMANIST};
  font-size: 1.25re;
  line-height: 1.25rem;
  font-weight: 500;
`

export const SubSubHeadingWhite = styled(SubSubHeading)`
  color: ${colorsV2.white};
`

export const SubSubHeadingBlack = styled(SubSubHeading)`
  color: ${colorsV2.black};
`

export const PreHeading = styled('div')`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  letter-spacing: 2.67px;
  color: ${colorsV2.gray};
  text-transform: uppercase;
  margin-bottom: 1.625rem;
`

export const HeadingWrapper = styled('div')`
  padding-right: 6.25rem;
  margin-bottom: 3.875rem;
`

export const Container = styled('div')`
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  margin: 0 auto;
  max-width: 80rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;

  @media (max-width: 500px) {
    padding: 0 1rem;
  }
`

export const Column = styled('div')`
  display: flex;
  flex-flow: column;
  max-width: 47.5rem;
  width: 100%;
  flex-grow: 0;
  box-sizing: border-box;
  padding-right: 1rem;
`

export const ColumnSpacing = styled('div')`
  width: 26rem;
  height: 31rem;
  flex-shrink: 0;
`
