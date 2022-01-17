import { min as createMinifiedSegmentSnippet } from '@segment/snippet'
import { AppEnvironment } from 'shared/clientConfig'

const segmentSnippet = createMinifiedSegmentSnippet({
  apiKey: process.env.SEGMENT_API_KEY || '',
  page: true,
  load: true,
})

export const gtmNoScript = {
  dev: `<!-- Google Tag Manager development (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWMKHK5&gtm_auth=EbOAQbxBh5HL-JxsvnLJRw&gtm_preview=env-114&gtm_cookies_win=x"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->`,
  prod: `<!-- Google Tag Manager production (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWMKHK5&gtm_auth=sIs5wycOuc-PFSf7GPLFYQ&gtm_preview=env-2&gtm_cookies_win=x"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->`,
}

export const allTracking = (
  cspNonce: string,
  appEnvironment: AppEnvironment,
) => `
<script nonce="${cspNonce}">
  dataLayer = [];
</script>

${
  appEnvironment === 'production'
    ? `<!-- Google Tag Manager production -->
  <script id="gtmScript" nonce="${cspNonce}" data-nonce="${cspNonce}">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=sIs5wycOuc-PFSf7GPLFYQ&gtm_preview=env-2&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-WWMKHK5');</script>
  <!-- End Google Tag Manager -->`
    : `<!-- Google Tag Manager development -->
  <script id="gtmScript" nonce="${cspNonce}" data-nonce="${cspNonce}">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=EbOAQbxBh5HL-JxsvnLJRw&gtm_preview=env-114&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-WWMKHK5');</script>
  <!-- End Google Tag Manager -->`
}

<script key="segment-snippet" nonce="${cspNonce}">${segmentSnippet}</script>
`
