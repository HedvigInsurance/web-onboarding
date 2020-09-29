import { MockedProvider } from '@apollo/react-testing'
import { mount } from 'enzyme'
import {
  handleIframeLoad,
  HandleIframeLoad,
  TrustlyModal,
} from 'pages/ConnectPayment/components/TrustlyModal'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter, withRouter } from 'react-router-dom'
import { nextTickAsync, sleep } from 'utils/misc'

describe('HandleIframeLoad', () => {
  it('handles a successful load', async () => {
    const setIsOpen = jest.fn()
    const setIsSuccess = jest.fn()
    const generateTrustlyUrl = jest.fn(() =>
      Promise.resolve('should not be triggered'),
    )

    const contentWindow: Window = {
      location: { href: '/success' },
    } as any

    await handleIframeLoad(
      setIsOpen,
      setIsSuccess,
      generateTrustlyUrl,
    )(contentWindow)

    expect(setIsOpen).toHaveBeenCalledWith(false)
    expect(setIsSuccess).toHaveBeenCalledWith(true)
    expect(generateTrustlyUrl).not.toHaveBeenCalled()
  })

  it('handles a failure load', async () => {
    const setIsOpen = jest.fn()
    const setIsSuccess = jest.fn()
    const newTrustlyHref = 'http://trustly.com/blah'
    const generateTrustlyUrl = jest.fn(() => Promise.resolve(newTrustlyHref))

    const contentWindow: Window = {
      location: { href: '/retry' },
    } as any

    await handleIframeLoad(
      setIsOpen,
      setIsSuccess,
      generateTrustlyUrl,
    )(contentWindow)

    expect(setIsOpen).not.toHaveBeenCalled()
    expect(setIsSuccess).not.toHaveBeenCalled()
    expect(contentWindow.location.href).toBe(newTrustlyHref)
  })
})

describe('TrustlyModal', () => {
  it('renders open with link without 💥', () => {
    const trustlyUrl = 'http://trustly.com/blah'
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[{ pathname: '/se/new-member/connect-payment' }]}
      >
        <MockedProvider>
          <TrustlyModal
            isOpen
            // eslint-disable-next-line  @typescript-eslint/no-empty-function
            setIsOpen={() => {}}
            trustlyUrl={trustlyUrl}
            generateTrustlyUrl={async () => 'blah'}
          />
        </MockedProvider>
      </MemoryRouter>,
    )

    expect(wrapper.find('Header').text()).toBe(
      'ONBOARDING_CONNECT_DD_TRUSTLY_MODAL_TITLE',
    )
    expect(wrapper.find('iframe').prop('src')).toBe(trustlyUrl)
  })

  it('redirects to success page and triggers onSuccess when iframe is successful', async () => {
    const trustlyUrl = 'http://trustly.com/blah'
    const ShowPath = withRouter(({ history }) => {
      return <>{history.location.pathname}</>
    })

    const handleIframeLoadFn: HandleIframeLoad = (
      setIsOpen,
      setIsSuccess,
      _generateTrustlyUrl,
    ) => async (_contentWindow) => {
      setIsOpen(false)
      setIsSuccess(true)
    }
    const onSuccess = jest.fn()

    const wrapper = mount(
      <MemoryRouter
        initialEntries={[{ pathname: '/se/new-member/connect-payment' }]}
        initialIndex={0}
      >
        <MockedProvider>
          <>
            <TrustlyModal
              isOpen
              // eslint-disable-next-line  @typescript-eslint/no-empty-function
              setIsOpen={() => {}}
              trustlyUrl={trustlyUrl}
              generateTrustlyUrl={async () => 'blah'}
              handleIframeLoad={handleIframeLoadFn}
              onSuccess={onSuccess}
            />
            <ShowPath />
          </>
        </MockedProvider>
      </MemoryRouter>,
    )

    await act(async () => {
      wrapper.find('iframe').simulate('load')
      await nextTickAsync()
      wrapper.update()
    })

    expect(wrapper.find(ShowPath).text()).toBe('/se/new-member/download')
    expect(onSuccess).toHaveBeenCalledTimes(1)
  })

  it('handles trustly notify parent', async () => {
    const trustlyUrl = 'https://trustly.com/blah'

    Object.defineProperty(window, 'location', {
      value: { assign: jest.fn() },
    })
    const mockTrustlyIframe = window.document.createElement('iframe')
    mockTrustlyIframe.setAttribute('src', 'https://trustly.com')
    window.document.body.append(mockTrustlyIframe)

    mount(
      <MemoryRouter
        initialEntries={[{ pathname: '/se/new-member/connect-payment' }]}
        initialIndex={0}
      >
        <MockedProvider>
          <>
            <TrustlyModal
              isOpen
              // eslint-disable-next-line  @typescript-eslint/no-empty-function
              setIsOpen={() => {}}
              trustlyUrl={trustlyUrl}
              generateTrustlyUrl={async () => trustlyUrl}
              handleIframeLoad={() => () => Promise.resolve()}
            />
          </>
        </MockedProvider>
      </MemoryRouter>,
    )

    const trustlyMessage = {
      method: 'OPEN_APP',
      appURL: 'bankid:///?callbackurl=googlechrome%3A%2F%2F',
    }
    mockTrustlyIframe.contentWindow?.parent?.postMessage(
      JSON.stringify(trustlyMessage),
      '*',
    )
    await sleep(10) // wait for postmessage to propagate

    expect(window.location.assign).toHaveBeenCalledWith(trustlyMessage.appURL)
  })
})
