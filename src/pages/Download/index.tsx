import * as React from 'react'
import { TopBar } from '../Offer/sections/TopBar'
import { DownloadApp } from './sections/DownloadApp'

export const Download: React.SFC<{}> = () => (
  <>
    <TopBar showButton={false} />
    <DownloadApp
      buttonText={'Få nedladdningslänk'}
      phoneNumberLabel={'Telefonnummer'}
      insuredText={
        'Om du är tidigare försäkrad kommer vi hålla dig informerad om bytet från ditt gamla försäkringsbolag.'
      }
      downloadHeader={'Ladda ner appen för att komma igång med din försäkring.'}
      headerOne={'Yaay!'}
      headerTwo={'Välkommer till Hedvig!'}
    />
  </>
)
