import React, { useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { QuoteBundleVariant, useExternalInsuranceDataQuery } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { useLocalizeNumber } from 'l10n/useLocalizeNumber'
import { useFeature } from 'utils/hooks/useFeature'
import { Feature } from 'shared/clientConfig'
import { TextButton } from 'components/buttons'
import { hasCar } from 'api/quoteBundleSelectors'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import {
  ContainerWrapper,
  Container,
  Column,
  HeadingWrapper,
  HeadingBlack,
  Body,
  ColumnSpacing,
} from '../components'
import { ComparisonModal } from '../ComparisonTable/ComparisonModal'
import { getUniqueQuotesFromVariantList } from '../utils'
import { SelectableInsurance, Selector } from './Selector'
import {
  getInsuranceExposure,
  getDataCollection,
  matchVariantAndDataCollection,
} from './InsuranceSelector.helpers'

interface Props {
  dataCollectionId: string | null
  variants: QuoteBundleVariant[]
  selectedQuoteBundle: QuoteBundleVariant
  onChange: (bundle: QuoteBundleVariant, automated?: boolean) => void
}

const CompareInsuranceButton = styled(TextButton)`
  font-size: 1rem;
  line-height: 1.5;
  margin: 0.5rem 0 0;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1.125rem;
  }
`

export const InsuranceSelector = ({
  dataCollectionId,
  variants,
  selectedQuoteBundle,
  onChange,
}: Props) => {
  const textKeys = useTextKeys()
  const localizedPerMonth = textKeys.SIDEBAR_PRICE_SUFFIX_INTERVAL()
  const localizeNumber = useLocalizeNumber()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isComparisonTableEnabled] = useFeature([Feature.COMPARISON_TABLE])

  const variantMap = useMemo(
    () =>
      variants.reduce<Record<string, QuoteBundleVariant>>(
        (acc, variant) => ({ ...acc, [variant.id]: variant }),
        {},
      ),
    [variants],
  )

  const exposure = useMemo(() => getInsuranceExposure(variants), [variants])

  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()
  const { data } = useExternalInsuranceDataQuery({
    skip: !dataCollectionId,
    variables: dataCollectionId ? { reference: dataCollectionId } : undefined,
    onCompleted(data) {
      // Update selected variant based on matching insurance tier
      if (selectedInsuranceTypes.length === 0) {
        const matchingDataCollection = getDataCollection(data, exposure)
        if (matchingDataCollection) {
          const matchingVariant = variants.find((variant) =>
            matchVariantAndDataCollection(variant, matchingDataCollection),
          )

          if (matchingVariant) {
            onChange(matchingVariant, true)
          }
        }
      }
    },
  })

  const matchingDataCollection = useMemo(
    () => (data ? getDataCollection(data, exposure) : undefined),
    [data, exposure],
  )
  const insurances: SelectableInsurance[] = variants.map((variant) => {
    const { id, tag, description, bundle } = variant
    const {
      displayName,
      bundleCost: {
        monthlyNet: { amount, currency },
        monthlyGross: { amount: grossAmount, currency: grossCurrency },
      },
    } = bundle

    const matchesOldInsurance = matchingDataCollection
      ? matchVariantAndDataCollection(variant, matchingDataCollection)
      : false

    const matchesLabel = matchesOldInsurance
      ? textKeys.EXTERNAL_INSURANCE_COVERAGE_MATCH_LABEL()
      : ''

    return {
      id,
      description: description ?? '',
      label: tag ?? matchesLabel,
      name: displayName,
      price: `${localizeNumber(
        Math.round(Number(amount)),
      )} ${currency}${localizedPerMonth}`,
      grossPrice:
        amount !== grossAmount
          ? `${Math.round(
              Number(grossAmount),
            )} ${grossCurrency}${localizedPerMonth}`
          : undefined,
      selected: id === selectedQuoteBundle.id,
    }
  })

  const { title, body } = useGetTranslations(variants)

  return (
    <ContainerWrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <HeadingBlack>{title}</HeadingBlack>
            <Body>{body}</Body>

            {isComparisonTableEnabled && variants.length > 0 && (
              <CompareInsuranceButton onClick={() => setIsModalOpen(true)}>
                {textKeys.OPEN_COMPARISON_MODAL()}
              </CompareInsuranceButton>
            )}
          </HeadingWrapper>
          <Selector
            insurances={insurances}
            onChange={(id: string) => {
              const variant = variantMap[id]
              variant && onChange(variant)
            }}
          />
        </Column>
        <ColumnSpacing />
      </Container>
      <ComparisonModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bundles={variants.map((v) => v.bundle)}
      />
    </ContainerWrapper>
  )
}

const useGetTranslations = (
  variants: QuoteBundleVariant[],
): { title: any; body: any } => {
  const bundles = getUniqueQuotesFromVariantList(variants)
  const hasCarInBundles = hasCar(bundles)
  const textKeys = useTextKeys()

  const translations = useMemo(() => {
    return {
      title: hasCarInBundles
        ? textKeys.OFFER_BUNDLE_SELECTOR_TITLE_CAR()
        : textKeys.OFFER_BUNDLE_SELECTOR_TITLE(),
      body: hasCarInBundles
        ? textKeys.OFFER_BUNDLE_SELECTOR_DESCRIPTION_CAR()
        : textKeys.OFFER_BUNDLE_SELECTOR_DESCRIPTION(),
    }
  }, [hasCarInBundles, textKeys])

  return translations
}
