import { Chat } from './pages/Chat'
import { Offering } from './pages/Offering'

export const reactPageRoutes = [
  { path: '/hedvig', Component: Chat, exact: true },
  { path: '/offering', Component: Offering, exact: true },
]
