import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'
import {
  Column,
  ColumnSpacing,
  Container,
  HeadingBlack,
  HeadingWrapper,
  PreHeading,
  SubSubHeadingBlack,
} from '../components'
import { perils } from './mock'
import { PerilCollection } from './PerilCollection'
import { PerilModal } from './PerilModal'
import { PerilSwiper } from './PerilSwiper'

const Wrapper = styled('div')`
  padding: 5rem 0;
  background-color: ${colorsV2.offwhite};
  display: flex;
`

const Body = styled('div')`
  font-size: 1.25rem;
  line-height: 1.626rem;
  color: ${colorsV2.darkgray};
  margin-top: 2rem;
`

const ImportantNumbers = styled('div')`
  margin-top: 2rem;
`

export const Perils = () => {
  const [isShowingPeril, setIsShowingPeril] = React.useState(false)
  const [currentPeril, setCurrentPeril] = React.useState(0)
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  return (
    <Wrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <PreHeading>Skyddet</PreHeading>
            <HeadingBlack>
              {'Säkerhet genom livets alla $%*!;€&-stunder'}
            </HeadingBlack>
            <Body>
              Omfattande skydd för dig och din familj, ditt hus och dina prylar.
            </Body>
          </HeadingWrapper>

          {!isMobile ? (
            <PerilCollection
              perils={perils}
              setCurrentPeril={setCurrentPeril}
              setIsShowingPeril={setIsShowingPeril}
            />
          ) : (
            <PerilSwiper
              perils={perils}
              setCurrentPeril={setCurrentPeril}
              setIsShowingPeril={setIsShowingPeril}
            />
          )}

          <ImportantNumbers>
            <SubSubHeadingBlack>Viktiga siffror</SubSubHeadingBlack>
          </ImportantNumbers>
        </Column>
        <ColumnSpacing />
      </Container>
      <PerilModal
        perils={perils}
        currentPerilIndex={currentPeril}
        setCurrentPeril={setCurrentPeril}
        isVisible={isShowingPeril}
        onClose={() => setIsShowingPeril(false)}
      />
    </Wrapper>
  )
}
