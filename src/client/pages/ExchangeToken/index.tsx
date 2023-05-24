import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useParams } from 'react-router-dom'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { LanguagePicker } from 'components/LanguagePicker/LanguagePicker'
import { Button } from 'components/buttons'
import { useTextKeys } from 'utils/textKeys'

export const ExchangeTokenPage = () => {
  const textKeys = useTextKeys()
  const params = useParams<{ locale: string }>()

  const exchangeUrl = useMemo(() => {
    return `/${params.locale}/new-member/exchange-auth-token${window.location.search}`
  }, [params.locale])

  return (
    <Page>
      <TopBar>
        <LanguagePicker color="white" />
      </TopBar>
      <Wrapper>
        <ButtonLink
          href={exchangeUrl}
          foreground={colorsV3.gray900}
          background={colorsV3.purple500}
        >
          {textKeys.ONBOARDING_CONNECT_DD_CTA()}
        </ButtonLink>
      </Wrapper>
    </Page>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  min-height: 100vh;
  background-color: ${colorsV3.gray900};
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonLink = Button.withComponent('a')
