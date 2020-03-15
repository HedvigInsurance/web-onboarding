import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import {
  getLocaleIsoCode,
  useCurrentLocale,
} from 'components/utils/CurrentLocale'
import { useFaqsQuery } from 'generated/graphql'
import React from 'react'
import AnimateHeight from 'react-animate-height'
import ReactMarkdown from 'react-markdown/with-html'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import {
  Column,
  ColumnSpacing,
  Container,
  HeadingWhite,
  PreHeading,
} from './components'

const BlobSvg = styled.svg`
  width: 100%;
  height: 2rem;
  fill: ${colorsV2.black};
  transform: rotateY(180deg);
`

const SectionWrapper = styled.div`
  padding: 8rem 2rem 12rem 2rem;
  margin-top: -10px;
  background: ${colorsV2.black};
  color: ${colorsV2.white};

  @media (max-width: 420px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

const SmallerHeading = styled(HeadingWhite)`
  font-size: 3.5rem;
  line-height: 3.5rem;
  margin-bottom: 4rem;
`

const AccordionsWrapper = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
`

const AccordionWrapper = styled('li')`
  padding: 0;
  margin: 0;
`

const AccordionHeadline = styled('h3')`
  font-size: 1.25rem;
  line-height: 1.25;
`

const AccordionBody = styled(ReactMarkdown)`
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
  fill: ${colorsV2.white};
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
  const language = getLocaleIsoCode(pathLocale)
  const faqs = useFaqsQuery({ variables: { language } })
  const languageData = faqs?.data?.languages[0]
  const textKeys = useTextKeys()

  return (
    <>
      <BlobSvg viewBox="0 0 375 44" preserveAspectRatio="none">
        <path d="M.032 44A9.744 9.744 0 0 1 0 43.207c0-24.246 54 2.987 151-30.379s224 6.133 224 30.38c0 .263-.01.527-.031.792H.032z" />
      </BlobSvg>
      <SectionWrapper>
        <Container>
          <Column>
            <PreHeading>{textKeys.OFFER_FAQ_PRE_HEADING()}</PreHeading>
            <SmallerHeading>{textKeys.OFFER_FAQ_HEADING()}</SmallerHeading>
            <AccordionsWrapper>
              {(languageData?.faqs ?? []).map((faq) => (
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
