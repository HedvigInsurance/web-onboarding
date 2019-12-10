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
    title: 'Juridisk tvist',
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
    title: 'Resetrubbel',
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
    icon: <Plane />,
  },
  {
    title: 'Överfall',
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
    icon: <Alarm />,
  },
  {
    title: 'Sjuk på resa',
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
