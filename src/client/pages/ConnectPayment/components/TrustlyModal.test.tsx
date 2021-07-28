import { MockedProvider } from '@apollo/react-testing'
import React from 'react'
import { MemoryRouter, withRouter } from 'react-router-dom'
import {
  handleIframeLoad,
  HandleIframeLoad,
  TrustlyModal,
} from 'pages/ConnectPayment/components/TrustlyModal'
import { StaticTextKeyProvider } from 'utils/textKeys'
import { renderComponent, fireEvent, waitFor } from 'test/utils'

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
    const result = renderComponent(
      <MemoryRouter
        initialEntries={[{ pathname: '/se/new-member/connect-payment' }]}
      >
        <MockedProvider>
          <StaticTextKeyProvider>
            <TrustlyModal
              isOpen
              // eslint-disable-next-line  @typescript-eslint/no-empty-function
              setIsOpen={() => {}}
              trustlyUrl={trustlyUrl}
              generateTrustlyUrl={async () => 'blah'}
            />
          </StaticTextKeyProvider>
        </MockedProvider>
      </MemoryRouter>,
    )

    expect(
      result.getByText('ONBOARDING_CONNECT_DD_TRUSTLY_MODAL_TITLE'),
    ).toBeInTheDocument()
    expect(result.baseElement.querySelector('iframe')?.src).toBe(trustlyUrl)
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

    const result = renderComponent(
      <MemoryRouter
        initialEntries={[{ pathname: '/se/new-member/connect-payment' }]}
        initialIndex={0}
      >
        <MockedProvider>
          <StaticTextKeyProvider>
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
          </StaticTextKeyProvider>
        </MockedProvider>
      </MemoryRouter>,
    )

    fireEvent(result.baseElement.querySelector('iframe')!, new Event('load'))
    await result.findByText('/se/new-member/download')
    expect(onSuccess).toHaveBeenCalledTimes(1)
  })

  it('handles trustly notify parent', async () => {
    const trustlyUrl = 'https://trustly.com/blah'

    Object.defineProperty(window, 'location', {
      value: {
        assign: jest.fn(),
      },
    })
    const mockTrustlyIframe = window.document.createElement('iframe')
    mockTrustlyIframe.setAttribute('src', 'https://trustly.com')
    window.document.body.append(mockTrustlyIframe)

    renderComponent(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/se/new-member/connect-payment',
          },
        ]}
        initialIndex={0}
      >
        <MockedProvider>
          <StaticTextKeyProvider>
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
          </StaticTextKeyProvider>
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

    // wait for postmessage to propagate
    await waitFor(() =>
      expect(window.location.assign).toHaveBeenCalledWith(
        trustlyMessage.appURL,
      ),
    )
  })
})
