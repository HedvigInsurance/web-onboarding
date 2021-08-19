import React from 'react'
import { StaticRouter } from 'react-router'
import { render, RenderOptions } from '@testing-library/react'
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks'
import { StaticTextKeyProvider } from '../utils/textKeys'

interface AllProvidersProps {
  location?: string | Record<string, unknown>
}

const AllProviders: React.FC<AllProvidersProps> = ({ children, location }) => {
  return (
    <StaticRouter location={location}>
      <StaticTextKeyProvider>{children}</StaticTextKeyProvider>
    </StaticRouter>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    wrapperProps?: AllProvidersProps
  },
) =>
  render(ui, {
    wrapper: (props: any) => (
      <AllProviders {...props} {...options?.wrapperProps} />
    ),
    ...options,
  })

const customRenderHook = (
  callback: (props: any) => any,
  options?: RenderHookOptions<AllProvidersProps>,
) => renderHook(callback, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as renderComponent }
export { customRenderHook as renderHook }
