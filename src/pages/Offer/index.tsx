import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { ActionMap, Container } from 'constate'
import { SessionContainer } from 'containers/SessionContainer'
import gql from 'graphql-tag'
import * as React from 'react'
import { Query } from 'react-apollo'
import Helmet from 'react-helmet-async'
import { GetInsured } from './sections/GetInsured'
import { HedvigInfo } from './sections/HedvigInfo'
import { HedvigSwitch } from './sections/HedvigSwitch'
import { InsuranceCoverage } from './sections/InsuranceCoverage'
import { InsuredAmount } from './sections/InsuredAmount'
import { Legal } from './sections/LegalText'
import { Offer } from './sections/Offer'
import { PageDown } from './sections/PageDown'
import { Terms } from './sections/Terms'

interface State {
  getStartedButtonVisible: boolean
}
interface Actions {
  updateVisibility: (visible: boolean) => void
}

const OFFER_QUERY = gql`
  query Offer {
    insurance {
      address
      monthlyCost
      insuredAtOtherCompany
      type
      postalNumber
    }

    member {
      firstName
      lastName
    }
  }
`

export interface OfferData {
  insurance: {
    address: string
    monthlyCost: number
    insuredAtOtherCompany: boolean
    type: string
    postalNumber: string
  }
  member: {
    firstName: string
    lastName: string
  }
}

export const Offering: React.SFC<{}> = () => (
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

            const { insuredAtOtherCompany } = data.insurance

            return (
              <>
                <TranslationsConsumer textKey="OFFER_PAGE_TITLE">
                  {(title) => (
                    <Helmet>
                      <title>{title}</title>
                    </Helmet>
                  )}
                </TranslationsConsumer>

                <Container<State, ActionMap<State, Actions>>
                  initialState={{
                    getStartedButtonVisible: true,
                  }}
                  actions={{
                    updateVisibility: (visible: boolean) => (_) => ({
                      getStartedButtonVisible: visible,
                    }),
                  }}
                >
                  {(state) => (
                    <>
                      <TopBar
                        progress={1}
                        buttonText={'Bli försäkrad'}
                        showButton={state.getStartedButtonVisible}
                      />

                      <Offer
                        offer={data}
                        buttonVisibility={state.updateVisibility}
                        buttonText={'Signera med BankID'}
                      />

                      <PageDown />

                      <HedvigInfo title={'Det här är Hedvig'} />

                      {insuredAtOtherCompany ? (
                        <HedvigSwitch
                          title={
                            'Hedvig sköter bytet från din gamla försäkring'
                          }
                        />
                      ) : null}

                      <InsuranceCoverage
                        headline={'Vad försäkringen täcker'}
                        subTitle={'Klicka på ikonerna för mer info.'}
                      />

                      <InsuredAmount
                        title={'Försäkrade belopp'}
                        info={'Läs mer'}
                      />

                      <Terms />

                      <GetInsured
                        title={'Skaffa Sveriges smidigaste hemförsäkring'}
                        offer={data}
                        buttonVisibility={state.updateVisibility}
                        buttonText={'Signera med BankID'}
                      />
                      <Legal
                        legalText={
                          'Genom att trycka på ”Bli försäkrad” godkänner jag att jag har tagit del av förköpsinformation, villkor och att mina personuppgifter behandlas enligt GDPR'
                        }
                      />
                    </>
                  )}
                </Container>
              </>
            )
          }}
        </Query>
      ) : (
        'no token :('
      )
    }
  </SessionContainer>
)
