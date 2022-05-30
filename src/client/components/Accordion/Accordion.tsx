import React, { useContext, useState } from 'react'
import styled from '@emotion/styled'
import AnimateHeight from 'react-animate-height'
import { ChevronDown } from '../icons/ChevronDown'

type AccordionContextInterface = {
  selectedId: string
  setSelectedId: (id: string) => void
  mode: 'single' | 'multiple'
}

const AccordionContext = React.createContext<AccordionContextInterface | null>(
  {} as AccordionContextInterface,
)

export type AccordionProps = {
  children: React.ReactNode
  mode: 'single' | 'multiple'
}

/**
 * Accordion provides a context for AccordionItems to exist in,
 * it keeps track of which Items that are open and if only one
 * or many items can be opened at the same time.
 */
export const Accordion = ({ children, mode = 'single' }: AccordionProps) => {
  const [selectedId, setSelectedId] = useState('')

  return (
    <div>
      <AccordionContext.Provider
        value={{
          selectedId,
          setSelectedId,
          mode: mode,
        }}
      >
        {children}
      </AccordionContext.Provider>
    </div>
  )
}

type AccordionItemContextInterface = {
  id: string
  triggerId: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const AccordionItemContext = React.createContext<AccordionItemContextInterface | null>(
  null,
)

export type AccordionItemProps = {
  children: React.ReactNode
  className?: string
}

/**
 * AccordionItem provides a context for each item in the Accordion
 * list, giving each Item a specific id that helps Accordion keep
 * track of which items that are opened.
 */
export const AccordionItem = ({ children, className }: AccordionItemProps) => {
  const [id] = useState(
    Math.random()
      .toString(36)
      .substr(2, 5),
  )
  const [triggerId] = useState(
    Math.random()
      .toString(36)
      .substr(2, 5),
  )
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={className}>
      <AccordionItemContext.Provider
        value={{ id, triggerId, isOpen, setIsOpen }}
      >
        {children}
      </AccordionItemContext.Provider>
    </div>
  )
}

const AccordionTriggerElement = styled.button<
  Pick<AccordionTriggerProps, 'disabled'>
>(({ disabled }) => ({
  all: 'unset',
  cursor: disabled ? 'initial' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  ':focus-visible': {
    boxShadow: 'currentColor 0px 0px 0px 2px',
  },
}))

type AccordionTriggerProps = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

/**
 * AccordionTrigger is the clickable component that expands and closes
 * an AccordionContent.
 */
export const AccordionTrigger = ({
  children,
  disabled,
  className,
}: AccordionTriggerProps) => {
  const accordionItemContext = useContext(AccordionItemContext)
  const accordionContext = useContext(AccordionContext)

  if (!accordionContext)
    throw new Error('AccordionContent cannot exist outside Accordion')
  if (!accordionItemContext)
    throw new Error('AccordionContent cannot exist outside AccordionItem')

  const { id, triggerId, setIsOpen, isOpen } = accordionItemContext
  const { setSelectedId } = accordionContext

  const onClick = () => {
    setIsOpen(!isOpen)
    const newId = isOpen ? '' : id
    setSelectedId(newId)
  }

  // Passes `isOpen` to any child components (used for styling a trigger icon for example)
  const clonedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child
    }

    return React.cloneElement(child, {
      isOpen: isOpen,
    })
  })

  return (
    <AccordionTriggerElement
      className={className}
      onClick={onClick}
      disabled={disabled}
      id={triggerId}
      aria-controls={id}
      aria-expanded={isOpen}
    >
      {clonedChildren}
    </AccordionTriggerElement>
  )
}

type AccordionContentProps = {
  children: React.ReactNode
  className?: string
}

/**
 * AccordionContent holds the content that gets expanded by AccordionTrigger
 */
export const AccordionContent = ({
  children,
  className,
}: AccordionContentProps) => {
  const accordionItemContext = useContext(AccordionItemContext)
  const accordionContext = useContext(AccordionContext)

  if (!accordionContext)
    throw new Error('AccordionContent cannot exist outside Accordion')
  if (!accordionItemContext)
    throw new Error('AccordionContent cannot exist outside AccordionItem')

  const { id, triggerId, isOpen } = accordionItemContext
  const { selectedId, mode } = accordionContext

  // When mode is "multiple", more than one item can be opened at the time, so
  // only care about local itemContext to determine if open for that mode.
  // For "single" mode, only one can be open at the time, so then the ids need to match
  const isMultiple = mode === 'multiple'
  const isContentOpen = isMultiple ? isOpen : selectedId === id

  return (
    <AnimateHeight
      id={id}
      aria-labelledby={triggerId}
      height={isContentOpen ? 'auto' : 0}
      className={className}
    >
      {children}
    </AnimateHeight>
  )
}

export type AccordionTriggerIconProps = {
  isOpen?: boolean
}

export const AccordionTriggerIcon = styled(ChevronDown)<
  AccordionTriggerIconProps
>(({ isOpen }) => ({
  transform: isOpen ? 'rotate(180deg)' : '',
  transition: 'transform 0.25s ease',
}))
