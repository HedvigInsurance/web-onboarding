import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'

const LEGALWIDTH = 400

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: colors.OFF_WHITE,
  paddingBottom: '70px',
})

const LegalText = styled('div')({
  color: colors.DARK_GRAY,
  textAlign: 'center',
  maxWidth: LEGALWIDTH,
})

export const Legal: React.SFC = () => (
  <Container>
    <LegalText>
      <TranslationsConsumer textKey="OFFER_FOOTER_LEGAL_TEXT">
        {(legalText) => legalText}
      </TranslationsConsumer>
    </LegalText>
  </Container>
)
