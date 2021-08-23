export const trackStudentkortet = (memberId: string) => {
  const script = `!function(){var o=window.tdl=window.tdl||[];if(o.invoked)window.console&&console.error&&console.error("Tune snippet has been included more than once.");else{o.invoked=!0,o.methods=["init","identify","convert"],o.factory=function(n){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(n),o.push(e),o}};for(var e=0;e<o.methods.length;e++){var n=o.methods[e];o[n]=o.factory(n)}o.init=function(e){var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://js.go2sdk.com/v2/tune.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(n,t),o.domain=e}}}();
  tdl.init("https://aff.addreax.com/")
  tdl.convert(
  {
  'adv_sub': '${memberId}'
  }
  )`
  const scriptTag = window.document.createElement('script')
  scriptTag.innerHTML = script
  window.document.head.append(scriptTag)
}
