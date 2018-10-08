import { Chat } from './pages/Chat'
import { Offering } from './pages/Offer'

export const reactPageRoutes = [
  { path: '/hedvig', Component: Chat, exact: true },
  { path: '/offer', Component: Offering, exact: true },
]
