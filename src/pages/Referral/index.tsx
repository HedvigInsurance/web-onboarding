import { colors } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { Button } from 'components/buttons'
import { Page } from 'components/utils/Page'
import gql from 'graphql-tag'
import * as React from 'react'
import { Query } from 'react-apollo'
import styled from 'react-emotion'
import { Redirect, RouteComponentProps } from 'react-router'
import { getFirebaseLinkDomain } from './util'

const query = gql`
  query ReferralCampaign($code: String!) {
    referralCampaignMemberInformation(code: $code) {
      incentive
    }
  }
`

type ReferralProps = RouteComponentProps<{
  code: string
}>

interface Data {
  referralCampaignMemberInformation: {
    incentive: {
      amount: number
      currency: string
    }
  }
}

const Illustration = styled('img')({
  marginTop: 35,
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
})

const Title = styled('h1')({
  textAlign: 'center',
  fontSize: '1.5rem',
  marginLeft: 16,
  marginRight: 16,
})

const Paragraph = styled('p')({
  textAlign: 'center',
  color: colors.OFF_BLACK,
  fontSize: '1rem',
  marginLeft: 16,
  marginRight: 16,
})

const Centered = styled('div')({
  marginTop: 65,
  textAlign: 'center',
})

const LinkButton = styled(Button.withComponent('a'))({
  fontWeight: 400,
  padding: '16px 32px',
})

const PageContent: React.FunctionComponent<{ data: Data; code: string }> = ({
  data: {
    referralCampaignMemberInformation: {
      incentive: { amount },
    },
  },
  code,
}) => (
  <>
    <Illustration src="/new-member-assets/referrals/invite_success.svg" />
    <Title>
      <TranslationsConsumer textKey="REFERRAL_LANDINGPAGE_HEADLINE">
        {(text) => text}
      </TranslationsConsumer>
    </Title>
    <Paragraph>
      <TranslationsPlaceholderConsumer
        textKey="REFERRAL_LANDINGPAGE_BODY"
        replacements={{ REFERRAL_VALUE: amount }}
      >
        {(text) => text}
      </TranslationsPlaceholderConsumer>
    </Paragraph>
    <Centered>
      <LinkButton
        background={colors.PURPLE}
        foreground={colors.WHITE}
        href={`${getFirebaseLinkDomain()}/referrals?code=${code}`}
      >
        <TranslationsConsumer textKey="REFERRAL_LANDINGPAGE_BTN_CTA">
          {(text) => text}
        </TranslationsConsumer>
      </LinkButton>
    </Centered>
  </>
)

const MOCKED = true
const MOCK_DATA: Data = {
  referralCampaignMemberInformation: {
    incentive: {
      amount: 10,
      currency: 'SEK',
    },
  },
}

export const Referral: React.FunctionComponent<ReferralProps> = ({
  match: {
    params: { code },
  },
}) =>
  code ? (
    <Page>
      {MOCKED ? (
        <PageContent data={MOCK_DATA} code={code} />
      ) : (
        <Query<Data> query={query} variables={{ code }}>
          {({ data, loading, error }) => {
            if (loading || error || !data) {
              return <div>Loading...</div>
            }

            return <PageContent data={data} code={code} />
          }}
        </Query>
      )}
    </Page>
  ) : (
    <Redirect to="/404" />
  )
