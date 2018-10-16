import { colors, fonts } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'
import { CardWrapper } from '../components/CardWrapper'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

enum InsuranceType {
  RENT = 'RENT',
  BRF = 'BRF',
  STUDENT_RENT = 'STUDENT_RENT',
  STUDENT_BRF = 'STUDENT_BRF',
}

const isApartmentOwner = (insuranceType: InsuranceType): boolean =>
  insuranceType === InsuranceType.BRF ||
  insuranceType === InsuranceType.STUDENT_BRF

interface TermsProps {
  insuranceType: string
}

const PERILSIDE = 72

const Card = styled('div')({
  marginTop: '70px',
  paddingTop: '30px',
  paddingBottom: '60px',
  backgroundColor: colors.WHITE,
  boxShadow: '0px 8px 15px -13px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const Header = styled('h1')({
  color: colors.BLACK,
  marginTop: '30px',
  marginBottom: '30px',
  fontSize: '32px',
})

const Row = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  flexDirection: 'row',
  '@media (max-width: 700px)': {
    justifyContent: 'flex-start',
  },
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

const PerilIcon = styled('img')({
  marginBottom: '0px',
  marginTop: '10px',
  marginRight: '30px',
  marginLeft: '30px',
  width: PERILSIDE,
  height: PERILSIDE,
})

const PerilLink = styled('a')({
  textDecoration: 'none',
})

const PerilTitle = styled('div')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '14px',
  fontFamily: fonts.CIRCULAR,
  textAlign: 'center',
  color: colors.DARK_PURPLE,
  lineHeight: 'normal',
})

export const Terms: React.SFC<TermsProps> = ({ insuranceType }) => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapper>
        <Card>
          <HeaderWrapper>
            <Header>
              <TranslationsConsumer textKey="TERMS_TITLE">
                {(header) => header}
              </TranslationsConsumer>
            </Header>
            <Row>
              <Col>
                <TranslationsConsumer
                  textKey={
                    isApartmentOwner(insuranceType as InsuranceType)
                      ? 'TERMS_PDF_PREBUY_OWNER_URL'
                      : 'TERMS_PDF_PREBUY_RENT_URL'
                  }
                >
                  {(url) => (
                    <PerilLink href={url} target="_blank">
                      <PerilIcon src="/assets/offering/forkopsinformation.svg" />

                      <TranslationsConsumer textKey="TERMS_PERIL_ONE_TITLE">
                        {(title) => <PerilTitle>{title}</PerilTitle>}
                      </TranslationsConsumer>
                    </PerilLink>
                  )}
                </TranslationsConsumer>
              </Col>
              <Col>
                <TranslationsConsumer
                  textKey={
                    isApartmentOwner(insuranceType as InsuranceType)
                      ? 'TERMS_PDF_INSURANCE_OWNER_URL'
                      : 'TERMS_PDF_INSURANCE_RENT_URL'
                  }
                >
                  {(url) => (
                    <PerilLink href={url} target="_blank">
                      <PerilIcon src="/assets/offering/forkopsinformation.svg" />

                      <TranslationsConsumer textKey="TERMS_PERIL_TWO_TITLE">
                        {(title) => <PerilTitle>{title}</PerilTitle>}
                      </TranslationsConsumer>
                    </PerilLink>
                  )}
                </TranslationsConsumer>
              </Col>
            </Row>
          </HeaderWrapper>
        </Card>
      </CardWrapper>
    </InnerWrapper>
  </Wrapper>
)
