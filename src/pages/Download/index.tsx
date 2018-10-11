import * as React from 'react'
import { TopBar } from '../Offer/sections/TopBar'
import { DownloadApp } from './sections/DownloadApp'

export const Download: React.SFC<{}> = () => (
  <>
    <TopBar showButton={false} />
    <DownloadApp />
  </>
)
