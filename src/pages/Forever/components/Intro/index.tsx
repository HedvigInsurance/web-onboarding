import { LoadingDots } from 'components/LoadingDots/LoadingDots'
import { LOCALE_PATH_PATTERN } from 'components/utils/CurrentLocale'
import { useReferrerNameQuery } from 'data/graphql'
import React from 'react'
import { useHistory } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { IntroStories } from './IntroStories'
import { PreOnboardingScreen } from './PreOnboardingScreen'

export const Intro: React.FC = () => {
  const history = useHistory()
  const referrerName = useReferrerNameQuery()
  return (
    <>
      <Switch>
        <Route
          path={LOCALE_PATH_PATTERN + '/forever/:code/intro'}
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
          path={LOCALE_PATH_PATTERN + '/forever/:code/intro/ready'}
          component={PreOnboardingScreen}
        />
      </Switch>
    </>
  )
}
