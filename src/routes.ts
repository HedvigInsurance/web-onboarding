import { Chat } from './pages/Chat'
import { LazyDontPanic } from './pages/DontPanic'
import { Download } from './pages/Download'
import { FourOhFour } from './pages/FourOhFour'
import { NewMemberLanding } from './pages/NewMemberLanding'
import { Offering } from './pages/Offer'
import { Sign } from './pages/Sign'

export const reactPageRoutes = [
  {
    path: '/:language(en)?/new-member',
    Component: NewMemberLanding,
    exact: true,
  },
  { path: '/:language(en)?/new-member/hedvig', Component: Chat, exact: true },
  {
    path: '/:language(en)?/new-member/offer',
    Component: Offering,
    exact: true,
  },
  {
    path: '/:language(en)?/new-member/download',
    Component: Download,
    exact: true,
  },
  { path: '/:language(en)?/new-member/sign', Component: Sign, exact: true },
  { path: '/dont-panic/hedvig', Component: LazyDontPanic, exact: true },
  { path: '/*', Component: FourOhFour },
]
