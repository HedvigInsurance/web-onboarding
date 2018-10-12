import { colors, fonts } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { GetInsuredButton, LinkTag } from 'components/get-insured-button'
import { SessionContainer } from 'containers/SessionContainer'
import gql from 'graphql-tag'
import * as React from 'react'
import { Query } from 'react-apollo'
import styled from 'react-emotion'
import * as VisibilitySensor from 'react-visibility-sensor'
import { CardWrapperSmall } from '../components/CardWrapperSmall'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'

const ICONWIDTH = 70
const ICONWIDTHMOBILE = 150
const ICONTITLEWIDTH = 200

const Wrapper = styled('div')({
  marginTop: '70px',
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

const Card = styled('div')({
  marginTop: '70px',
  backgroundColor: colors.WHITE,
  paddingBottom: '30px',
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const Header = styled('h1')({
  color: colors.WHITE,
  marginTop: '0px',
  paddingTop: '30px',
  marginBottom: '10px',
  fontSize: '32px',
})

const HeaderBackground = styled('div')({
  backgroundColor: colors.PURPLE,
})

const PersonalInfo = styled('div')({
  marginTop: '0px',
  marginBottom: '0px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom: '30px',
  fontSize: '14px',
  lineHeight: '22px',
  textAlign: 'center',
  maxWidth: '100%',
  color: colors.WHITE,
})

const Price = styled('h1')({
  marginBottom: '0px',
  marginTop: '30px',
  fontSize: '32px',
  textAlign: 'center',
  color: colors.BLACK,
  fontFamily: fonts.CIRCULAR,
})

const InfoText = styled('div')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '14px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '30px',
})

const Row = styled('div')({
  marginLeft: '100px',
  marginRight: '100px',
  display: 'flex',
  alignItems: 'baseline',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  '@media (max-width: 400px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Icon = styled('img')({
  marginTop: '30px',
  marginBottom: '10px',
  maxWidth: ICONWIDTH,
  '@media (max-width: 400px)': {
    margin: '0px',
    maxWidth: ICONWIDTHMOBILE,
  },
})

const IconTitle = styled('p')({
  marginBottom: '10px',
  fontSize: '14px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
  maxWidth: ICONTITLEWIDTH,
})

interface Props {
  buttonVisibility: (isVisible: boolean) => void
  buttonText: string
  insuranceOffer: {
    insuredAtOtherCompany: boolean
    monthlyCost: number
    name: string
    address: string
    zip: string
  }
}

// TODO: TEXT KEY THIS
const COLUMNS = [
  {
    key: 0,
    title: 'Lagenhetsskydd',
    icon: '/assets/offering/lagenhetsskyddet.svg',
  },
  {
    key: 1,
    title: 'Personskydd',
    icon: '/assets/offering/familjeskyddet.svg',
  },
  {
    key: 2,
    title: 'Prylskydd',
    icon: '/assets/offering/prylskyddet.svg',
  },
]

// TODO: TEXT KEY THIS
const tktemp = {
  OFFER_HEADER: 'Här är din hemförsäkring hos Hedvig!',
  OFFER_PRICE_LABEL: 'kr/mån',
  OFFER_RISK_LABEL: 'Självrisk: 1500 kr',
  OFFER_START_LATER: 'När din gamla försäkring går ut',
  OFFER_START_NOW: 'Idag',
}

const OFFER_QUERY = gql`
  query Offer {
    insurance {
      address
      monthlyCost
      insuredAtOtherCompany
      type
    }
  }
`

interface OfferData {
  insurance: {
    address: string
    monthlyCost: number
    insuredAtOtherCompany: boolean
    type: string
  }
}

// TODO: ADD TEXT KEYS
export const Offer: React.SFC<Props> = (props) => (
  <SessionContainer>
    {(token) =>
      token ? (
        <Query<OfferData> query={OFFER_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading</div>
            }
            if (error || !data) {
              return <pre>{JSON.stringify(error, null, 2)}</pre>
            }

            const {
              address,
              monthlyCost,
              insuredAtOtherCompany,
              type,
            } = data.insurance
            return (
              <Wrapper>
                <InnerWrapper>
                  <CardWrapperSmall>
                    <Card>
                      <HeaderBackground>
                        <HeaderWrapper>
                          <Header>
                            <TranslationsConsumer textKey="OFFER_HEADER">
                              {(title) => title}
                            </TranslationsConsumer>
                          </Header>
                        </HeaderWrapper>
                        <PersonalInfo>
                          {'TODO REPLACE WITH NAME'}
                          {' • '}
                          {address}
                          {' • '}
                          {'TODO REPLACE WITH POSTAL NUMBER'}
                        </PersonalInfo>
                      </HeaderBackground>
                      <TranslationsConsumer textKey="OFFER_HEADER">
                        {(priceLabel) => (
                          <Price>
                            {monthlyCost} {priceLabel}
                          </Price>
                        )}
                      </TranslationsConsumer>
                      <InfoText>
                        <TranslationsConsumer textKey="OFFER_RISK_LABEL">
                          {(riskLabel) => riskLabel}
                        </TranslationsConsumer>
                      </InfoText>
                      <InfoText>
                        Startdatum:{' '}
                        {insuredAtOtherCompany ? (
                          <TranslationsConsumer textKey="OFFER_START_LATER">
                            {(riskLabel) => riskLabel}
                          </TranslationsConsumer>
                        ) : (
                          <TranslationsConsumer textKey="OFFER_START_NOW">
                            {(riskLabel) => riskLabel}
                          </TranslationsConsumer>
                        )}
                      </InfoText>
                      <Row>
                        {COLUMNS.map((col) => (
                          <Col key={col.key}>
                            <Icon src={col.icon} />
                            <IconTitle>{col.title}</IconTitle>
                          </Col>
                        ))}
                      </Row>
                      <VisibilitySensor
                        partialVisibility
                        onChange={(isVisible: boolean) => {
                          props.buttonVisibility(isVisible)
                        }}
                      >
                        {() => (
                          <GetInsuredButton>
                            <LinkTag to={'/hedvig'}>{props.buttonText}</LinkTag>
                          </GetInsuredButton>
                        )}
                      </VisibilitySensor>
                    </Card>
                  </CardWrapperSmall>
                </InnerWrapper>
              </Wrapper>
            )
          }}
        </Query>
      ) : (
        'no token :('
      )
    }
  </SessionContainer>
)
