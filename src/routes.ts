import { Chat } from './pages/Chat'
import { Download } from './pages/Download'
import { FourOhFour } from './pages/FourOhFour'
import { Offering } from './pages/Offer'
import { Sign } from './pages/Sign'

export const reactPageRoutes = [
  { path: '/hedvig', Component: Chat, exact: true },
  { path: '/offer', Component: Offering, exact: true },
  { path: '/download', Component: Download, exact: true },
  { path: '/sign', Component: Sign, exact: true },
  { path: '/*', Component: FourOhFour },
]
