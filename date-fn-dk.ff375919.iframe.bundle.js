(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{3469:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function buildFormatLongFn(args){return function(dirtyOptions){var options=dirtyOptions||{},width=options.width?String(options.width):args.defaultWidth;return args.formats[width]||args.formats[args.defaultWidth]}},module.exports=exports.default},3470:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function buildLocalizeFn(args){return function(dirtyIndex,dirtyOptions){var valuesArray,options=dirtyOptions||{};if("formatting"===(options.context?String(options.context):"standalone")&&args.formattingValues){var defaultWidth=args.defaultFormattingWidth||args.defaultWidth,width=options.width?String(options.width):defaultWidth;valuesArray=args.formattingValues[width]||args.formattingValues[defaultWidth]}else{var _defaultWidth=args.defaultWidth,_width=options.width?String(options.width):args.defaultWidth;valuesArray=args.values[_width]||args.values[_defaultWidth]}return valuesArray[args.argumentCallback?args.argumentCallback(dirtyIndex):dirtyIndex]}},module.exports=exports.default},3471:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function buildMatchPatternFn(args){return function(dirtyString,dirtyOptions){var string=String(dirtyString),options=dirtyOptions||{},matchResult=string.match(args.matchPattern);if(!matchResult)return null;var matchedString=matchResult[0],parseResult=string.match(args.parsePattern);if(!parseResult)return null;var value=args.valueCallback?args.valueCallback(parseResult[0]):parseResult[0];return{value:value=options.valueCallback?options.valueCallback(value):value,rest:string.slice(matchedString.length)}}},module.exports=exports.default},3472:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function buildMatchFn(args){return function(dirtyString,dirtyOptions){var string=String(dirtyString),options=dirtyOptions||{},width=options.width,matchPattern=width&&args.matchPatterns[width]||args.matchPatterns[args.defaultMatchWidth],matchResult=string.match(matchPattern);if(!matchResult)return null;var value,matchedString=matchResult[0],parsePatterns=width&&args.parsePatterns[width]||args.parsePatterns[args.defaultParseWidth];return value="[object Array]"===Object.prototype.toString.call(parsePatterns)?function findIndex(array,predicate){for(var key=0;key<array.length;key++)if(predicate(array[key]))return key}(parsePatterns,(function(pattern){return pattern.test(matchedString)})):function findKey(object,predicate){for(var key in object)if(object.hasOwnProperty(key)&&predicate(object[key]))return key}(parsePatterns,(function(pattern){return pattern.test(matchedString)})),value=args.valueCallback?args.valueCallback(value):value,{value:value=options.valueCallback?options.valueCallback(value):value,rest:string.slice(matchedString.length)}}},module.exports=exports.default},3541:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function formatDistance(token,count,options){var result;options=options||{},result="string"==typeof formatDistanceLocale[token]?formatDistanceLocale[token]:1===count?formatDistanceLocale[token].one:formatDistanceLocale[token].other.replace("{{count}}",count);if(options.addSuffix)return options.comparison>0?"om "+result:result+" siden";return result};var formatDistanceLocale={lessThanXSeconds:{one:"mindre end ét sekund",other:"mindre end {{count}} sekunder"},xSeconds:{one:"1 sekund",other:"{{count}} sekunder"},halfAMinute:"ét halvt minut",lessThanXMinutes:{one:"mindre end ét minut",other:"mindre end {{count}} minutter"},xMinutes:{one:"1 minut",other:"{{count}} minutter"},aboutXHours:{one:"cirka 1 time",other:"cirka {{count}} timer"},xHours:{one:"1 time",other:"{{count}} timer"},xDays:{one:"1 dag",other:"{{count}} dage"},aboutXWeeks:{one:"cirka 1 uge",other:"cirka {{count}} uger"},xWeeks:{one:"1 uge",other:"{{count}} uger"},aboutXMonths:{one:"cirka 1 måned",other:"cirka {{count}} måneder"},xMonths:{one:"1 måned",other:"{{count}} måneder"},aboutXYears:{one:"cirka 1 år",other:"cirka {{count}} år"},xYears:{one:"1 år",other:"{{count}} år"},overXYears:{one:"over 1 år",other:"over {{count}} år"},almostXYears:{one:"næsten 1 år",other:"næsten {{count}} år"}};module.exports=exports.default},3542:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _index=function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(__webpack_require__(3469));var _default={date:(0,_index.default)({formats:{full:"EEEE 'den' d. MMMM y",long:"d. MMMM y",medium:"d. MMM y",short:"dd/MM/y"},defaultWidth:"full"}),time:(0,_index.default)({formats:{full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},defaultWidth:"full"}),dateTime:(0,_index.default)({formats:{full:"{{date}} 'kl'. {{time}}",long:"{{date}} 'kl'. {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"},defaultWidth:"full"})};exports.default=_default,module.exports=exports.default},3543:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function formatRelative(token,_date,_baseDate,_options){return formatRelativeLocale[token]};var formatRelativeLocale={lastWeek:"'sidste' eeee 'kl.' p",yesterday:"'i går kl.' p",today:"'i dag kl.' p",tomorrow:"'i morgen kl.' p",nextWeek:"'på' eeee 'kl.' p",other:"P"};module.exports=exports.default},3544:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _index=function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(__webpack_require__(3470));var _default={ordinalNumber:function ordinalNumber(dirtyNumber){return Number(dirtyNumber)+"."},era:(0,_index.default)({values:{narrow:["fvt","vt"],abbreviated:["f.v.t.","v.t."],wide:["før vesterlandsk tidsregning","vesterlandsk tidsregning"]},defaultWidth:"wide"}),quarter:(0,_index.default)({values:{narrow:["1","2","3","4"],abbreviated:["1. kvt.","2. kvt.","3. kvt.","4. kvt."],wide:["1. kvartal","2. kvartal","3. kvartal","4. kvartal"]},defaultWidth:"wide",argumentCallback:function(quarter){return Number(quarter)-1}}),month:(0,_index.default)({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["jan.","feb.","mar.","apr.","maj","jun.","jul.","aug.","sep.","okt.","nov.","dec."],wide:["januar","februar","marts","april","maj","juni","juli","august","september","oktober","november","december"]},defaultWidth:"wide"}),day:(0,_index.default)({values:{narrow:["S","M","T","O","T","F","L"],short:["sø","ma","ti","on","to","fr","lø"],abbreviated:["søn.","man.","tir.","ons.","tor.","fre.","lør."],wide:["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"]},defaultWidth:"wide"}),dayPeriod:(0,_index.default)({values:{narrow:{am:"a",pm:"p",midnight:"midnat",noon:"middag",morning:"morgen",afternoon:"eftermiddag",evening:"aften",night:"nat"},abbreviated:{am:"AM",pm:"PM",midnight:"midnat",noon:"middag",morning:"morgen",afternoon:"eftermiddag",evening:"aften",night:"nat"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnat",noon:"middag",morning:"morgen",afternoon:"eftermiddag",evening:"aften",night:"nat"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"midnat",noon:"middag",morning:"om morgenen",afternoon:"om eftermiddagen",evening:"om aftenen",night:"om natten"},abbreviated:{am:"AM",pm:"PM",midnight:"midnat",noon:"middag",morning:"om morgenen",afternoon:"om eftermiddagen",evening:"om aftenen",night:"om natten"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnat",noon:"middag",morning:"om morgenen",afternoon:"om eftermiddagen",evening:"om aftenen",night:"om natten"}},defaultFormattingWidth:"wide"})};exports.default=_default,module.exports=exports.default},3545:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _index=_interopRequireDefault(__webpack_require__(3472));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _default={ordinalNumber:(0,_interopRequireDefault(__webpack_require__(3471)).default)({matchPattern:/^(\d+)(\.)?/i,parsePattern:/\d+/i,valueCallback:function(value){return parseInt(value,10)}}),era:(0,_index.default)({matchPatterns:{narrow:/^(fKr|fvt|eKr|vt)/i,abbreviated:/^(f\.Kr\.?|f\.v\.t\.?|e\.Kr\.?|v\.t\.)/i,wide:/^(f.Kr.|før vesterlandsk tidsregning|e.Kr.|vesterlandsk tidsregning)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^f/i,/^(v|e)/i]},defaultParseWidth:"any"}),quarter:(0,_index.default)({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^[1234]. kvt\./i,wide:/^[1234]\.? kvartal/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(index){return index+1}}),month:(0,_index.default)({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan.|feb.|mar.|apr.|maj|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,wide:/^(januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^maj/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:(0,_index.default)({matchPatterns:{narrow:/^[smtofl]/i,short:/^(søn.|man.|tir.|ons.|tor.|fre.|lør.)/i,abbreviated:/^(søn|man|tir|ons|tor|fre|lør)/i,wide:/^(søndag|mandag|tirsdag|onsdag|torsdag|fredag|lørdag)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^o/i,/^t/i,/^f/i,/^l/i],any:[/^s/i,/^m/i,/^ti/i,/^o/i,/^to/i,/^f/i,/^l/i]},defaultParseWidth:"any"}),dayPeriod:(0,_index.default)({matchPatterns:{narrow:/^(a|p|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i,any:/^([ap]\.?\s?m\.?|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/midnat/i,noon:/middag/i,morning:/morgen/i,afternoon:/eftermiddag/i,evening:/aften/i,night:/nat/i}},defaultParseWidth:"any"})};exports.default=_default,module.exports=exports.default},3561:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _index=_interopRequireDefault(__webpack_require__(3541)),_index2=_interopRequireDefault(__webpack_require__(3542)),_index3=_interopRequireDefault(__webpack_require__(3543)),_index4=_interopRequireDefault(__webpack_require__(3544)),_index5=_interopRequireDefault(__webpack_require__(3545));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _default={code:"da",formatDistance:_index.default,formatLong:_index2.default,formatRelative:_index3.default,localize:_index4.default,match:_index5.default,options:{weekStartsOn:1,firstWeekContainsDate:4}};exports.default=_default,module.exports=exports.default}}]);