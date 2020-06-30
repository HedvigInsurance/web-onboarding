import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React, { useEffect, useState } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { TextContent } from './components'

const Page = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const NavigationOverlay = styled.button<{ width: string; offset: string }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: ${({ offset }) => offset};
  width: ${({ width }) => width};
  background: transparent;
  border: 0;

  display: block;
  @media (min-width: 800px) {
    display: none;
  }

  :hover,
  :focus {
    box-shadow: none;
    outline: none;
  }
`

const stretch = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`
const ProgressIndicatorWrapper = styled.div`
  position: fixed;
  left: 1rem;
  right: 1rem;
  display: flex;

  top: 70px;
  @media (min-width: 800px) {
    top: 90px;
  }
`
const ProgressIndicator = styled.div<{
  count: number
  state: 'shown' | 'showing' | 'upcoming'
}>`
  width: 100%;
  background: ${colorsV3.gray700};

  :not(:last-of-type) {
    margin-right: 3px;
  }

  ${({ state }) =>
    ['shown', 'showing'].includes(state) &&
    css`
      :before {
        display: block;
        content: ' ';
        width: 100%;
        background: ${colorsV3.gray300};
        transform-origin: left center;
        ${state === 'showing' &&
          css`
            animation: ${stretch} 4000ms linear forwards;
          `};
      }
    `};

  &,
  &:before {
    height: 0.125rem;
  }

  @media (min-width: 800px) {
    &,
    &:before {
      height: 0.25rem;
    }
  }
`

const SkipButton = styled(Link)`
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  text-decoration: none;

  color: ${colorsV3.gray500};
  &:hover,
  &:focus {
    color: ${colorsV3.gray300};
  }

  display: none;
  @media (min-width: 800px) {
    display: inline-block;
  }
`

interface IntroProps extends RouteComponentProps {
  onFinished?: () => void
}

export const IntroStoriesComponent: React.FC<IntroProps> = ({
  onFinished,
  history,
}) => {
  const textKeys = useTextKeys()
  const [page, setPage] = useState(0)
  const [autoPaginationTimeout, setAutoPaginationTimeout] = useState<
    number | null
  >(null)

  const pages = [
    <Page key={0} visible={page === 0}>
      <TextContent>
        {textKeys.FOREVER_INTRO_PAGE_1({
          REFERRER: stripTrailingS('Rebecca'),
        })}
      </TextContent>
    </Page>,
    <Page key={1} visible={page === 1}>
      <TextContent>{textKeys.FOREVER_INTRO_PAGE_2()}</TextContent>
    </Page>,
    <Page key={2} visible={page === 2}>
      <TextContent>{textKeys.FOREVER_INTRO_PAGE_3()}</TextContent>
    </Page>,
    <Page key={3} visible={page === 3}>
      <TextContent>{textKeys.FOREVER_INTRO_PAGE_4()}</TextContent>
    </Page>,
  ]

  useEffect(() => {
    if (autoPaginationTimeout) {
      window.clearTimeout(autoPaginationTimeout)
    }

    const timeout = window.setTimeout(() => {
      incrementPage()
    }, 4000)
    setAutoPaginationTimeout(timeout)

    return () => {
      if (autoPaginationTimeout) {
        window.clearTimeout(autoPaginationTimeout)
      }
    }
  }, [page])

  const decrementPage = () => {
    setPage(Math.max(page - 1, 0))
  }

  const incrementPage = () => {
    if (page === pages.length - 1 && onFinished) {
      onFinished()
    } else {
      setPage(page + 1)
    }
  }

  return (
    <>
      {pages}

      <ProgressIndicatorWrapper>
        {pages.map((_, i) => (
          <ProgressIndicator
            key={i}
            count={pages.length}
            state={(() => {
              if (i === page) {
                return 'showing'
              }
              if (i < page) {
                return 'shown'
              }
              return 'upcoming'
            })()}
          />
        ))}
      </ProgressIndicatorWrapper>

      <NavigationOverlay
        width="30%"
        offset="0"
        onClick={(e) => {
          e.preventDefault()
          decrementPage()
        }}
      />
      <NavigationOverlay
        width="70%"
        offset="30%"
        onClick={(e) => {
          e.preventDefault()
          incrementPage()
        }}
      />
      <SkipButton to={history.location.pathname + '/ready'}>
        {textKeys.SKIP()}
      </SkipButton>
    </>
  )
}

export const IntroStories = withRouter(IntroStoriesComponent)

export const stripTrailingS = (str: string) => {
  return str.replace(/s+$/i, '')
}
