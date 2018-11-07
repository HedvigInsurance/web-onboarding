import { colors, fonts } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'
import {
  getInsurancePDFTextKey,
  getPrebuyPDFTextKey,
  InsuranceType,
} from 'utils/insuranceDomainUtils'
import { HeaderWrapper } from '../components/HeaderWrapper'

interface TermsProps {
  insuranceType: InsuranceType
}

const PERILSIDE = 72

const Card = styled('div')({
  backgroundColor: colors.WHITE,
})

const Header = styled('h1')({
  color: colors.BLACK,
  marginTop: '30px',
  marginBottom: '30px',
})

const Row = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  flexDirection: 'row',
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginRight: '15px',
  marginLeft: '15px',
  textAlign: 'center',
})

const PDFTag = styled('h3')({
  fontSize: '10px',
  color: colors.DARK_PURPLE,
  zIndex: 2,
  position: 'absolute',
  margin: 0,
  top: 0,
  right: 15,
})

const PerilIcon = styled('img')({
  marginBottom: '0px',
  marginRight: '30px',
  marginLeft: '30px',
  width: PERILSIDE,
  height: PERILSIDE,
})

const PerilLink = styled('a')({
  textDecoration: 'none',
  position: 'relative',
})

const PerilTitle = styled('div')({
  marginBottom: '0px',
  marginTop: '10px',
  fontFamily: fonts.CIRCULAR,
  textAlign: 'center',
  color: colors.OFF_BLACK,
  width: '141px',
})

export const Terms: React.SFC<TermsProps> = ({ insuranceType }) => (
  <Card>
    <HeaderWrapper>
      <Header>
        <TranslationsConsumer textKey="TERMS_TITLE">
          {(header) => header}
        </TranslationsConsumer>
      </Header>
    </HeaderWrapper>
    <Row>
      <Col>
        <TranslationsConsumer textKey={getPrebuyPDFTextKey(insuranceType)}>
          {(url) => (
            <PerilLink href={url} rel="noreferrer noopener" target="_blank">
              <PDFTag>PDF</PDFTag>
              <PerilIcon src="/new-member-assets/offering/forkopsinformation.svg" />

              <TranslationsConsumer textKey="TERMS_PERIL_ONE_TITLE">
                {(title) => <PerilTitle>{title}</PerilTitle>}
              </TranslationsConsumer>
            </PerilLink>
          )}
        </TranslationsConsumer>
      </Col>
      <Col>
        <TranslationsConsumer textKey={getInsurancePDFTextKey(insuranceType)}>
          {(url) => (
            <PerilLink href={url} rel="noreferrer noopener" target="_blank">
              <PDFTag>PDF</PDFTag>
              <PerilIcon src="/new-member-assets/offering/forkopsinformation.svg" />
              <TranslationsConsumer textKey="TERMS_PERIL_TWO_TITLE">
                {(title) => <PerilTitle>{title}</PerilTitle>}
              </TranslationsConsumer>
            </PerilLink>
          )}
        </TranslationsConsumer>
      </Col>
    </Row>
  </Card>
)
