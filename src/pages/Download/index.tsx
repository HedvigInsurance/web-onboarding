import { TopBar } from 'components/TopBar'
import * as React from 'react'
import { DownloadApp } from './sections/DownloadApp'

export const Download: React.SFC<{}> = () => (
  <>
    <TopBar buttonOneVisible={false} buttonTwoVisible={false} />
    <DownloadApp />
  </>
)
