import {
  Alarm,
  BaseballBat,
  Fire,
  LegalDispute,
  Lock,
  Plane,
  Plus,
  Storm,
  Theft,
  WaterLeak,
  WetPhone,
  WhiteGoods,
} from 'components/icons/Perils'
import * as React from 'react'
import { Peril } from '../../types'

export const rentPerils: Peril[] = [
  {
    title: 'Eldsvåda',
    description:
      'En överhettad mobilladdare eller ett misslyckat försök att fritera pommes frites, bränder uppstår på de mest vardagliga vis. Om det börjar brinna i din lägenhet får du ersättning för brand- och rökskador.',
    covered: [
      'Eld som har brunnit med öppen låga (inte enbart glöd- eller svedskada)',
      'Explosion',
      'Plötslig skada av sot',
      'Blixt',
      'Frätande gas som bildats vid oavsiktlig upphettning av plast',
      'Sanering av sot orsakad av öppen låga',
    ],
    exceptions: ['Sprängningsarbete, sot eller levande ljus'],
    info: 'Var försiktig med levande ljus eller eld.',
    icon: <Fire />,
  },
  {
    title: 'Vattenläcka',
    description:
      'Skyddet kan ge ersättning vid olika typer av vattenskador t.ex. om en tvättmaskin läckt okontrollerat eller ett badrum svämmat över. Du kan få ersättning både för att åtgärda skadorna på lägenheten samt för andra merkostnader under reparationen.',
    covered: [
      'Oberäknat vatten/ånga från vattenledningssytem',
      'Oberäknat vatten/ånga från badrum, kök eller tvättstuga',
      'Oberäknat vatten/ånga från värmepanna',
      'Läckage från kyl/frys',
      'Läckage från brandsläckare',
      'Läckage från tvättställ',
      'Läckage från akvarie',
    ],
    exceptions: [
      'Yt-och tätskikt installerats utan behörig installatör',
      'Skada på det föremål som har läckt',
      'Skada orsakat av takränna eller utvändigt stuprör',
    ],
    info:
      'Se till att kranar är täta och stängda när de inte används. Lägg underlägg under kyl/frys/ diskmaskin som samlar upp vatten. Se till att ledningssystem och anslutna anordningar inte fryser sönder. Och lämnar du lägenheten i mer än 7 dagar så måste vattnet stängas av helt.',
    icon: <WaterLeak />,
  },
  {
    title: 'Inbrott',
    description:
      'Skyddet gäller när någon utan lov gjort inbrott eller förstört din bostadsrätt. Skyddet gäller självklart också för vinden och källaren.',
    covered: [
      'Allt du äger i din lägenhet till ett värde upp till 1 miljon kronor',
      'Inbrott och skadegörelse i din bostadsrätt inklusive. vind/källare',
    ],
    exceptions: [
      'Stöld av pengar, värdehandlingar och stöldbegärlig egendom (smycken, mobiltelefoner, datorer och allt annat dyrt) ifrån vind eller källarförråd eller ur bil',
    ],
    info:
      'Lås ytterdörrar och regla fönster när ingen är hemma. Och märk inte dina nycklar så att folk förstår vart du bor eller vart de går.',
    icon: <Lock />,
  },
  {
    title: 'Stöld',
    description:
      'Vid stöld och skadegörelse av dina saker så täcks dem och ersätts av oss. Oavsett om du är hemma eller på flygande fot kan du alltid känna dig trygg med oss.',
    covered: [
      'Stöld och skadegörelse i ditt hem',
      'Stöld ur gemensamhetsutrymme, t.ex. cykel- eller barnvagnsförråd',
      'Stöld och skadegörelse av saker du tar med dig till ditt arbete eller hotellrum',
      'Stöld och skadegörelse vid förvaring hos t.ex. Shurguard',
      'Stöld utanför bostaden',
      'Stöld ur bil när du är på resa',
    ],
    exceptions: [
      'För vissa typer av saker, t.ex. pengar, hemelektronik, mobiltelefoner, datorer, kameror, sprit och smycken gäller speciella regler beroende på var stölden inträffat.',
    ],
    info:
      'Ha alltid uppsikt över dina saker. Lämna inte värdesaker på t.ex. ett bord på ett café. Lås alltid bilen om du förvarar saker där och stöldbegärlig egendom (smycke, dator) ska alltid döljas. Och lås alltid din cykel.',
    icon: <Theft />,
  },
  {
    title: 'Skadegörelse',
    description:
      'Skyddet gäller när någon utan lov gjort inbrott eller förstört din bostadsrätt. Skyddet gäller självklart också för vinden och källaren.',
    covered: [
      'Sakerna i din lägenhet till ett värde upp till 1 miljon kronor',
      'Inbrott och skadegörelse i t.ex. vind/källare',
    ],
    exceptions: [
      'Stöld av pengar, värdehandlingar och stöldbegärlig egendom (smycken, mobiltelefoner, datorer och allt annat dyrt) ifrån biyta',
    ],
    info:
      'Lås ytterdörrar och regla fönster när ingen är hemma. Och märk inte dina nycklar så att folk förstår vart du bor eller vart de går.',
    icon: <BaseballBat />,
  },
  {
    title: 'Ansvarsskydd',
    description:
      'Vårt ansvarsskydd gäller när någon kräver dig på skadestånd för att ha skadat honom eller henne eller dennes ägodelar. Vi hjälper dig med utredning och förhandling och vi betalar både rättegångskostnader och skadestånd om du vållat skadan.',
    covered: [
      'T.ex. om ditt handfat gått sönder i en lägenhet',
      'T.ex. vattenskada från din lägenhet som drabbar grannarna',
      'T.ex. Hunden orsakar bitskador',
      'Utredning och förhandling',
      'Representation i domstol',
      'Max 5 000 000 kr i ersättning per försäkringsår och person/sakskada',
    ],
    exceptions: [
      'Skada i samband med arbete',
      'Skada orsakat av när du kört bil/fordon',
      'Uppsåtligt brott, t.ex. om du skadar någon/något med flit',
    ],
    info:
      'Kontakta Hedvig direkt när någon kräver dig på skadestånd. Medge aldrig någon skyldighet utan ta ett djupt andetag och låt oss hjälpa dig istället.',
    icon: <LegalDispute />,
  },
  {
    title: 'Rättsskydd',
    description:
      'Vårt rättsskydd kan ge dig ersättning för att t.ex. anlita advokat/ombud om du hamnar i en rättslig tvist. Skyddet gäller i tvister som prövas i tingsrätt, hovrätt eller Högsta domstolen.',
    covered: [
      'Vårdnadstvist',
      'Arvstvist',
      'Fastighetstvist',
      'Advokat och representation i domstol',
      'Krav enligt skadeståndslagen',
      'Mellan 1 500 - 250 000 kr i ersättning, självrisk 20% av totalbeloppet',
    ],
    exceptions: [
      'Småmål enligt rättegångsbalken',
      'Uppsåtligt brott, t.e.x om du skadat någon/något med flit',
      'Uppsåtligt brott, t.ex. om du skadar någon/något med flit',
    ],
    info:
      'Du måste välja vem som ska representera dig och personen måste vara medlem i Svenska advokatsamfundet. Sen måste ombudet skicka in en ansökan till oss innan du kan få besked om rättsskyddet täcker tvisten.',
    icon: <LegalDispute />,
  },
  {
    title: 'Resetrubbel',
    description:
      'Du kan få ersättning om ditt bagage blir försenat på utresa. Och är du i ett land där det utbryter krig eller det sker en naturkatastrof, ja då flyger vi hem dig till Sverige och ersätter dig för de nödvändiga och skäliga kostnaderna.',
    covered: [
      'Reseskydd i 45 dagar, kan förlängas till max 90 dagar',
      'Evakuering vid krig',
      'Evakuering vid epidemi',
      'Evakuering vid naturkatastrof, jordskalv, vulkanutbrott',
      'Bagageförsening vid utresa',
      'Max 5000 kr i ersättning vid försenat bagage',
    ],
    exceptions: [
      'Hemresa från land som UD avråder folk från att resa till',
      'Förlorat bagage',
    ],
    info:
      'Anmäl försenat bagage direkt till flygbolaget och se alltid till att få en så kallad PIR-rapport, som kvitto på att ditt bagage är försenat/försvunnet.',
    icon: <Plane />,
  },
  {
    title: 'Överfall',
    description:
      'Vårt överfallsskydd kan ge dig ersättning om du blir utsatt för brott, t.ex. misshandel, rån, ofredande eller våldtäkt. Skyddet kan också ge dig ersättning om du skulle bli utsatt för försök till brott.',
    covered: [
      'Misshandel (som inte är ringa) eller rån',
      'Grov misshandel med livshotande skada',
      'Grovt rån',
      'Ofredande om du är under 18 år',
      'Våldtäkt',
      'Mellan 8000 kr - 200 000 kr i ersättning, ingen självrisk',
    ],
    exceptions: [
      'Brott i samband med arbete eller när du medvetet blandar dig i bråk',
      'Överfallsskada i samband med upplopp / huliganism / våld i hemmet',
    ],
    info:
      'Hur du själv agerar i olika situationer kan påverka hur stor din ersättning blir. Om du är påverkad av alkohol eller droger, är provocerande eller aggressiv eller medvetet går in i konflikter kan din ersättning minskas eller helt utebli.',
    icon: <Alarm />,
  },
  {
    title: 'Sjuk på resa',
    description:
      'Vårt reseskydd gäller de första 45 dagarna på din resa och ersätter kostnader om du blir akut sjuk, skadar dig eller får akuta tandskador. Vi flyger även hem dig till Sverige för vidare vård om det bedöms nödvändigt.',
    covered: [
      'Olycksfall, akut sjukdom, akuta tandbesvär',
      'Avbruten resa p.g.a att närstående person avlidit/allvarligt sjuk/skadad',
      'Läkarvård och logi',
      'Ingen självrisk',
      'Inget maxtak för ersättning',
    ],
    exceptions: [
      'Sjukdomstillstånd som var kända innan avresan',
      'Kampsport med kroppskontakt/Fallskärmshoppning/Skärmflygning',
    ],
    info:
      'Kontakta alltid oss direkt via appen eller ring Hedvig Global Assistance på +45 38 48 94 61 som har öppet dygnet runt.',
    icon: <Plus />,
  },
  {
    title: 'Vitvaror',
    description:
      'Du kan få ersättning om tvättmaskinen säckar ihop eller om annan elektrisk maskin eller apparat går sönder p.g.a. kortslutning, överslag eller överspänning. Och går frysen sönder kan du få ersättning för eventuellt skadat innehåll.',
    covered: [
      'Vitvaror/hushållsmaskiner p.g.a kortslutning, överslag eller överspänning',
      'Installation för värme, vatten, avlopp, ventilation, gas, el',
      'Glasrutor i fönster/dörrar i byggnaden',
      'Tvätt i tvättmaskin/torktumlare vid fel på maskinen',
      'Sanitetsgods',
      'Livsmedel i frys vid strömavbrott',
      'Egeninstallerad hiss (max 20.000 kr)',
    ],
    exceptions: [
      'Ytliga skador och skönhetsfel ersätts inte',
      'Värmeslingor i golv i badrum eller annat våtutrymme',
    ],
    info: 'Det finns inget speciellt att tänka på.',
    icon: <WhiteGoods />,
  },
  {
    title: 'Drulle',
    description:
      'Vår drulleförsäkring gäller när du har sönder saker som du äger genom en plötslig och oförutsedd händelse. Vi hjälper dig t.e.x när du spiller kaffe på datorn, tappar mobilen i marken eller sätter dig på glasögonen. Drulle ingår alltid utan extra kostnad.',
    covered: [
      'Plötslig och oförutsedd skada',
      'Plötslig och oförutsedd händelse',
      'T.ex. om du skulle spilla kaffe på din dator',
      'T.ex. om du tappar din mobiltelefon i marken',
      'T.ex. om du sätter dig på dina glasögon',
      'Max 50 000 kr i ersättning per förlorad eller skadad sak',
    ],
    exceptions: [
      'Lånad egendom t.ex. lånedator från jobbet/skolan',
      'Stöld av stöldbegärlig egendom (ex: kamera, smycke) i bil/lokal/biyta',
      'Stöld av pengar eller värdehandlingar',
    ],
    info:
      'Ta med mobilen (stöldbegärlig egendom) när du lämnar bilen. Lämna inte värdefulla ägodelar i källaren (biyta) och checka inte in smycken eller klockor när du reser.',
    icon: <WetPhone />,
  },
]
