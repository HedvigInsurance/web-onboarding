import { Chat } from './pages/Chat'
import { FourOhFour } from './pages/FourOhFour'
import { Offering } from './pages/Offer'
import { Sign } from './pages/Sign'

export const reactPageRoutes = [
  { path: '/hedvig', Component: Chat, exact: true },
  { path: '/offer', Component: Offering, exact: true },
  { path: '/*', Component: FourOhFour },
  { path: '/sign', Component: Sign, exact: true },
]
