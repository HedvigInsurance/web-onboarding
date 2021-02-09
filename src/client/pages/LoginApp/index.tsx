import React from 'react'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { LoginAppScreen } from './LoginAppScreen'

export const LoginApp: React.FC = () => {
  const market = useMarket()
  return market === Market.No ? <LoginAppScreen /> : null
}
