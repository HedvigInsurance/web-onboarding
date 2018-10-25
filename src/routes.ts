import { Chat } from './pages/Chat'
import { Download } from './pages/Download'
import { FourOhFour } from './pages/FourOhFour'
import { Offering } from './pages/Offer'
import { Sign } from './pages/Sign'

export const reactPageRoutes = [
  { path: '/new-member/hedvig', Component: Chat, exact: true },
  { path: '/new-member/offer', Component: Offering, exact: true },
  { path: '/new-member/download', Component: Download, exact: true },
  { path: '/new-member/sign', Component: Sign, exact: true },
  { path: '/*', Component: FourOhFour },
]
