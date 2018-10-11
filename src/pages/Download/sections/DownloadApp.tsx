import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { GetInsuredButton } from 'components/get-insured-button'
import * as React from 'react'
import styled from 'react-emotion'
const IMAGEWIDTH = 450
const CONTENTWIDTH = 1000

const Wrapper = styled('div')({
  marginTop: '84px',
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
  position: 'absolute',
  top: 0,
  bottom: 0,
})

const InnerWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: 'auto',
  marginRight: 'auto',
  minWidth: CONTENTWIDTH,
  maxWidth: CONTENTWIDTH,
  [`@media (max-width: ${CONTENTWIDTH}px)`]: {
    minWidth: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

const DownloadButton = styled('a')({
  backgroundColor: colors.GREEN,
  fontSize: '16px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
  cursor: 'pointer',
  border: 'none',
  outlineStyle: 'none',
  marginTop: '10px',
})

const DownloadImage = styled('img')({
  width: IMAGEWIDTH,
  marginBottom: '30px',
  marginTop: '30px',
})

const Header = styled('h1')({
  fontSize: '32px',
  marginTop: '0px',
  marginBottom: '0px',
})

const DownloadHeader = styled('h1')({
  fontSize: '32px',
  marginTop: '30px',
  marginBottom: '30px',
})

const InsuredText = styled('div')({
  fontSize: '16px',
  maxWidth: IMAGEWIDTH,
  textAlign: 'center',
  marginBottom: '30px',
})

export const DownloadApp: React.SFC = () => (
  <Wrapper>
    <InnerWrapper>
      <DownloadImage src={'/assets/offering/placeholder.svg'} />
      <Header>
        <TranslationsConsumer textKey="DOWNLOAD_HEADER_ONE">
          {(header) => header}
        </TranslationsConsumer>
      </Header>
      <Header>
        <TranslationsConsumer textKey="DOWNLOAD_HEADER_TWO">
          {(header) => header}
        </TranslationsConsumer>
      </Header>
      <DownloadHeader>
        <TranslationsConsumer textKey="DOWNLOAD_HEADER_THREE">
          {(header) => header}
        </TranslationsConsumer>
      </DownloadHeader>
      <InsuredText>
        <TranslationsConsumer textKey="DOWNLOAD_INFO">
          {(insuredText) => insuredText}
        </TranslationsConsumer>
      </InsuredText>
      <GetInsuredButton>
        <TranslationsConsumer textKey="DOWNLOAD_BUTTON_TEXT">
          {(buttonText) => (
            <DownloadButton href="https://hedvig.app.link/?utm_source=webonboarding&utm_medium=webonboarding&utm_campaign=webonboarding&utm_term=webonboarding&utm_content=webonboarding">
              {buttonText}
            </DownloadButton>
          )}
        </TranslationsConsumer>
      </GetInsuredButton>
    </InnerWrapper>
  </Wrapper>
)
