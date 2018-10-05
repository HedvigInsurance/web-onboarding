import { colors, fonts } from '@hedviginsurance/brand'
import { Card } from 'components/offering/card'
import { Header } from 'components/offering/header'
import { ActionMap, Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'

interface Props {
  headline: string
  subTitle: string
}

const Wrapper = styled('div')({
  backgroundColor: colors.OFF_WHITE,
})

const InnerWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

const BigCol = styled('div')({})

const Row = styled('div')({
  marginBottom: '30px',
  display: 'flex',
  alignItems: 'baseline',
  flexDirection: 'row',
  flexWrap: 'wrap',
  '@media (max-width: 700px)': {
    flexFlow: 'wrap',
    justifyContent: 'flex-start',
  },
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '30px',
  cursor: 'pointer',
})

const ImageIcon = styled('img')({
  marginBottom: '10px',
  marginTop: '10px',
  marginRight: '30px',
  marginLeft: '30px',
  width: '72px',
  height: '72px',
})

const Label = styled('p')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  maxWidth: '100px',
  color: colors.DARK_GRAY,
})

const DropDownText = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '60px',
  marginTop: '0px',
  fontSize: '16px',
  maxWidth: '100px',
  color: colors.DARK_GRAY,
})

const Switcher = styled('div')({
  backgroundColor: colors.LIGHT_GRAY,
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'row',
  width: 'max-content',
  marginLeft: 'auto',
  marginRight: 'auto',
})

const SwitcherItem = styled('div')({
  borderRadius: '30px',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingRight: '20px',
  paddingLeft: '20px',
  fontSize: '14px',
  fontFamily: fonts.CIRCULAR,
  cursor: 'pointer',
  userSelect: 'none',
})

const PERILS = [
  {
    key: 0,
    name: 'Dig och din familj',
    icon: '/assets/offering/du_och_din_familj.png',
    icons: [
      {
        key: 0,
        title: 'Juridisk tvist',
        image: '/assets/offering/juridisk_tvist.png',
        expandableText:
          '0,0. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 1,
        title: 'Överfall',
        image: '/assets/offering/overfall_2.png',
        expandableText:
          '0,1. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 2,
        title: 'Sjuk på resa',
        image: '/assets/offering/sjuk_pa_resa.png',
        expandableText:
          '0,2. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 3,
        title: 'Försenad resa',
        image: '/assets/offering/forsenad_resa.png',
        expandableText:
          '0,3. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 4,
        title: 'Försenat bagage',
        image: '/assets/offering/forsenad_resa.png',
        expandableText:
          '0,4. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
    ],
  },
  {
    key: 1,
    name: 'Din lägenhet',
    icon: '/assets/offering/lagenhet.png',
    icons: [
      {
        key: 0,
        title: 'Eldsvåda',
        image: '/assets/offering/eldsvada.png',
        expandableText:
          '1,0. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 1,
        title: 'Inbrott',
        image: '/assets/offering/inbrott.png',
        expandableText:
          '1,1. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 2,
        title: 'Oväder',
        image: '/assets/offering/ovader.png',
        expandableText:
          '1,2. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 3,
        title: 'Skadedjur',
        image: '/assets/offering/skadedjur.png',
        expandableText:
          '1,3. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
    ],
  },
  {
    key: 2,
    name: 'Dina prylar',
    icon: '/assets/offering/prylar.png',
    icons: [
      {
        key: 0,
        title: 'Drulle',
        image: '/assets/offering/Drulle.png',
        expandableText:
          '2,0. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 1,
        title: 'Eldsvåda',
        image: '/assets/offering/eldsvada_green.png',
        expandableText:
          '2,1. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 2,
        title: 'Oväder',
        image: '/assets/offering/ovader_green.png',
        expandableText:
          '2,2. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 3,
        title: 'Stöld',
        image: '/assets/offering/stold.png',
        expandableText:
          '2,3. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 4,
        title: 'Vattenläcka',
        image: '/assets/offering/vattenlacka.png',
        expandableText:
          '2,4. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 5,
        title: 'Drulle',
        image: '/assets/offering/Drulle.png',
        expandableText:
          '2,5. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 6,
        title: 'Eldsvåda',
        image: '/assets/offering/eldsvada_green.png',
        expandableText:
          '2,6. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 7,
        title: 'Oväder',
        image: '/assets/offering/ovader_green.png',
        expandableText:
          '2,2. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 8,
        title: 'Stöld',
        image: '/assets/offering/stold.png',
        expandableText:
          '2,3. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 9,
        title: 'Vattenläcka',
        image: '/assets/offering/vattenlacka.png',
        expandableText:
          '2,8. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
    ],
  },
]

interface State {
  activeTab: number
  showIconNumber: number
  showPerilNumber: number
  textToShow: string
}
interface Actions {
  handleIconClick: (peril: number, icon: number, text: string) => void
  handleActiveTab: (activeTab: number) => void
}

export const InsuranceCoverage: React.SFC<Props> = (props) => (
  <Wrapper>
    <Container<State, ActionMap<State, Actions>>
      initialState={{ showPerilNumber: undefined, activeTab: 0 }}
      actions={{
        handleIconClick: (peril: number, icon: number, text: string) => () => ({
          showPerilNumber: peril,
          showIconNumber: icon,
          textToShow: text,
        }),
        handleActiveTab: (tab: number) => () => ({
          activeTab: tab,
        }),
      }}
    >
      {(state) => (
        <Wrapper>
          <InnerWrapper>
            <Card>
              <Header>{props.headline}</Header>
              <Switcher>
                {PERILS.map((peril) => (
                  <SwitcherItem
                    key={peril.key}
                    style={{
                      backgroundColor:
                        state.activeTab === peril.key
                          ? colors.DARK_PURPLE
                          : colors.LIGHT_GRAY,
                      color:
                        state.activeTab === peril.key
                          ? colors.WHITE
                          : colors.DARK_PURPLE,
                    }}
                    onClick={() => state.handleActiveTab(peril.key)}
                  >
                    {peril.name}
                  </SwitcherItem>
                ))}
              </Switcher>
              {PERILS.map((peril) => (
                <BigCol key={peril.key}>
                  {state.activeTab === peril.key ? (
                    <Row>
                      {peril.icons.map((column) => (
                        <Col
                          key={column.key}
                          onClick={() =>
                            state.handleIconClick(
                              peril.key,
                              column.key,
                              column.expandableText,
                            )
                          }
                        >
                          <ImageIcon src={column.image} />
                          <Label
                            style={{
                              color:
                                state.showPerilNumber === peril.key &&
                                state.showIconNumber === column.key
                                  ? colors.BLACK
                                  : colors.DARK_GRAY,
                            }}
                          >
                            {column.title}
                          </Label>
                          {state.showPerilNumber === peril.key &&
                          state.showIconNumber === column.key ? (
                            <DropDownText>{state.textToShow}</DropDownText>
                          ) : null}
                        </Col>
                      ))}
                    </Row>
                  ) : null}
                </BigCol>
              ))}
            </Card>
          </InnerWrapper>
        </Wrapper>
      )}
    </Container>
  </Wrapper>
)
