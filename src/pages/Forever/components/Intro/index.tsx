import { LOCALE_PATH_PATTERN } from 'components/utils/CurrentLocale'
import React from 'react'
import { useHistory } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { IntroStories } from './IntroStories'
import { PreOnboardingScreen } from './PreOnboardingScreen'

export const Intro: React.FC = () => {
  const history = useHistory()
  return (
    <>
      <Switch>
        <Route
          path={LOCALE_PATH_PATTERN + '/forever/:code/intro'}
          exact
          render={() => {
            return (
              <IntroStories
                onFinished={() => {
                  history.push(history.location.pathname + '/ready')
                }}
              />
            )
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
