import { ApolloProvider } from '@apollo/react-common'
import { getScriptLocation } from '@hedviginsurance/web-survival-kit'
import { isMobile } from 'is-mobile'
import * as Koa from 'koa'
import * as path from 'path'
import * as React from 'react'
import {
  ApolloProvider as LegacyApolloProvider,
  getDataFromTree,
} from 'react-apollo'
import { FilledContext, HelmetProvider } from 'react-helmet-async'
import { StaticRouter, StaticRouterContext } from 'react-router'
import { MobileContext } from 'utils/mobileContext'
import { App } from '../App'
import { sentryConfig } from '../utils/sentry'
import {
  createSession,
  SavingCookieStorage,
  Session,
} from '../utils/sessionStorage'
import { ServerCookieStorage } from '../utils/storage/ServerCookieStorage'
import { createServerApolloClient } from './apolloClient'
import {
  ADYEN_ENVIRONMENT,
  ADYEN_ORIGIN_KEY,
  ANDROID_MINIMUM_VERSION,
  ANDROID_PACKAGE_NAME,
  APP_STORE_ID,
  APPLE_BUNDLE_ID,
  CONTENT_SERVICE_ENDPOINT,
  FIREBASE_LINK_DOMAIN,
  GIRAFFE_ENDPOINT,
  GIRAFFE_WS_ENDPOINT,
  IOS_MINIMUM_VERSION,
} from './config'
import { favicons } from './favicons'

const scriptLocation = getScriptLocation({
  statsLocation: path.resolve(__dirname, 'assets'),
  webpackPublicPath: process.env.WEBPACK_PUBLIC_PATH || '',
})

const template = (helmetContext: FilledContext['helmet'], cspNonce: string) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=1.2, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  ${favicons}
  ${helmetContext.title}
  ${helmetContext.link}
  ${helmetContext.meta}
  <script src="https://browser.sentry-cdn.com/4.2.3/bundle.min.js" crossorigin="anonymous"></script>
  <script nonce="${cspNonce}">
    Sentry.init(${JSON.stringify(sentryConfig())})
  </script>

  <!-- Google Tag Manager -->
  <script nonce="${cspNonce}">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;var n=d.querySelector('[nonce]');
  n&&j.setAttribute('nonce',n.nonce||n.getAttribute('nonce'));f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-WWMKHK5');</script>
  <!-- End Google Tag Manager -->

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-113416531-1"></script>
  <script nonce="${cspNonce}">
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-113416531-1');
  </script>
  <!-- Hotjar Tracking Code for https://www.hedvig.com/new-member -->
  <script nonce="${cspNonce}">
      (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:1068935,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  </script>
    <!-- start Mixpanel --><script type="text/javascript" nonce="${cspNonce}">(function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,
  0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="mixpanel";e.people=e.people||[];e.toString=function(b){var a="mixpanel";"mixpanel"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
  for(h=0;h<l.length;h++)c(e,l[h]);var f="set set_once union unset remove delete".split(" ");e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
  MIXPANEL_CUSTOM_LIB_URL:"file:"===c.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);
  mixpanel.init("7bf1a4979e9584a2918f5458f36db619");</script><!-- end Mixpanel -->
  <script defer src="https://adtr.io/jsTag?ap=1412531808"></script>
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWMKHK5"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <div id="react-root"></div>

  <script nonce="${cspNonce}">
    window.GIRAFFE_WS_ENDPOINT= ${JSON.stringify(GIRAFFE_WS_ENDPOINT)};
    window.GIRAFFE_ENDPOINT= ${JSON.stringify(GIRAFFE_ENDPOINT)};
    window.CONTENT_SERVICE_ENDPOINT= ${JSON.stringify(
      CONTENT_SERVICE_ENDPOINT,
    )};
    window.FIREBASE_LINK_DOMAIN=${JSON.stringify(FIREBASE_LINK_DOMAIN)};
    window.ANDROID_PACKAGE_NAME=${JSON.stringify(ANDROID_PACKAGE_NAME)};
    window.ANDROID_MINIMUM_VERSION=${JSON.stringify(ANDROID_MINIMUM_VERSION)};
    window.APPLE_BUNDLE_ID=${JSON.stringify(APPLE_BUNDLE_ID)};
    window.APP_STORE_ID=${JSON.stringify(APP_STORE_ID)};
    window.IOS_MINIMUM_VERSION=${JSON.stringify(IOS_MINIMUM_VERSION)};
    window.ADYEN_ORIGIN_KEY=${JSON.stringify(ADYEN_ORIGIN_KEY)};
    window.ADYEN_ENVIRONMENT=${JSON.stringify(ADYEN_ENVIRONMENT)};
  </script>
  <script src="${scriptLocation}"></script>
</body>
</html>
`

export const getPage: Koa.Middleware = async (ctx) => {
  const serverCookieStorage = new SavingCookieStorage(
    new ServerCookieStorage(ctx),
  )
  const session = createSession<Session>(serverCookieStorage)

  const unwrappedSession = session.getSession()

  if (ctx.query.partner) {
    serverCookieStorage.setItem('_hvpartner', ctx.query.partner.toLowerCase())
  }
  if (
    serverCookieStorage.getItem('_hvpartner') &&
    serverCookieStorage.getItem('_hvpartner') !== 'undefined'
  ) {
    session.setSession({
      ...(session.getSession() || ({} as any)),
      partner: serverCookieStorage.getItem('_hvpartner'),
    })
  }
  if (ctx.query.code) {
    serverCookieStorage.setItem('_hvcode', ctx.query.code.toLowerCase())
  }
  if (
    serverCookieStorage.getItem('_hvcode') &&
    serverCookieStorage.getItem('_hvcode') !== 'undefined'
  ) {
    session.setSession({
      ...(session.getSession() || ({} as any)),
      code: serverCookieStorage.getItem('_hvcode'),
    })
  }

  const apolloClient = createServerApolloClient(
    ctx.state.requestUuid,
    unwrappedSession && unwrappedSession.token,
  )
  const routerContext: StaticRouterContext & { statusCode?: number } = {}
  const helmetContext = {}
  const serverApp = (
    <StaticRouter location={ctx.request.originalUrl} context={routerContext}>
      <HelmetProvider context={helmetContext}>
        <ApolloProvider client={apolloClient}>
          <LegacyApolloProvider client={apolloClient}>
            <MobileContext.Provider
              value={isMobile({
                ua: ctx.req.headers['user-agent'],
                tablet: true,
              })}
            >
              <App session={session} />
            </MobileContext.Provider>
          </LegacyApolloProvider>
        </ApolloProvider>
      </HelmetProvider>
    </StaticRouter>
  )
  await getDataFromTree(serverApp)

  if (routerContext.statusCode) {
    ctx.status = routerContext.statusCode
  }
  if (routerContext.url) {
    ctx.redirect(routerContext.url)
    return
  }

  ctx.body = template(
    (helmetContext as FilledContext).helmet,
    (ctx.res as any).cspNonce,
  )

  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Headers', 'content-type')
}
