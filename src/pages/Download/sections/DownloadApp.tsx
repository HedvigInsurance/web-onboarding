import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { GetInsuredButton } from 'components/buttons'
import * as React from 'react'
import styled from 'react-emotion'

const IMAGEWIDTH = 450

const Wrapper = styled('div')({
  marginTop: '70px',
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
  position: 'absolute',
  top: 0,
  bottom: 0,
})

const InnerWrapper = styled('div')({
  width: IMAGEWIDTH,
  textAlign: 'center',
  margin: 'auto',
  '@media (max-width: 450px)': {
    maxWidth: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
})

const DownloadButton = styled('a')({
  backgroundColor: colors.GREEN,
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
  cursor: 'pointer',
  border: 'none',
  outlineStyle: 'none',
  marginTop: '10px',
  marginBottom: '30px',
})

const DownloadImage = styled('img')({
  width: IMAGEWIDTH,
  marginBottom: '30px',
  marginTop: '30px',
  '@media (max-width: 450px)': {
    width: '300px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
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
  marginBottom: '30px',
})

export const DownloadApp: React.SFC = () => (
  <Wrapper>
    <InnerWrapper>
      <DownloadImage src={'/new-member-assets/download/success_image.svg'} />
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
        <TranslationsConsumer textKey="DOWNLOAD_LINK">
          {(downloadLink) => (
            <DownloadButton href={downloadLink}>
              <TranslationsConsumer textKey="DOWNLOAD_BUTTON_TEXT">
                {(buttonText) => buttonText}
              </TranslationsConsumer>
            </DownloadButton>
          )}
        </TranslationsConsumer>
      </GetInsuredButton>
    </InnerWrapper>
  </Wrapper>
)
