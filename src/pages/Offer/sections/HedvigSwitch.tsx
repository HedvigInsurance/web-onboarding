import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'
import { CardWrapper } from '../components/CardWrapper'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'
import { SwitchableInsurers, Insurer } from '../../Chat/state'
import { CurrentInsuranceState } from '../../Chat/state'

const ROWWIDTH = 1200
const PARAGRAPHWIDTH = 290
const TITLEWIDTH = 210
const IMAGESIDE = 72

const Card = styled('div')({
  marginTop: '70px',
  paddingBottom: '40px',
  backgroundColor: colors.WHITE,
  boxShadow: '0px 8px 15px -13px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const Header = styled('h1')({
  color: colors.BLACK,
  margin: 0,
  paddingTop: '40px',
  paddingBottom: '30px',
  paddingLeft: '10px',
  paddingRight: '10px',
  maxWidth: '400px',
  marginLeft: 'auto',
  marginRight: 'auto',
})

const Paragraph = styled('p')({
  marginTop: '0px',
  marginBottom: '0px',
  textAlign: 'center',
  maxWidth: PARAGRAPHWIDTH,
  color: colors.OFF_BLACK,
})

const Title = styled('h3')({
  marginBottom: '10px',
  fontSize: '25px',
  textAlign: 'center',
  color: colors.WHITE,
  maxWidth: TITLEWIDTH,
  zIndex: 2,
  position: 'absolute',
})

const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'baseline',
  maxWidth: ROWWIDTH,
  '@media (max-width: 710px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

const ImageIcon = styled('img')({
  marginBottom: '10px',
  marginTop: '10px',
  marginRight: '30px',
  marginLeft: '30px',
  width: IMAGESIDE,
  height: IMAGESIDE,
  zIndex: 1,
  position: 'relative',
})

const colsNonSwitchable: ReadonlyArray<{
  imageUrl: string
  title: string
  paragraphKey: string
}> = [
  {
    imageUrl: '/new-member-assets/offering/hedvig-dot-1.svg',
    title: '1',
    paragraphKey: 'OFFER_NON_SWITCHABLE_COL_ONE_PARAGRAPH',
  },
  {
    imageUrl: '/new-member-assets/offering/hedvig-dot-2.svg',
    title: '2',
    paragraphKey: 'OFFER_NON_SWITCHABLE_COL_TWO_PARAGRAPH',
  },
  {
    imageUrl: '/new-member-assets/offering/hedvig-dot-3.svg',
    title: '3',
    paragraphKey: 'OFFER_NON_SWITCHABLE_COL_THREE_PARAGRAPH',
  },
]

const cols: ReadonlyArray<{
  imageUrl: string
  title: string
  paragraphKey: string
}> = [
  {
    imageUrl: '/new-member-assets/offering/hedvig-dot-1.svg',
    title: '1',
    paragraphKey: 'OFFER_SWITCH_COL_ONE_PARAGRAPH',
  },
  {
    imageUrl: '/new-member-assets/offering/hedvig-dot-2.svg',
    title: '2',
    paragraphKey: 'OFFER_SWITCH_COL_TWO_PARAGRAPH',
  },
  {
    imageUrl: '/new-member-assets/offering/hedvig-dot-3.svg',
    title: '3',
    paragraphKey: 'OFFER_SWITCH_COL_THREE_PARAGRAPH',
  },
]

interface Props {
  currentInsuranceState: CurrentInsuranceState
}

const getOfferSwitchTitle = (currentInsuranceState: CurrentInsuranceState) => {
  return Object.keys(SwitchableInsurers).includes(
    currentInsuranceState.currentInsurer!,
  )
    ? 'OFFER_SWITCH_TITLE'
    : 'OFFER_SWITCH_TITLE_NON_SWITCHABLE'
}

const getColumns = (currentInsuranceState: CurrentInsuranceState) => {
  return Object.keys(SwitchableInsurers).includes(
    currentInsuranceState.currentInsurer!,
  )
    ? cols
    : colsNonSwitchable
}

export const HedvigSwitch: React.SFC<Props> = (props) => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapper>
        <Card>
          <HeaderWrapper>
            <Header>
              <TranslationsConsumer
                textKey={getOfferSwitchTitle(props.currentInsuranceState)}
              >
                {(title) => title}
              </TranslationsConsumer>
            </Header>
          </HeaderWrapper>
          <Row>
            {getColumns(props.currentInsuranceState).map((col) => (
              <Col key={col.title + col.paragraphKey}>
                <ImageIcon src={col.imageUrl} />
                <Title>{col.title}</Title>
                <Paragraph>
                  <TranslationsConsumer textKey={col.paragraphKey}>
                    {(paragraph) => paragraph}
                  </TranslationsConsumer>
                </Paragraph>
              </Col>
            ))}
          </Row>
        </Card>
      </CardWrapper>
    </InnerWrapper>
  </Wrapper>
)
