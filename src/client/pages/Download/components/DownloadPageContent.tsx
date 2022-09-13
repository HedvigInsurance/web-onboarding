import React from 'react'
import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import { useTextKeys } from 'utils/textKeys'
import {
  LARGE_SCREEN_MEDIA_QUERY,
  MEDIUM_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { Features, useFeature } from 'utils/hooks/useFeature'
import { useActiveContractBundles } from 'pages/Download/useActiveContractBundles'
import { TypeOfContract } from 'data/graphql'
import { Feature } from 'shared/clientConfig'
import { GetAppButtons } from './GetAppButtons'
import { SwitchingNotice } from './SwitchingNotice'
import { useGetImageUrl } from './useGetImageUrl'
import { CrossSells } from './CrossSells'

type HeadlineWrapperProps = {
  imageUrl: string
}

const HeadlineWrapper = styled.div(({ imageUrl }: HeadlineWrapperProps) => ({
  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${imageUrl})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  color: colorsV3.gray100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '3rem 1rem',

  [MEDIUM_SCREEN_MEDIA_QUERY]: {
    padding: '11rem 0',
  },
}))

const Headline = styled.h1({
  fontSize: '1.5rem',
  margin: 0,
  textAlign: 'center',
  fontFamily: fonts.HEDVIG_LETTERS_BIG,

  [MEDIUM_SCREEN_MEDIA_QUERY]: {
    fontSize: '2.5rem',
  },
})

const TextWrapper = styled.div({
  maxWidth: '32rem',
  marginTop: '0.5rem',
  marginBottom: '1.5rem',
  fontSize: '0.875rem',
  lineHeight: '1.5rem',

  [MEDIUM_SCREEN_MEDIA_QUERY]: {
    marginBottom: '3rem',
    marginTop: '1.5rem',
    fontSize: '1rem',
  },
})

const Paragraph = styled.p({
  textAlign: 'center',
  margin: 0,

  ':not(:last-of-type)': {
    marginBottom: '0.75rem',
  },
})

const AdditionalContentWrapper = styled.div({
  display: 'flex',
  padding: '2rem 1rem',
  gap: '1.5rem',
  alignItems: 'center',
  flexDirection: 'column',

  [LARGE_SCREEN_MEDIA_QUERY]: {
    padding: '4rem 5rem',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
})

type DownloadPageContentProps = {
  paragraphTextKeys?: string[]
  headlineTextKeys?: string[]
}

export const DownloadPageContent = ({
  paragraphTextKeys = [
    'ONBOARDING_DOWNLOAD_PARAGRAPH_1',
    'ONBOARDING_DOWNLOAD_PARAGRAPH_2',
  ],
  headlineTextKeys = [
    'ONBOARDING_DOWNLOAD_HEADLINE_PART_1',
    'ONBOARDING_DOWNLOAD_HEADLINE_PART_2',
  ],
}: DownloadPageContentProps) => {
  const textKeys = useTextKeys()
  const imageUrl = useGetImageUrl()

  const [crossSellEnabled, carCancellationEnabled] = useFeature([
    Features.CONFIRMATION_PAGE_CROSS_SELL,
    Feature.CAR_CANCELLATION,
  ])

  const { contracts = [] } = useActiveContractBundles()
  const carSwitchingContract = contracts.find(
    (contract) =>
      isCarContract(contract) && contract.switchedFromInsuranceProvider,
  )
  const isCarSwitcher = carCancellationEnabled && !!carSwitchingContract
  return (
    <>
      <HeadlineWrapper imageUrl={imageUrl}>
        <Headline>
          {headlineTextKeys.map((textKey) => textKeys[textKey]() + ' ')}
        </Headline>

        <TextWrapper>
          {paragraphTextKeys.map((textKey) => (
            <Paragraph key={textKey}>{textKeys[textKey]()}</Paragraph>
          ))}
        </TextWrapper>
        <GetAppButtons fill={colorsV3.gray100} />
      </HeadlineWrapper>

      <AdditionalContentWrapper>
        {isCarSwitcher && (
          <SwitchingNotice inception={carSwitchingContract?.inception} />
        )}
        {crossSellEnabled && <CrossSells />}
      </AdditionalContentWrapper>
    </>
  )
}

const isCarContract = (contract: { typeOfContract: string }) => {
  return [
    TypeOfContract.SeCarTraffic,
    TypeOfContract.SeCarHalf,
    TypeOfContract.SeCarFull,
  ].includes(contract.typeOfContract as TypeOfContract)
}
