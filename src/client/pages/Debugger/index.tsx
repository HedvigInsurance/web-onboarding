import React from 'react'

const ActualDebugger = React.lazy(() =>
  import(/* webpackChunkName: "debugger" */ './ActualDebugger').then((m) => ({
    default: m.ActualDebugger,
  })),
)

export const Debugger: React.FC = () => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return mounted ? (
    <React.Suspense fallback="loading">
      <ActualDebugger />
    </React.Suspense>
  ) : (
    <>loading</>
  )
}
