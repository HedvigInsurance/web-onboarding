import React from 'react'
import styled from '@emotion/styled'
import { Story } from '@storybook/react'
import { colorsV3 } from '@hedviginsurance/brand'
import { SubSection } from './SubSection'
import { PageSection } from './PageSection'

const { gray700 } = colorsV3

const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${gray700};
`

export default {
  title: 'Components/CheckoutDetailsPageSections',
  component: PageSection,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

const Template: Story = () => (
  <PageSection>
    <SubSection>
      <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Text>
      <Text>Ipsa nulla eaque in libero inventore.</Text>
    </SubSection>
    <SubSection>
      <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Text>
      <Text>Ipsa nulla eaque in libero inventore.</Text>
    </SubSection>
  </PageSection>
)

export const Default = Template.bind({})
