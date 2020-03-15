import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { Peril } from 'pages/OfferNew/Perils/types'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import {
  Body,
  Column,
  ColumnSpacing,
  Container,
  HeadingBlack,
  HeadingWrapper,
  PreHeading,
} from '../components'
import { CompleteOfferDataForMember } from '../types'
import { getInsuranceType } from '../utils'
import { InsuranceValues } from './InsuranceValues'
import { PerilCollection } from './PerilCollection'
import { getLocalizedPerils } from './perilData'
import { PerilModal } from './PerilModal'

interface Props {
  offer: CompleteOfferDataForMember
}

const Wrapper = styled.div`
  padding: 8.5rem 0 5rem 0;
  background-color: ${colorsV2.offwhite};
  display: flex;
`

export const Perils: React.FC<Props> = ({ offer }) => {
  const textKeys = useTextKeys()
  const [isShowingPeril, setIsShowingPeril] = React.useState(false)
  const [currentPeril, setCurrentPeril] = React.useState(0)
  const [perils, setPerils] = React.useState<ReadonlyArray<Peril>>([])
  const currentLocale = useCurrentLocale()
  React.useEffect(() => {
    getLocalizedPerils(
      getInsuranceType(offer.lastQuoteOfMember),
      (currentLocale || 'sv') + '-SE',
    ).then(setPerils)
  }, [getInsuranceType(offer.lastQuoteOfMember), 'sv-SE'])

  return (
    <Wrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <PreHeading>{textKeys.COVERAGE_LABEL()}</PreHeading>
            <HeadingBlack>{textKeys.COVERAGE_HEADLINE()}</HeadingBlack>
            <Body>{textKeys.COVERAGE_BODY()}</Body>
          </HeadingWrapper>
          <PerilCollection
            perils={perils}
            setCurrentPeril={setCurrentPeril}
            setIsShowingPeril={setIsShowingPeril}
          />

          <InsuranceValues
            insuranceType={getInsuranceType(offer.lastQuoteOfMember)}
          />
        </Column>
        <ColumnSpacing />
      </Container>
      {perils.length > 0 && (
        <PerilModal
          perils={perils}
          currentPerilIndex={currentPeril}
          setCurrentPeril={setCurrentPeril}
          isVisible={isShowingPeril}
          onClose={() => setIsShowingPeril(false)}
        />
      )}
    </Wrapper>
  )
}
