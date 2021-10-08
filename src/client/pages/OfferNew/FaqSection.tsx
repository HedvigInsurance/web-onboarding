import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import AnimateHeight from 'react-animate-height'
import ReactMarkdown from 'react-markdown/with-html'
import { useFaqsQuery } from 'data/graphql'
import { getIsoLocale, useCurrentLocale } from 'components/utils/CurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Column, ColumnSpacing, Container, Heading } from './components'

const SectionWrapper = styled.div`
  padding: 8rem 2rem 12rem 2rem;
  margin-top: -10px;
  background: ${colorsV3.gray900};
  color: ${colorsV3.white};

  @media (max-width: 420px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

export const HeadingWhite = styled(Heading)`
  color: ${colorsV3.gray100};
`

const AccordionsWrapper = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1.5rem;
`

const AccordionWrapper = styled('li')`
  padding: 0;
  margin: 0;

  &:not(:last-child) {
    margin-bottom: 1rem;

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
  color: ${colorsV3.gray100};
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

const ExpandToggler = styled('button')`
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: inherit;
  line-height: inherit;
  font-size: inherit;
  background: transparent;
  border: none;
  font-weight: inherit;
  font-family: inherit;
  padding: 0;
  color: inherit;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }

  &:focus {
    outline: none;
  }
`

const AccordionHeadlineContent = styled('span')`
  padding-right: 1rem;
`

interface Openable {
  isOpen: boolean
}

const ExpanderIcon = styled.svg<Openable>`
  ${({ isOpen }) => css`
    transform: ${isOpen ? 'rotate(45deg)' : 'rotate(0deg)'};
  `};
  transition: transform 150ms;
  flex-shrink: 0;
  width: 0.8rem;
  height: 0.8rem;
  fill: ${colorsV3.white};
`

interface AccordionProps {
  id: string
  headline: string
  body: string
}

export const Accordion: React.FC<AccordionProps> = ({ headline, body }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleIsOpen = () => setIsOpen(!isOpen)

  return (
    <AccordionWrapper>
      <AccordionHeadline>
        <ExpandToggler onClick={toggleIsOpen}>
          <AccordionHeadlineContent>{headline}</AccordionHeadlineContent>
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

export const FaqSection: React.FC = () => {
  const pathLocale = useCurrentLocale()
  const language = getIsoLocale(pathLocale)
  const faqs = useFaqsQuery({ variables: { language } })
  const languageData = faqs?.data?.languages[0]
  const textKeys = useTextKeys()

  return (
    <>
      <SectionWrapper>
        <Container>
          <Column>
            <HeadingWhite>{textKeys.OFFER_FAQ_HEADING()}</HeadingWhite>
            <AccordionsWrapper>
              {languageData?.faqs?.map((faq) => (
                <Accordion
                  key={faq?.id}
                  id={faq?.id}
                  headline={faq!.headline!}
                  body={faq!.body!}
                />
              ))}
            </AccordionsWrapper>
          </Column>

          <ColumnSpacing />
        </Container>
      </SectionWrapper>
    </>
  )
}
