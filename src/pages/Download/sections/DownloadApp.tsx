import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'

const SITEWRAPPER = 1300
const BP = 800

const Background = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: colors.OFF_WHITE,
  zIndex: -1,
})

const InnerWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: SITEWRAPPER,
  margin: 'auto',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '20vh',
  [`@media (max-width: ${BP}px)`]: {
    maxWidth: '100%',
    flexDirection: 'column',
    paddingTop: 20 + 70,
  },
})

const TextColumn = styled('div')({
  width: '60%',
  paddingRight: 20,
  paddingLeft: 20,
  paddingBottom: 40,

  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
    textAlign: 'center',
  },
})

const ImageColumn = styled('div')({
  width: '40%',
  paddingRight: 20,
  paddingLeft: 20,
  paddingBottom: 40,

  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
    textAlign: 'center',
  },
})

const DownloadButton = styled('a')({
  backgroundColor: colors.PURPLE,
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '10px 16px',
  cursor: 'pointer',
  border: 'none',
  outlineStyle: 'none',
  marginTop: '10px',
  marginBottom: '30px',
})

const DownloadImage = styled('img')({
  marginBottom: '30px',
  marginTop: '30px',
  marginLeft: 'auto',
  width: '100%',
  '@media (max-width: 800px)': {
    marginRight: 'auto',
    width: '80%',
  },
})

const Header = styled('h1')({
  marginTop: '0px',
  marginBottom: '30px',
  fontSize: '56px',
  lineHeight: '60px',
})

const HeaderPart = styled('span')(({ color }: { color: string }) => ({
  color,
}))

const DownloadText = styled('div')({
  width: '65%',
  marginBottom: '45px',
  color: colors.OFF_BLACK,
})

interface DownloadAppProps {
  hasCurrentInsurer?: boolean
}

export const DownloadApp: React.SFC<DownloadAppProps> = ({
  hasCurrentInsurer,
}) => (
  <>
    <Background />
    <InnerWrapper>
      <TextColumn>
        <Header>
          <HeaderPart color={colors.DARK_YELLOW}>Välkommen! </HeaderPart>
          <HeaderPart color={colors.BLACK}>
            Ladda ner appen för att komma igång
          </HeaderPart>
        </Header>
        <DownloadText>
          Du hittar den på App Store och Google Play. Om du är tidigare
          försäkrad kommer vi hålla dig informerad om bytet från ditt gamla
          försäkringsbolag.
        </DownloadText>
        <TranslationsConsumer textKey="DOWNLOAD_LINK">
          {(downloadLink) => (
            <DownloadButton href={downloadLink}>
              <TranslationsConsumer textKey="DOWNLOAD_BUTTON_TEXT">
                {(buttonText) => buttonText}
              </TranslationsConsumer>
            </DownloadButton>
          )}
        </TranslationsConsumer>
      </TextColumn>
      <ImageColumn>
        <DownloadImage
          src={'/new-member-assets/download/balloons-welcome-illustrations.svg'}
        />
      </ImageColumn>
    </InnerWrapper>
  </>
)
