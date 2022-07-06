import React from 'react'
import styled from '@emotion/styled'
import { Headline } from 'components/Headline/Headline'
import { Modal, ModalContent, ModalProps } from 'components/ModalNew'
import { QuoteBundle } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { ComparisonTable } from './ComparisonTable'

type ComparisonModalProps = Pick<ModalProps, 'isVisible' | 'onClose'> & {
  bundles: QuoteBundle[]
}

const ModalWrapper = styled(Modal)`
  max-height: 42rem;
  height: 100%;
`

export const ComparisonModal = ({
  isVisible,
  onClose,
  bundles,
}: ComparisonModalProps) => {
  const textKeys = useTextKeys()

  return (
    <ModalWrapper isVisible={isVisible} onClose={onClose}>
      <ModalContent>
        <Headline
          textAlign="center"
          headingLevel="h2"
          colorVariant="dark"
          variant="s"
        >
          {textKeys.COMPARISON_MODEL_HEADER()}
        </Headline>
        <ComparisonTable bundles={bundles} />
      </ModalContent>
    </ModalWrapper>
  )
}
