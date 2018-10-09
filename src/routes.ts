import { Chat } from './pages/Chat'
import { DownloadApp } from './pages/DownloadApp'
import { Offering } from './pages/Offer'

export const reactPageRoutes = [
  { path: '/hedvig', Component: Chat, exact: true },
  { path: '/offer', Component: Offering, exact: true },
  { path: '/downloadapp', Component: DownloadApp, exact: true },
]
