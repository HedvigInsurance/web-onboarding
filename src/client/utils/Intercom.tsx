import { Global, css, CSSObject } from '@emotion/react'
import React from 'react'
import { useRouteMatch } from 'react-router'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Variation, useVariation } from 'utils/hooks/useVariation'
import { useTextKeys } from 'utils/textKeys'

import { localePathPattern } from 'l10n/localePathPattern'
const intercomBtnSelector = '.intercom-lightweight-app-launcher'

declare global {
  interface Window {
    Intercom?: any
  }
}

const createIntercom = () => {
  const script = `
      window.intercomSettings = {
        app_id: "ziqa7goa"
      };

      (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/ziqa7goa';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};l()}})();
    `
  const scriptTag = window.document.createElement('script')
  scriptTag.id = 'intercom-script'
  scriptTag.nonce = window.document.querySelector<HTMLScriptElement>(
    '[nonce]',
  )?.nonce
  scriptTag.innerHTML = script
  window.document.body.append(scriptTag)
}

const Intercom = () => {
  const variation = useVariation()
  const isIntercomMatch = useRouteMatch(
    localePathPattern +
      '/new-member/:place(offer|checkout|sign|download|connect-payment)',
  )
  React.useEffect(() => {
    if (
      [Variation.IOS, Variation.ANDROID, Variation.AVY].includes(variation!)
    ) {
      return
    }
    const hasIntercomScript = window.document.getElementById('intercom-script')
    const hasIntercomInstalled = typeof (window as any).Intercom !== 'undefined'

    if (isIntercomMatch && !hasIntercomScript) {
      createIntercom()
    } else if (isIntercomMatch && hasIntercomInstalled) {
      ;(window as any).Intercom('boot')
    } else if (!isIntercomMatch && hasIntercomInstalled) {
      ;(window as any).Intercom('shutdown')
    }
  }, [variation, isIntercomMatch])

  return null
}

const ShowOnScrollBehaviour: React.FC = () => {
  const intercomTimeout = useRef<null | NodeJS.Timeout>()
  const paused = useRef<boolean>()

  const onInteraction = () => {
    const buttonEl: HTMLElement | null = document.querySelector(
      intercomBtnSelector,
    )
    if (buttonEl !== null && buttonEl?.style?.display !== 'none') {
      if (intercomTimeout.current) {
        clearTimeout(intercomTimeout.current)
      }
      buttonEl.style.opacity = '1'
      intercomTimeout.current = setTimeout(() => {
        buttonEl.style.opacity = '0'
      }, 800)
    }
  }

  const debounce = (fn: () => void, delay: number) => {
    return () => {
      if (paused.current) {
        setTimeout(() => {
          paused.current = false
        }, delay)
      } else {
        paused.current = true
        fn()
      }
    }
  }

  useEffect(() => {
    const interactionHandler = debounce(onInteraction, 100)
    window.addEventListener('scroll', interactionHandler)
    window.addEventListener('mousemove', interactionHandler)
    return () => {
      window.removeEventListener('scroll', interactionHandler)
      window.removeEventListener('mousemove', interactionHandler)
    }
  }, [])

  return (
    <InjectedStyles
      style={{ transition: 'opacity 150ms ease-out', opacity: 1 }}
    />
  )
}

const InjectedStyles = ({ style }: { style: CSSObject }) => (
  <Global styles={css({ [intercomBtnSelector]: style })} />
)

const TextLink = styled.a`
  font-size: 0.874rem;
  color: ${colorsV3.purple900};
  text-align: center;
  cursor: pointer;
`
const TextLinkVariation = () => {
  const textKeys = useTextKeys()

  return (
    <TextLink onClick={() => window?.Intercom('show')}>
      {textKeys.CHECKOUT_CONTACT_US_CTA()}
    </TextLink>
  )
}

Intercom.ShowOnScrollBehaviour = ShowOnScrollBehaviour
Intercom.InjectedStyles = InjectedStyles
Intercom.TextLinkVariation = TextLinkVariation

export { Intercom }
