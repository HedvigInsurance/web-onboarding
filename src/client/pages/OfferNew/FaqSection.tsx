import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import {
  QuoteBundleVariant,
  useFaqsQuery,
  useGetContractFaqsQuery,
} from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerIconProps,
} from 'components/Accordion/Accordion'
import { Cross } from 'components/icons/Cross'
import { Container, Heading, Column, ColumnSpacing } from './components'
import { Tabs } from './Tabs/Tabs'

const SectionWrapper = styled.div`
  padding-top: 5rem;
  /* Clear footer CTA */
  padding-bottom: calc(5rem + 135px);
  background: ${colorsV3.gray300};
  color: ${colorsV3.gray900};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-bottom: 5rem;
  }
`

const TabsWrapper = styled.div`
  margin-top: 1.5rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    margin-top: 3.5rem;
  }
`

const StyledAccordionItem = styled(AccordionItem)`
  &:not(:last-child) {
    padding-bottom: 1.5rem;
    ${LARGE_SCREEN_MEDIA_QUERY} {
      padding-bottom: 2.5rem;
    }
  }
`

const StyledAccordionTrigger = styled(AccordionTrigger)`
  font-size: 1.25rem;
  line-height: 1.4;
`

const AccordionBody = styled(ReactMarkdown)`
  padding-top: 0.5rem;
  line-height: 1.6;

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    &:first-of-type {
      padding-top: 0;
    }
  }
`

const ExpanderIcon = styled(Cross)<AccordionTriggerIconProps>(({ isOpen }) => ({
  transform: isOpen ? 'rotate(0deg)' : 'rotate(45deg)',
  marginLeft: '1rem',
  transition: 'transform 150ms',
  fill: colorsV3.gray900,
}))

type AccordionProps = {
  headline: string
  body: string
}

type FaqPanelProps = {
  list?: AccordionProps[]
}

const FaqPanel = ({ list }: FaqPanelProps) => {
  return (
    <Accordion mode="multiple">
      {list?.map((listItem) => (
        <StyledAccordionItem key={listItem?.headline}>
          <StyledAccordionTrigger>
            {listItem!.headline}
            <ExpanderIcon size="1rem" />
          </StyledAccordionTrigger>
          <AccordionContent>
            <AccordionBody source={listItem!.body!} escapeHtml={false} />
          </AccordionContent>
        </StyledAccordionItem>
      ))}
    </Accordion>
  )
}

type FaqSectionProps = {
  variants: QuoteBundleVariant[]
}

export const FaqSection = ({ variants }: FaqSectionProps) => {
  const textKeys = useTextKeys()

  const quotes = variants
    .map((v) => v.bundle.quotes)
    .reduce((accumulated, quotes) => [...accumulated, ...quotes], [])

  const { isoLocale } = useCurrentLocale()

  const { data, loading } = useGetContractFaqsQuery({
    variables: {
      input: {
        contractTypes: quotes.map((q) => q.typeOfContract),
        locale: isoLocale,
      },
    },
  })

  const tabItems = React.useMemo(() => {
    if (!data || !data.contractFaqs?.faqs?.length) return null

    return data.contractFaqs.faqs.map((d) => ({
      id: d.title || '',
      // if only one FAQ: show no tab (empty string for 'name')
      name: (data.contractFaqs?.faqs?.length ?? 0) < 2 ? '' : d.title!,
      content: <FaqPanel list={d.faq!} />,
    }))
  }, [data])

  const needsToUseFallbackData = !tabItems && !loading

  // if no data, get from old endpoint instead
  // TODO: remove when all FAQ content has been moved to PCMS from GraphCMS
  const faqs = useFaqsQuery({
    variables: { language: isoLocale },
    skip: !needsToUseFallbackData,
  })
  const languageData = faqs?.data?.languages[0]

  const fallbackItems = React.useMemo(() => {
    if (!languageData?.faqs) return null

    return [
      {
        id: '',
        name: '', // this will make no tab appear which is good for this fallback
        content: (
          <FaqPanel
            list={languageData?.faqs.map((d) => ({
              body: d.body!,
              headline: d.headline!,
            }))}
          />
        ),
      },
    ]
  }, [languageData])

  const items = tabItems || fallbackItems

  return (
    <SectionWrapper>
      <Container>
        <Column>
          <Heading>{textKeys.OFFER_FAQ_HEADING()}</Heading>
          <TabsWrapper>{items && <Tabs items={items} />}</TabsWrapper>
        </Column>
        <ColumnSpacing />
      </Container>
    </SectionWrapper>
  )
}
