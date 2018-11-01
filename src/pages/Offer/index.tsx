import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { ActionMap, Container } from 'constate'
import { OfferContainer } from 'containers/OfferContainer'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import * as React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet-async'
import { Mount } from 'react-lifecycle-components'
import { trackEvent } from 'utils/tracking'
import { CardWrapper } from './components/CardWrapper'
import { InnerWrapper } from './components/InnerWrapper'
import { Wrapper } from './components/Wrapper'
import { GetInsured } from './sections/GetInsured'
import { HedvigInfo } from './sections/HedvigInfo'
import { HedvigSwitch } from './sections/HedvigSwitch'
import { InsuranceCoverage } from './sections/InsuranceCoverage'
import { InsuredAmount } from './sections/InsuredAmount'
import { Legal } from './sections/LegalText'
import { Offer } from './sections/Offer'
import { OtherInfo } from './sections/OtherInfo'
import { PageDown } from './sections/PageDown'
import { Terms } from './sections/Terms'

interface State {
  upperSignButtonVisible: boolean
  lowerSignButtonVisible: boolean
}
interface Actions {
  updateUpperButtonVisibility: (visible: boolean) => void
  updateLowerButtonVisibility: (visible: boolean) => void
}

const BigCard = styled('div')({
  marginTop: '70px',
  paddingTop: '30px',
  paddingBottom: '60px',
  backgroundColor: colors.WHITE,
  boxShadow: '0px 8px 15px -13px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

export const Offering: React.SFC<{}> = () => (
  <Page>
    <SessionTokenGuard>
      <OfferContainer>
        {(offer) => {
          if (!offer || !offer.insurance.type) {
            return null
          }

          const { insuredAtOtherCompany } = offer.insurance

          return (
            <Mount
              on={() =>
                trackEvent('Product Viewed', {
                  category: 'offer',
                  value: offer.insurance.monthlyCost,
                })
              }
            >
              <TranslationsConsumer textKey="OFFER_PAGE_TITLE">
                {(title) => (
                  <Helmet>
                    <title>{title}</title>
                  </Helmet>
                )}
              </TranslationsConsumer>

              <Container<State, ActionMap<State, Actions>>
                initialState={{
                  upperSignButtonVisible: true,
                  lowerSignButtonVisible: false,
                }}
                actions={{
                  updateUpperButtonVisibility: (visible: boolean) => (_) => ({
                    upperSignButtonVisible: visible,
                  }),
                  updateLowerButtonVisibility: (visible: boolean) => (_) => ({
                    lowerSignButtonVisible: visible,
                  }),
                }}
              >
                {(state) => (
                  <>
                    <TopBar
                      progress={1}
                      upperSignButtonVisible={!state.upperSignButtonVisible}
                      lowerSignButtonVisible={!state.lowerSignButtonVisible}
                    />
                    <Offer
                      offer={offer}
                      signButtonVisibility={state.updateUpperButtonVisibility}
                    />
                    <PageDown />
                    <HedvigInfo />
                    {insuredAtOtherCompany ? <HedvigSwitch /> : null}
                    <Wrapper>
                      <InnerWrapper>
                        <CardWrapper>
                          <BigCard>
                            <InsuranceCoverage />
                            <InsuredAmount />
                            <OtherInfo offer={offer} />
                            <Terms insuranceType={offer.insurance.type} />
                          </BigCard>
                        </CardWrapper>
                      </InnerWrapper>
                    </Wrapper>
                    <GetInsured
                      offer={offer}
                      signButtonVisibility={state.updateLowerButtonVisibility}
                    />
                    <Legal />
                  </>
                )}
              </Container>
            </Mount>
          )
        }}
      </OfferContainer>
    </SessionTokenGuard>
  </Page>
)
