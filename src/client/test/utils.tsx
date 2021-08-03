import React from 'react'
import { StaticRouter } from 'react-router'
import { render, RenderOptions } from '@testing-library/react'
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks'

interface AllProvidersProps {
  location?: string | Record<string, unknown>
}

const AllProviders: React.FC<AllProvidersProps> = ({ children, location }) => {
  return <StaticRouter location={location}>{children}</StaticRouter>
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
  options?: Omit<RenderHookOptions<AllProvidersProps>, 'wrapper'>,
) => renderHook(callback, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as renderComponent }
export { customRenderHook as renderHook }
