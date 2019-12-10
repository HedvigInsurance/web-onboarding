import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { CurrentLanguage } from '../components/utils/CurrentLanguage'

export const NewMemberLanding: React.SFC = () => (
  <CurrentLanguage>
    {({ currentLanguage }) => (
      <Redirect
        to={`/${currentLanguage && currentLanguage + '/'}new-member/new`}
      />
    )}
  </CurrentLanguage>
)
