import { colorsV2, fonts } from '@hedviginsurance/brand'
import styled from 'react-emotion'

export const Heading = styled.h1`
  font-family: ${fonts.GEOMANIST};
  font-size: 64px;
  line-height: 64px;
  font-weight: 700;
  letter-spacing: -0.91px;
`

export const HeadingWhite = styled(Heading)`
  color: ${colorsV2.white};
`

export const HeadingBlack = styled(Heading)`
  color: ${colorsV2.black};
`

export const SubHeading = styled.h2`
  font-family: ${fonts.GEOMANIST};
  font-size: 24px;
  line-height: 24px;
  font-weight: 500;
  letter-spacing -0.34px;
`

export const SubHeadingWhite = styled(SubHeading)`
  color: ${colorsV2.white};
`

export const SubHeadingBlack = styled(SubHeading)`
  color: ${colorsV2.black};
`

export const SubSubHeading = styled.h2`
  font-family: ${fonts.GEOMANIST};
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
`

export const SubSubHeadingWhite = styled(SubSubHeading)`
  color: ${colorsV2.white};
`

export const SubSubHeadingBlack = styled(SubSubHeading)`
  color: ${colorsV2.black};
`

export const PreHeading = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  letter-spacing: 2.67px;
  color: ${colorsV2.gray};
  text-transform: uppercase;
  margin-bottom: 25px;
`

export const HeadingWrapper = styled.div`
  padding-right: 100px;
  margin-bottom: 46px;
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 32px;
  margin: 0 auto;
  max-width: 1264px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`

export const Column = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 760px;
  width: 100%;
  flex-grow: 0;
  box-sizing: border-box;
`
