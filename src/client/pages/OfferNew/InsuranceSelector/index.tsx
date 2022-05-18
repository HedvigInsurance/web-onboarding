import React, { useMemo, useState } from 'react'
import { QuoteBundleVariant } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { useLocalizeNumber } from 'l10n/useLocalizeNumber'
import { useFeature } from 'utils/hooks/useFeature'
import { Feature } from 'shared/clientConfig'
import { TextButton } from 'components/buttons'
import { hasCar } from 'api/quoteBundleSelectors'
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
import { Selector } from './Selector'

interface Props {
  variants: QuoteBundleVariant[]
  selectedQuoteBundle: QuoteBundleVariant
  onChange: (bundle: QuoteBundleVariant) => void
}

export const InsuranceSelector = ({
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

  const insurances = variants.map(({ id, tag, bundle }) => {
    const {
      displayName,
      bundleCost: {
        monthlyNet: { amount, currency },
        monthlyGross: { amount: grossAmount, currency: grossCurrency },
      },
    } = bundle

    return {
      id,
      label: tag ?? undefined,
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
              <TextButton
                mt="1.5rem"
                size="lg"
                onClick={() => setIsModalOpen(true)}
              >
                {textKeys.OPEN_COMPARISON_MODAL()}
              </TextButton>
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
function useGetTranslations(
  variants: QuoteBundleVariant[],
): { title: any; body: any } {
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
