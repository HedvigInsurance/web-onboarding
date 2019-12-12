import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { Modal, ModalProps } from 'components/ModalNew'
import { CompleteQuote } from 'generated/graphql'
import { TextInput } from 'new-components/inputs'
import * as React from 'react'
import { Formik, Form } from 'formik'

interface Props {
  quote: CompleteQuote
}

const Container = styled.div`
  width: 100%;
  height: 100;
  padding 4rem 5rem 1.5rem 5rem;
  display: flex;
  flex-direction: column;
`

const Headline = styled.div`
  font-family: ${fonts.GEOMANIST};
  font-size: 2.5rem;
  line-height: 3.5rem;
  color: ${colorsV2.black};
`

const Content = styled.div`
  width: calc(100% + 3rem);
  display: flex;
  flex-direction: row;
  margin: 0 -1.5rem;
  margin-top: 2.5rem;
`

const ContentColumn = styled.div`
  width: 50%;
  margin: 0 1.5rem;
`

export const DetailsModal: React.FC<ModalProps & Props> = ({
  quote,
  isVisible,
  onClose,
}) => (
  <Modal isVisible={isVisible} onClose={onClose}>
    <Container>
      <Headline>Dina detaljer</Headline>
      <Content>
        <ContentColumn>
          <Formik
            initialValues={{
              street: quote.details.street,
              zipCode: quote.details.zipCode,
              livingSpace: quote.details.livingSpace,
              householdSize: quote.details.householdSize,
            }}
            onSubmit={(form, actions) => {
              console.log(form)
            }}
          >
            {({ touched, errors, values }) => (
              <Form>
                <TextInput
                  label={'Adress'}
                  placeholder={'Adress'}
                  name="street"
                  autoComplete="off"
                  touched={
                    touched.street ? touched.street.toString() : undefined
                  }
                  errors={''}
                />

                <TextInput
                  label={'Postnummer'}
                  placeholder={'Postnummer'}
                  name="zipCode"
                  autoComplete="off"
                  touched={
                    touched.zipCode ? touched.zipCode.toString() : undefined
                  }
                  errors={''}
                />

                <TextInput
                  label={'Storlek'}
                  placeholder={'Storlek'}
                  name="livingSpace"
                  autoComplete="off"
                  touched={
                    touched.livingSpace
                      ? touched.livingSpace.toString()
                      : undefined
                  }
                  errors={''}
                />

                <TextInput
                  label={'Antal försäkrade'}
                  placeholder={'Antal försäkrade'}
                  name="householdSize"
                  autoComplete="off"
                  touched={
                    touched.householdSize
                      ? touched.householdSize.toString()
                      : undefined
                  }
                  errors={''}
                />
              </Form>
            )}
          </Formik>
        </ContentColumn>
        <ContentColumn>2</ContentColumn>
      </Content>
    </Container>
  </Modal>
)
