import styled from '@emotion/styled'
import React from 'react'
import { Cross } from '../icons/Cross'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionProps,
  AccordionTrigger,
  AccordionTriggerIcon,
  AccordionTriggerIconProps,
} from './Accordion'

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

const Icon = styled(Cross)<AccordionTriggerIconProps>(({ isOpen }) => ({
  transform: isOpen ? 'rotate(180deg)' : 'rotate(45deg)',
  transition: 'transform 0.25s ease',
  marginLeft: '0.5rem',
}))

export const Default = (args: AccordionProps) => (
  <div style={{ width: '650px', height: '200px' }}>
    <Accordion {...args}>
      <AccordionItem>
        <AccordionTrigger>
          Icon?
          <AccordionTriggerIcon />
        </AccordionTrigger>
        <AccordionContent>This example uses the default icon</AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>
          Accessible?
          <AccordionTriggerIcon />
        </AccordionTrigger>
        <AccordionContent>
          This component can be navigated with keyboard and has same ARIA
          attributes as Radix
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
)

export const CustomIcon = (args: AccordionProps) => (
  <div style={{ width: '650px', height: '200px' }}>
    <Accordion {...args}>
      <AccordionItem>
        <AccordionTrigger>
          Icon?
          <Icon size="1rem" />
        </AccordionTrigger>
        <AccordionContent>This example uses a custom icon</AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>
          Accessible?
          <Icon size="1rem" />
        </AccordionTrigger>
        <AccordionContent>
          This component can be navigated with keyboard and has same ARIA
          attributes as Radix
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
)
