import { colors, fonts } from '@hedviginsurance/brand'
import { Card } from 'components/offering/Card'
import { Header } from 'components/offering/Header'
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
  marginLeft: '104px',
  marginRight: '104px',
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

const PerilIcon = styled('img')({
  marginBottom: '10px',
  marginTop: '10px',
  marginRight: '30px',
  marginLeft: '30px',
  width: '72px',
  height: '72px',
})

const PerilTitle = styled('div')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '14px',
  textAlign: 'center',
  maxWidth: '100px',
  color: colors.DARK_GRAY,
  borderRadius: '30px',
  padding: '5px',
  backgroundColor: colors.WHITE,
})

const DropDownText = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '60px',
  marginTop: '0px',
  fontSize: '14px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
  '@media (max-width: 800px)': {
    marginLeft: '50px',
    marginRight: '50px',
  },
})

const Switcher = styled('div')({
  backgroundColor: colors.LIGHT_GRAY,
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'row',
  width: 'max-content',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '30px',
  '@media (max-width: 400px)': {
    width: '90%',
    borderRadius: '40px',
  },
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
  textAlign: 'center',
})

const PERILS = [
  {
    key: 0,
    name: 'Din Bostad',
    icon: '/assets/offering/lagenhet.png',
    icons: [
      {
        key: 0,
        title: 'Eldsvåda',
        icon: '/assets/offering/eldsvada.png',
        expandableText:
          '1,0. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 1,
        title: 'Inbrott',
        icon: '/assets/offering/inbrott.png',
        expandableText:
          '1,1. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 2,
        title: 'Oväder',
        icon: '/assets/offering/ovader.png',
        expandableText:
          '1,2. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 3,
        title: 'Skadedjur',
        icon: '/assets/offering/skadedjur.png',
        expandableText:
          '1,3. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
    ],
  },
  {
    key: 1,
    name: 'Dig och din familj',
    icon: '/assets/offering/du_och_din_familj.png',
    icons: [
      {
        key: 0,
        title: 'Juridisk tvist',
        icon: '/assets/offering/juridisk_tvist.png',
        expandableText:
          '0,0. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 1,
        title: 'Överfall',
        icon: '/assets/offering/overfall_2.png',
        expandableText:
          '0,1. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 2,
        title: 'Sjuk på resa',
        icon: '/assets/offering/sjuk_pa_resa.png',
        expandableText:
          '0,2. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 3,
        title: 'Försenad resa',
        icon: '/assets/offering/forsenad_resa.png',
        expandableText:
          '0,3. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 4,
        title: 'Försenat bagage',
        icon: '/assets/offering/forsenad_resa.png',
        expandableText:
          '0,4. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
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
        icon: '/assets/offering/Drulle.png',
        expandableText:
          '2,0. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 1,
        title: 'Eldsvåda',
        icon: '/assets/offering/eldsvada_green.png',
        expandableText:
          '2,1. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 2,
        title: 'Oväder',
        icon: '/assets/offering/ovader_green.png',
        expandableText:
          '2,2. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 3,
        title: 'Stöld',
        icon: '/assets/offering/stold.png',
        expandableText:
          '2,3. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 4,
        title: 'Vattenläcka',
        icon: '/assets/offering/vattenlacka.png',
        expandableText:
          '2,4. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 5,
        title: 'Drulle',
        icon: '/assets/offering/Drulle.png',
        expandableText:
          '2,5. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 6,
        title: 'Eldsvåda',
        icon: '/assets/offering/eldsvada_green.png',
        expandableText:
          '2,6. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 7,
        title: 'Oväder',
        icon: '/assets/offering/ovader_green.png',
        expandableText:
          '2,7. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 8,
        title: 'Stöld',
        icon: '/assets/offering/stold.png',
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
          showPerilNumber: undefined,
          showIconNumber: undefined,
          textToShow: undefined,
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
                          <PerilIcon src={column.icon} />
                          <PerilTitle
                            style={{
                              color:
                                state.showPerilNumber === peril.key &&
                                state.showIconNumber === column.key
                                  ? colors.WHITE
                                  : colors.DARK_GRAY,
                              backgroundColor:
                                state.showPerilNumber === peril.key &&
                                state.showIconNumber === column.key
                                  ? colors.DARK_PURPLE
                                  : colors.WHITE,
                            }}
                          >
                            {column.title}
                          </PerilTitle>
                        </Col>
                      ))}
                    </Row>
                  ) : null}
                </BigCol>
              ))}
              {state.showPerilNumber !== undefined &&
              state.showIconNumber !== undefined ? (
                <DropDownText>{state.textToShow}</DropDownText>
              ) : null}
            </Card>
          </InnerWrapper>
        </Wrapper>
      )}
    </Container>
  </Wrapper>
)
