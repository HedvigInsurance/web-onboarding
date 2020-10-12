import React from 'react'
import { InsuranceValues } from 'pages/OfferNew/Perils/InsuranceValues'
import { PerilCollection } from 'pages/OfferNew/Perils/PerilCollection'
import { PerilModal } from 'pages/OfferNew/Perils/PerilModal'
import { OfferQuote } from 'pages/OfferNew/types'
import { useTextKeys } from 'utils/textKeys'
import { insuranceTypeTextKeys } from '../utils'

interface Props {
  offerQuote: OfferQuote
}

export const PerilRow: React.FC<Props> = ({ offerQuote }) => {
  const [isShowingPeril, setIsShowingPeril] = React.useState(false)
  const [currentPeril, setCurrentPeril] = React.useState(0)
  const textKeys = useTextKeys()

  return (
    <>
      <h3>{textKeys[insuranceTypeTextKeys[offerQuote.contractType]]()}</h3>
      <PerilCollection
        perils={offerQuote.perils}
        setCurrentPeril={setCurrentPeril}
        setIsShowingPeril={setIsShowingPeril}
      />

      <InsuranceValues offerQuote={offerQuote} />
      {offerQuote.perils.length > 0 && (
        <PerilModal
          perils={offerQuote.perils}
          currentPerilIndex={currentPeril}
          setCurrentPeril={setCurrentPeril}
          isVisible={isShowingPeril}
          onClose={() => setIsShowingPeril(false)}
        />
      )}
    </>
  )
}
