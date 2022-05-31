import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import AnimateHeight from 'react-animate-height'
import ReactMarkdown from 'react-markdown/with-html'
import {
  QuoteBundleVariant,
  useFaqsQuery,
  useGetContractFaqsQuery,
} from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import {
  LARGE_SCREEN_MEDIA_QUERY,
  MEDIUM_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
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

const AccordionsWrapper = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1.5rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    margin-top: 3.5rem;
  }
`

const AccordionWrapper = styled('li')`
  padding: 0;
  margin: 0;

  &:not(:last-child) {
    margin-bottom: 1.5rem;

    ${LARGE_SCREEN_MEDIA_QUERY} {
      margin-bottom: 2.5rem;
    }
  }
`

const AccordionHeadline = styled('h3')`
  font-size: 1.25rem;
  line-height: 1.4;
  margin: 0;
`

const AccordionBody = styled(ReactMarkdown)`
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  line-height: 1.6;

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    &:first-of-type {
      margin-top: 0;
    }
  }
`

const ExpandToggler = styled.button`
  all: unset;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    width: auto;
    justify-content: flex-start;
  }

  &:focus {
    outline: none;
  }
`

interface Openable {
  isOpen: boolean
}

const ExpanderIcon = styled.svg<Openable>`
  ${({ isOpen }) => css`
    transform: ${isOpen ? 'rotate(45deg)' : 'rotate(0deg)'};
  `};
  margin-left: 1rem;
  transition: transform 150ms;
  flex-shrink: 0;
  width: 0.8rem;
  height: 0.8rem;
  fill: ${colorsV3.gray900};
`

interface AccordionProps {
  headline: string
  body: string
}

const Accordion = ({ headline, body }: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleIsOpen = () => setIsOpen(!isOpen)

  return (
    <AccordionWrapper>
      <AccordionHeadline>
        <ExpandToggler onClick={toggleIsOpen}>
          {headline}
          <ExpanderIcon viewBox="0 0 357 357" isOpen={isOpen}>
            <path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z" />
          </ExpanderIcon>
        </ExpandToggler>
      </AccordionHeadline>
      <AnimateHeight height={isOpen ? 'auto' : 0}>
        <AccordionBody source={body} escapeHtml={false} />
      </AnimateHeight>
    </AccordionWrapper>
  )
}

type FaqPanelProps = {
  list?: AccordionProps[]
}

const FaqPanel = ({ list }: FaqPanelProps) => {
  return (
    <>
      {list?.map((listItem) => (
        <Accordion
          key={listItem?.headline}
          headline={listItem!.headline}
          body={listItem!.body!}
        />
      ))}
    </>
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
          <AccordionsWrapper>
            {items && <Tabs items={items} />}
          </AccordionsWrapper>
        </Column>
        <ColumnSpacing />
      </Container>
    </SectionWrapper>
  )
}
