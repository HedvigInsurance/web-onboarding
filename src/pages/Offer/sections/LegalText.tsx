import { colors } from '@hedviginsurance/brand'
import { MarkdownTranslation } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'
import { InsuranceType } from 'utils/insuranceDomainUtils'

interface TermsProps {
  insuranceType: InsuranceType
}

const LEGALWIDTH = 400

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: colors.OFF_WHITE,
  paddingBottom: '70px',
})

const LegalText = styled('div')({
  color: colors.DARK_GRAY,
  textAlign: 'center',
  maxWidth: LEGALWIDTH,
})

const Link = styled('a')({
  color: colors.PURPLE,
  textDecoration: 'none',
})

const getInsuranceTextKey = (insuranceType: InsuranceType): string => {
  const map = {
    [InsuranceType.RENT]: 'LEGAL_TEXT_RENT_TEXT',
    [InsuranceType.BRF]: 'LEGAL_TEXT_BRF_TEXT',
    [InsuranceType.STUDENT_RENT]: 'LEGAL_TEXT_STUDENT_RENT_TEXT',
    [InsuranceType.STUDENT_BRF]: 'LEGAL_TEXT_STUDENT_BRF_TEXT',
  }

  if (!map[insuranceType]) {
    throw new Error(`Invalid insurance type ${insuranceType}`)
  }
  return map[insuranceType]
}

export const Legal: React.SFC<TermsProps> = ({ insuranceType }) => (
  <Container>
    <LegalText>
      <MarkdownTranslation
        textKey={getInsuranceTextKey(insuranceType)}
        markdownProps={{
          renderers: { link: Link },
          linkTarget: '_blank',
        }}
      />
    </LegalText>
  </Container>
)
