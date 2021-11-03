import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { addYears, subDays } from 'date-fns'
import Dayzed from 'dayzed'
import { motion } from 'framer-motion'
import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { TextButton } from '../buttons'
import { Calendar } from './Calendar'

const Wrapper = styled(motion.div)`
  position: absolute;
  left: 0;
  width: 100%;
  padding: 0.625rem 1.25rem;
`

const Container = styled(motion.div)`
  margin: 0 auto;
  position: relative;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
  background-color: ${colorsV3.white};
  height: 320px;
  overflow: hidden;
`

const AtStartDateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 0 1.875rem;
  color: ${colorsV3.gray500};
`

interface DateInputProps {
  open: boolean
  setOpen: (open: boolean) => void
  date: Date
  setDate: (date: Date | null) => void
  hasCurrentInsurer: boolean
}

export const DateInput: React.FC<DateInputProps> = ({
  open,
  setOpen,
  date,
  setDate,
  hasCurrentInsurer,
}) => {
  const textKeys = useTextKeys()

  return (
    <Wrapper
      aria-hidden={!open}
      initial={{ visibility: 'hidden' }}
      animate={
        open
          ? {
              visibility: 'visible',
            }
          : { visibility: 'hidden' }
      }
      transition={{ ease: 'linear', delay: open ? 0 : 0.5, duration: 0 }}
    >
      <Container
        initial={{ y: 0, opacity: 0, pointerEvents: 'none' }}
        animate={
          open
            ? {
                display: 'inline-block',
                y: 0,
                opacity: 1,
                pointerEvents: 'all',
              }
            : { y: 50, opacity: 0, pointerEvents: 'none' }
        }
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 50,
        }}
      >
        <Dayzed
          date={new Date()}
          firstDayOfWeek={1}
          selected={date}
          minDate={subDays(new Date(), 1)}
          maxDate={addYears(new Date(), 1)}
          onDateSelected={(dateObj) => {
            setDate(dateObj.date)
            setOpen(false)
          }}
          render={(dayzedData) => <Calendar {...dayzedData} />}
        />
        {hasCurrentInsurer && (
          <AtStartDateContainer>
            <TextButton
              onClick={() => {
                setDate(null)
                setOpen(false)
              }}
            >
              {textKeys.START_DATE_WHEN_OLD_EXPIRES()}
            </TextButton>
          </AtStartDateContainer>
        )}
      </Container>
    </Wrapper>
  )
}

export const getLocaleImport = (locale: string) => {
  switch (locale) {
    case 'se-en':
    case 'no-en':
    case 'dk-en':
      return import(
        /* webpackChunkName: 'date-fns-en' */
        'date-fns/locale/en-GB'
      )
    case 'dk':
      return import(
        /* webpackChunkName: 'date-fn-dk' */
        'date-fns/locale/da'
      )
    case 'no':
      return import(
        /* webpackChunkName: 'date-fn-no' */
        'date-fns/locale/nb'
      )
    case 'se':
    default:
      return import(
        /* webpackChunkName: 'date-fns-sv' */
        'date-fns/locale/sv'
      )
  }
}
