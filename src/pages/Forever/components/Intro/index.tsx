import { LOCALE_PATH_PATTERN } from 'components/utils/CurrentLocale'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { IntroStories } from './IntroStories'
import { PreOnboardingScreen } from './PreOnboardingScreen'

export const IntroComponent: React.FC<RouteComponentProps<{
  locale: string
  code: string
}>> = ({ history }) => {
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

export const Intro = withRouter(IntroComponent)
