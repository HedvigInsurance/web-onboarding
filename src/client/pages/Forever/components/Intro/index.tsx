import React from 'react'
import { useHistory } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { useReferrerNameQuery } from 'data/graphql'
import { LoadingDots } from 'components/LoadingDots/LoadingDots'
import { localePathPattern } from 'l10n/localePathPattern'
import { IntroStories } from './IntroStories'
import { PreOnboardingScreen } from './PreOnboardingScreen'

export const Intro: React.FC = () => {
  const history = useHistory()
  const referrerName = useReferrerNameQuery()
  return (
    <>
      <Switch>
        <Route
          path={localePathPattern + '/forever/:code/intro'}
          exact
          render={() => {
            const referredBy =
              referrerName.data?.referralInformation?.referredBy
            if (
              referredBy?.__typename === 'ActiveReferral' ||
              referredBy?.__typename === 'InProgressReferral'
            ) {
              return (
                <IntroStories
                  onFinished={() => {
                    history.push(history.location.pathname + '/ready')
                  }}
                  referrerName={referredBy.name || ''}
                />
              )
            }

            return <LoadingDots />
          }}
        />
        <Route
          path={localePathPattern + '/forever/:code/intro/ready'}
          component={PreOnboardingScreen}
        />
      </Switch>
    </>
  )
}
