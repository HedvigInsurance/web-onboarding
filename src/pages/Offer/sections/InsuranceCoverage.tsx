import styled from '@emotion/styled'
import { colors, fonts } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { ActionMap, Container } from 'constate'
import * as React from 'react'
import { InsuranceType } from 'utils/insuranceDomainUtils'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { APARTMENT_PERILS, HOUSE_PERILS } from './perils'

const PERILSIDE = 72

const Card = styled('div')({
  paddingBottom: '40px',
  backgroundColor: colors.WHITE,
  textAlign: 'center',
})

const Wrapper = styled('div')({
  backgroundColor: colors.OFF_WHITE,
})

const Header = styled('h1')({
  color: colors.BLACK,
  margin: 0,
  paddingBottom: '30px',
  paddingLeft: '10px',
  paddingRight: '10px',
})

const BigCol = styled('div')({})

const Row = styled('div')({
  maxWidth: '792px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '30px',
  display: 'flex',
  alignItems: 'baseline',
  flexDirection: 'row',
  flexWrap: 'wrap',
  '@media (max-width: 527px)': {
    justifyContent: 'center',
  },
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  cursor: 'pointer',
})

const PerilIcon = styled('img')({
  marginBottom: '10px',
  marginTop: '10px',
  marginRight: '30px',
  marginLeft: '30px',
  width: PERILSIDE,
  height: PERILSIDE,
})

const PerilTitle = styled('div')({
  marginBottom: '0px',
  marginTop: '0px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
  borderRadius: '30px',
  padding: '5px',
})

const DropDownText = styled('div')({
  maxWidth: '792px',
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'left',
  color: colors.OFF_BLACK,
  '@media (max-width:792px)': {
    marginLeft: '30px',
    marginRight: '30px',
  },
  '@media (max-width: 527px)': {
    textAlign: 'center',
    marginLeft: '10px',
    marginRight: '10px',
  },
})

const Switcher = styled('div')({
  backgroundColor: colors.LIGHT_GRAY,
  borderRadius: '50px',
  display: 'inline-flex',
  flexDirection: 'row',
  marginLeft: '10px',
  marginRight: '10px',
})

const SwitcherItem = styled('div')({
  borderRadius: '50px',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingRight: '20px',
  paddingLeft: '20px',
  fontFamily: fonts.CIRCULAR,
  cursor: 'pointer',
  userSelect: 'none',
  textAlign: 'center',
})

const PerilInfo = styled('div')({
  textAlign: 'center',
  fontSize: '14px',
  marginBottom: '20px',
  marginTop: '10px',
})

const getPerils = (
  insuranceType: InsuranceType,
): typeof APARTMENT_PERILS | typeof HOUSE_PERILS => {
  if (insuranceType !== InsuranceType.House) {
    return APARTMENT_PERILS
  }

  return HOUSE_PERILS
}

interface State {
  activeTab: number
  showIconNumber: number
  showPerilNumber: number
  textToShow: string
}
interface Actions {
  handleIconClick: (peril: number, icon: number, text: string) => void
  handleActiveTab: (activeTab: number) => void
  handleSameIconClick: () => void
}

interface Props {
  insuranceType: InsuranceType
}

export const InsuranceCoverage: React.SFC<Props> = (props) => (
  <Wrapper>
    <Container<State, ActionMap<State, Actions>>
      initialState={{
        showIconNumber: undefined,
        showPerilNumber: undefined,
        activeTab: 0,
        textToShow: undefined,
      }}
      actions={{
        handleIconClick: (peril: number, icon: number, text: string) => () => ({
          showPerilNumber: peril,
          showIconNumber: icon,
          textToShow: text,
        }),
        handleSameIconClick: () => () => ({
          showPerilNumber: undefined,
          showIconNumber: undefined,
          textToShow: undefined,
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
        <Card>
          <HeaderWrapper>
            <TranslationsConsumer textKey="OFFER_INSURANCE_COVERAGE_TITLE">
              {(title) => <Header>{title}</Header>}
            </TranslationsConsumer>
          </HeaderWrapper>
          <Switcher>
            {getPerils(props.insuranceType).map((peril) => (
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
          <PerilInfo>
            <TranslationsConsumer textKey="OFFER_INSURANCE_COVERAGE_PERILS_INFO">
              {(text) => text}
            </TranslationsConsumer>
          </PerilInfo>
          {getPerils(props.insuranceType).map((peril) => (
            <BigCol key={peril.key}>
              {state.activeTab === peril.key ? (
                <Row>
                  {peril.icons.map((column) => (
                    <Col
                      key={column.key}
                      onClick={() =>
                        state.showIconNumber === column.key &&
                        state.showPerilNumber === peril.key
                          ? state.handleSameIconClick()
                          : state.handleIconClick(
                              peril.key,
                              column.key,
                              column.expandableText,
                            )
                      }
                    >
                      <PerilIcon
                        src={
                          state.showIconNumber !== undefined
                            ? state.showPerilNumber === peril.key &&
                              state.showIconNumber === column.key
                              ? column.icon
                              : column.iconGrey
                            : column.icon
                        }
                      />
                      <PerilTitle
                        style={{
                          color:
                            state.showIconNumber !== undefined
                              ? state.showPerilNumber === peril.key &&
                                state.showIconNumber === column.key
                                ? colors.DARK_PURPLE
                                : colors.DARK_GRAY
                              : colors.DARK_PURPLE,
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
      )}
    </Container>
  </Wrapper>
)
