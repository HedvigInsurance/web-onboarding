import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React, { useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TopBar, TopBarFiller } from 'components/TopBar'
import { BackgroundImage } from 'components/BackgroundImage'
import { Page } from 'components/utils/Page'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { useTextKeys } from 'utils/textKeys'
import { CheckmarkCircle } from 'components/icons/CheckmarkCircle'
import {
  LARGE_SCREEN_MEDIA_QUERY,
  MEDIUM_SCREEN_MEDIA_QUERY,
  MEDIUM_SMALL_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { LanguagePicker } from 'components/LanguagePicker/LanguagePicker'
import { useTrackEvent } from 'utils/tracking/gtm/useTrackEvent'
import { getProductsData } from './landingPageData'
import { Card, CardHeadline, CardParagraph } from './components/Card'

const LandingPageContainer = styled.div`
  position: relative;
  min-height: 100%;
  z-index: 1;
`

const Wrapper = styled.div`
  display: block;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    padding-top: 6vh;
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-top: calc(25vh - 10.5rem);
  }
`

const UspContainer = styled.div`
  display: block;
  margin-bottom: 1.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: ${colorsV3.gray100};

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    margin-bottom: 2rem;
  }

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    margin-bottom: 2rem;
    text-align: center;
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    margin-bottom: 4rem;
  }
`
const Headline = styled.h1`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2rem;
  line-height: 1.2;
  letter-spacing: -0.01em;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    margin-bottom: 0.75rem;
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    font-size: 3rem;
  }
`

const Preamble = styled.p`
  margin-top: 0;
  margin-bottom: 1.25rem;
  font-size: 1.25rem;
  line-height: 1.2;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
`

const UspList = styled.ul<{ isVisibleInMobile?: boolean }>`
  display: ${(props) => (props.isVisibleInMobile ? 'block' : 'none')};
  margin: 0;
  padding-left: 0;
  list-style: none;
  text-align: left;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    display: inline-flex;
  }
`

const UspItem = styled.li`
  display: flex;
  margin-bottom: 0.75rem;
  align-items: center;

  span {
    margin-left: 1rem;
    font-size: 1rem;
    line-height: 1.5;
  }

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    display: inline-flex;

    span {
      margin-right: 2rem;
    }
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    span {
      margin-right: 3rem;
    }
  }
`

const CardContainer = styled.div`
  position: relative;
  margin: 0;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    display: flex;
    justify-content: center;

    > * + * {
      margin-left: 1rem;
    }
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    width: 100%;

    > * + * {
      margin-left: 1.5rem;
    }
  }
`

export const Landing = () => {
  const textKeys = useTextKeys()
  const { marketLabel, path: localePath } = useCurrentLocale()
  const variation = useVariation()
  const productsData = useMemo(getProductsData, [])

  const [track, { hasTracked }] = useTrackEvent('begin_onboarding_home_page', {
    referer: window.hedvigClientConfig.referer,
  })

  useEffect(() => {
    if (!hasTracked) track()
  }, [track, hasTracked])

  return (
    <AnimatePresence>
      <motion.div
        key="landing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          ease: 'easeOut',
          duration: 0.5,
          delay: 0.25,
        }}
      >
        <Page>
          <Global
            styles={css`
              body {
                overflow: visible !important;
              }
            `}
          />
          <LandingPageContainer>
            {![Variation.IOS, Variation.ANDROID].includes(variation!) && (
              <>
                <TopBar isTransparent>
                  <LanguagePicker color="white" />
                </TopBar>
                <TopBarFiller />
              </>
            )}

            <Wrapper>
              <UspContainer>
                <Headline>{textKeys.STARTPAGE_HEADLINE()}</Headline>
                <Preamble>{textKeys.STARTPAGE_PREAMBLE()}</Preamble>
                <UspList isVisibleInMobile={marketLabel === 'SE'}>
                  <UspItem>
                    <CheckmarkCircle size="1.5rem" />
                    <span>{textKeys.STARTPAGE_USP_1()}</span>
                  </UspItem>
                  <UspItem>
                    <CheckmarkCircle size="1.5rem" />
                    <span>{textKeys.STARTPAGE_USP_2()}</span>
                  </UspItem>
                  <UspItem>
                    <CheckmarkCircle size="1.5rem" />
                    <span>{textKeys.STARTPAGE_USP_3()}</span>
                  </UspItem>
                </UspList>
              </UspContainer>
              <CardContainer>
                {productsData[marketLabel].map(
                  ({ id, linkSlug, badge, headline, paragraph, disabled }) => (
                    <Card
                      to={`/${localePath}/new-member${linkSlug}`}
                      badge={badge && textKeys[badge]()}
                      disabled={disabled}
                      key={id}
                    >
                      <CardHeadline disabled={disabled}>
                        {textKeys[headline]()}
                      </CardHeadline>
                      <CardParagraph>{textKeys[paragraph]()}</CardParagraph>
                    </Card>
                  ),
                )}
              </CardContainer>
            </Wrapper>
            <BackgroundImage isFullScreen zIndex={-1} />
          </LandingPageContainer>
        </Page>
      </motion.div>
    </AnimatePresence>
  )
}
