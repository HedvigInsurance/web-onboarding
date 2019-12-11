import * as React from 'react'
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
} from '../../../components/icons/Perils'
import { Peril } from './types'

export const perils: Peril[] = [
  {
    title: 'Eldsvåda',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <Fire />,
  },
  {
    title: 'Vattenläcka',
    description:
      'Skyddet kan ge ersättning vid olika typer av vattenskador t.ex. om en tvättmaskin läckt okontrollerat eller ett badrum svämmat över. Du kan få ersättning både för att åtgärda skadorna på huset samt för andra merkostnader under reparationen.',
    covered: [
      'Oberäknat vatten/ånga från vattenledningssytem',
      'Oberäknat vatten/ånga från badrum, kök eller tvätstuga',
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
      'Se till att kranar är täta och stängda när de inte används. Lägg underlägg under kyl/frys/ diskmaskin som samlar upp vatten. Se till att ledningssystem och anslutna anordningar inte fryser sönder. Och lämnar du huset i mer än 7 dagar så måste vattnet stängas av helt.',
    icon: <WaterLeak />,
  },
  {
    title: 'Oväder',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <Storm />,
  },
  {
    title: 'Inbrott',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <Lock />,
  },
  {
    title: 'Stöld',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <Theft />,
  },
  {
    title: 'Skadegörelse',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <BaseballBat />,
  },
  {
    title: 'Juridisk tvist - Ansvarsskydd',
    description:
      'Vårt ansvarsskydd gäller när någon kräver dig på skadestånd för att ha skadat honom eller henne eller dennes ägodelar. Vi hjälper dig med utredning och förhandling och vi betalar både rättegångskostnader och skadestånd om du vållat skadan.',
    covered: [
      'T.ex. om ditt handfat gått sönder i en lägenhet',
      'T.ex. vattenskada från ditt hus som drabbar grannarna',
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
    icon: <LegalDispute />,
  },
  {
    title: 'Juridisk tvist - Rättsskydd',
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
    title: 'Sjukdom och olycksfall på resa',
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
      'Kampsport med kroppskontakt / Fallskärmshoppning / Skärmflygning',
    ],
    info:
      'Kontakta alltid oss direkt via appen eller ring Hedvig Global Assistance på +45 38 48 94 61 som har öppet dygnet runt.',
    icon: <Plus />,
  },
  {
    title: 'Vitvaror',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <WhiteGoods />,
  },
  {
    title: 'Drulle',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <WetPhone />,
  },
]
