import {
  Alarm,
  BaseballBat,
  Condominium,
  Fire,
  LegalDispute,
  Lock,
  Plane,
  Plus,
  Theft,
  WaterLeak,
  WetPhone,
  WhiteGoods,
} from 'components/icons/Perils'
import * as React from 'react'
import { Peril } from '../../types'

export const brfPerils: Peril[] = [
  {
    title: 'Fire',
    description:
      'We will cover fire damage, e.g. an over-heated mobile charger or a failed attempt to fry fries. In case of an apartment fire, we can reimburse you for fire and smoke damages.',
    covered: [
      'Fire due to open flames (not just glow)',
      'Explosion',
      'Sudden damage caused by soot',
      'Lightning',
      'Corrosive gas created by unintentional burning of plastics',
      'Cleaning of soot caused by open fire',
    ],
    exceptions: ['Explosive work, soot or lit candles'],
    info: 'Be careful with candles and fires.',
    icon: <Fire />,
  },
  {
    title: 'Water leaks',
    description:
      'We cover different types of water damages, for example if a washing machine leaks uncontrollably or if a bathroom is flooded. We can reimburse you for damages to the apartment and for other costs incurred during the reparations.',
    covered: [
      'Unexpected escape of liquid/steam from the pipework system, connected appliances or kitchen, laundry room and bathroom.',
      'Leaking fridge/freezer',
      'Leaking fire extinguisher',
      'Leaking sink',
      'Leaking aquarium',
    ],
    exceptions: [
      'Surface and water barrier installed by uncertified plumber',
      'Damage to the leaking unit itself',
      'Damage caused by roof gutters or external downspouts',
    ],
    info:
      'Make sure that faucets are sealed and turned off when not in use. Place drip trays that collect water below the fridge/freezer/washing machine. Make sure that the piping system and devices connected to it do not freeze. If you leave your apartment for more than seven days, shut the main water valve.',
    icon: <WaterLeak />,
  },
  {
    title: 'Burglary',
    description:
      'If someone, without permission, enters or damages your apartment, this will be covered by your insurance.',
    covered: [
      'Everything you own in your apartment up to a total value of SEK 1 million',
    ],
    exceptions: [
      'Theft of money, valuable documents and other theft-prone property (jewerly, mobile phones, computers and other expensive items) from ancillary areas',
    ],
    info:
      'Lock doors and windows when no one is home. Do not label your keys with your street address to stop people from discovering where you live.',
    icon: <Lock />,
  },
  {
    title: 'Theft and damage',
    description:
      'If thieves steal or damage your precious items, your home insurance will help you. Whether you are at home or out travelling, you can count on us.',
    covered: [
      'Theft or damage to your home',
      'Theft from common spaces, e.g. bike or stroller storage',
      'Theft or damage to posessions that you have taken to work or a hotel room',
      'Storage, e.g. Shurguard',
      'Theft outside the home',
      'Theft from car while travelling',
    ],
    exceptions: [
      'For some items, e.g. money, electronics, mobile phones, computers, cameras, liquor and jewelry, special rules apply depending on where the theft occured.',
    ],
    info:
      'Always keep an eye on your gadgets, for example do not leave your camera alone on a coffee-house table. If you leave theft-prone property inside your car, always lock the car and hide gadgets. One last thing: always lock your bike.',
    icon: <Theft />,
  },
  {
    title: 'Criminal damage',
    description:
      'Your home insurance covers you if any person, without permission, enters or damages your apartment.',
    covered: [
      'Everything you own in your apartment up to a total value of SEK 1 million',
    ],
    exceptions: [
      'Theft of money, valuable documents and theft-prone poroperty (jewerly, mobile phones, computers and other expensive property) from ancillary spaces',
    ],
    info:
      'Lock doors and windows when no one is home. Do not label your keys with your street address to stop people from discovering where you live.',
    icon: <BaseballBat />,
  },
  {
    title: 'Liability protection',
    description:
      'When someone claims that you injured them or that you damaged their property, we can help you to investigate what happened. If you caused the damage, we can reimburse you for court costs and pay damages.',
    covered: [
      "E.g. damages to someone else's sink",
      'E.g. leak from your apartment that affects your neighhbour',
      'E.g. your dog bites someone',
      'Investigation and negotiation',
      'Legal representation',
      'Compensation: Maximum SEK 5 MIllion',
    ],
    exceptions: [
      'Injury related to your work',
      'Damages from driving',
      'Intentional crime, e.g. if you injure someone on purpose',
    ],
    info:
      'Contact us directly if someone is filing a claim against you. Never admit any guilt. We are here to help!',
    icon: <LegalDispute />,
  },
  {
    title: 'Legal protection',
    description:
      'We can reimburse you for the cost of hiring an attorney if you end up in legal dispute. The coverage is valid for disputes tried in the district court, the High Court or the Supreme Court.',
    covered: [
      'Custody dispute',
      'Inheritance dispute',
      'Property dispute',
      'Legal representation',
      'Claims according to Tort Liability Act',
      'Compensation: SEK 1,500 - 250,000, 20% deductible',
    ],
    exceptions: [
      'Simplified litigation according to Code of Judicial Procedure',
      "Intentional crimes, e.g. if you've injured someone on purpose",
    ],
    info:
      'You have to choose your own representation and that person needs to be a member of the Swedish law Society. Make sure your representative contacts us directly to see whether or not the legal protection is valid.',
    icon: <LegalDispute />,
  },
  {
    title: 'Travel insurance',
    description:
      ' We can reimburse you if your luggage is delayed during outbound travel. In the event of war or a natural catastrophe during your outbound travel, we will reimburse you for the cost of a flight home and other necessary and reasonable costs.',
    covered: [
      'Travel coverage first 45 days, can be extended up to a maximum of 90 days',
      'Evacuation in the event of war',
      'Evacuation in the event of an epidemic',
      'Evacuation in the event of natural catastrophes, earthquake or volcanic eruption',
      'Delayed luggage when outbound travelling',
      'Maximum SEK 5,000 for delayed luggage',
    ],
    exceptions: [
      'Travelling home from places the Swedish Ministry of Foreign Affairs warns you to not travel to',
      'Lost luggage',
    ],
    info:
      'Report delayed luggage to your air carrier and make sure to get a PIR report as proof that your luggage is delayed or missing.',
    icon: <Plane />,
  },
  {
    title: 'Assualt',
    description:
      "We will compensate you if you're the victim of a crime, e.g. assualt, robbery or rape. You can also seek compensation if someone attempts to commit crimes against you.",
    covered: [
      'Assault or robbery',
      'Aggravated assualt with life threating damages',
      'Aggravated robbery',
      'Persecution aged 18 and under',
      'Rape',
      'Compensation: SEK 200,000 - 8,000, no deductible',
    ],
    exceptions: [
      'Crimes in connection to work or if you intervened in a fight',
      'Damages in connection to rioting / hooliganism / domestic violence',
    ],
    info:
      'How you act in various situations affects the level of compensation. If you intervene in a fight or if you are under the influence of alcohol or drugs, then compensation will be lowered or of zero value.',
    icon: <Alarm />,
  },
  {
    title: 'Illness and accidents while travelling',
    description:
      'Our travel protection is eligible during the first 45 days of your travel and will reimburse you for costs due to acute illness, injury and acute dental injury. If considered necessery, we can provide you with a flight back home to Sweden for further medical assistance.',
    covered: [
      'Casualty, acute illness, acute dental issues',
      'Cancelled travel due to a closely related person dying / becoming seriously ill or injured',
      'Medical assistance and accommodation',
      'No deductible',
      'No maximum limit for reimbursement',
    ],
    exceptions: [
      'Illness or medical condition known before departure',
      'Martial arts with body contact / sky diving / paragliding',
    ],
    info:
      'Always contact us directly through our app or by calling Hedvig Global Assistance on +45 38 48 94 61.',
    icon: <Plus />,
  },
  {
    title: 'White goods',
    description:
      'We are here for you when you you have issues with your fridge, freezer, washing machine, dryer, dishwasher or oven. If your freezer breaks down, we will even compensate you for spoiled food.',
    covered: [
      'White goods/home applicances due to short circuit, overvoltage or high voltage',
      'Installations of heating, water supply, sewerage, ventilation and gas',
      'Windows panes',
      'Clothes due to washing machine/dryer problems',
      'Sanitary ware (e.g. toilet and sink)',
      'Food in freezer due to power outage',
      'Self-installed elevator (Maximum SEK 20,000)',
    ],
    exceptions: [
      'Superficial damages and beauty defects',
      'Underfloor heating in bathrooms or other wet spaces',
    ],
    info: "There's nothing special for you to think about.",
    icon: <WhiteGoods />,
  },
  {
    title: 'All-risk',
    description:
      'Our all-risk insurance can provide compensation for damages caused by a sudden and unforeseen external event, e.g. spilling coffee on your laptop, dropping your mobile phone or sitting on your glasses. All-risk is always included at no extra costs.',
    covered: [
      'Unforseen damages',
      'Unforseen events',
      'E.g. you spilled coffee on your laptop',
      'E.g. you dropped your phone in the toilet',
      'E.g. you sat on your glasses',
      'Compensation: SEK 50,000, max, per lost/damaged gadget',
    ],
    exceptions: [
      'Borrowed property, e.g. work computer',
      'Theft-prone property from car/ancillary area, e.g camera, jewelry',
      'Theft of cash or valuable documents',
    ],
    info:
      "Take your mobile phone (theft-prone property) with you when leaving your car. Don't leave valuable property in your basement (ancillary space). If you check-in jewelry or watches in your bag while travelling, we will not be able to compensate you if they are lost.",
    icon: <WetPhone />,
  },
  {
    title: 'Tenant ownership',
    description:
      'When owning an apartment it\'s nice to have an insurance which covers the apartment, not just the gadgets inside of it. In the insurance world, this is called "Bostadsrättstillägg". Hedvig can compensate you for costs to repair damage to your apartment. Whether you live in a student room or a penthouse, there\'s no compensation cap.',
    covered: [
      'Interior damages, e.g. your new kitchen',
      'Surface damages, e.g. your new floor',
    ],
    exceptions: ["There's nothing special for you to think about"],
    info: "There's nothing special for you to think about.",
    icon: <Condominium />,
  },
]
