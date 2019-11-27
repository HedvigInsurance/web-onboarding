import { Page } from 'components/utils/Page'
import * as React from 'react'
import { SessionTokenGuard } from '../../containers/SessionTokenGuard'
import { Compare } from './Compare/index'
import { Introduction } from './Introduction/index'
import { Perils } from './Perils/index'

export const OfferNew: React.SFC = () => (
  <Page>
    <SessionTokenGuard>
      <Introduction />
      <Perils />
      <Compare />
    </SessionTokenGuard>
  </Page>
)
