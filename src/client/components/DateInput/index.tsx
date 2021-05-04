import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { addYears, subDays } from 'date-fns'
import Dayzed, { RenderProps as DayzedCalendarProps } from 'dayzed'
import { motion } from 'framer-motion'
import React from 'react'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { ForwardArrow } from 'components/icons/ForwardArrow'
import { BackArrow } from 'components/icons/BackArrow'
import { useTextKeys } from 'utils/textKeys'
import { TextButton } from '../buttons'
import { AnimationDirection, Animator } from './Animator'
import { useMeasure } from './useMeasure'

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
`

const HeightCalculation = styled.div`
  position: absolute;
  visibility: hidden;
  opacity: 0;
`

const HeightAnimation = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  position: relative;
`

const Content = styled.div`
  width: 100%;
`

const CalendarMonth = styled.div`
  display: inline-block;
  width: 100%;
  padding: 0 0.625rem 1.875rem;
  box-sizing: border-box;
  user-select: none;
`

const CalendarMonthHeader = styled.span`
  display: block;
  padding: 1.25rem;
  font-size: 1rem;
`

const CalendarWeekday = styled.span`
  font-size: 0.875rem;
  display: inline-block;
  width: calc(100% / 7);
`

const CalendarDay = styled.button<{ selected: boolean; selectable: boolean }>`
  display: inline-block;
  width: calc(100% / 7);
  border: none;
  appearance: none;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-size: 0.875rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 2px;
  transition: background-color 250ms, color 250ms;
  background: ${colorsV3.white};

  svg {
    width: 13px;
    height: 13px;
    transform: translateY(1px);

    path {
      fill: ${colorsV3.gray700};
    }
  }

  ${(props) =>
    !props.selected &&
    props.selectable &&
    `
    :hover, :active {
      background-color: ${colorsV3.gray300};
      color: ${colorsV3.gray900};
    }
  `};

  ${(props) =>
    props.selected &&
    `
    background-color: ${colorsV3.gray900};
    color: ${colorsV3.white};
  `};

  ${(props) =>
    !props.selectable &&
    `
    background-color: ${colorsV3.white};
    color: ${colorsV3.gray300};
    cursor: default;
  `};
`

const ArrowButton = styled.button<{
  position: 'left' | 'right'
  disabled: boolean
}>`
  appearance: none;
  border: 0;
  outline: 0;
  position: absolute;
  transition: opacity 250ms, transform 250ms;
  background: transparent;
  ${(props) => (props.position === 'left' ? `left: 10px;` : `right: 10px;`)};
  ${(props) => props.disabled && `opacity: 0.5;`};
  top: 22px;
  cursor: pointer;

  :active {
    transform: translateY(2px);
  }
`

const EmptyDay = styled.div`
  display: inline-block;
  width: calc(100% / 7);
`

const CalendarContainer = styled.div`
  position: relative;
  max-width: 50rem;
  margin: 0 auto;
  text-align: center;
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

const Calendar: React.FC<DayzedCalendarProps> = ({
  calendars,
  getBackProps,
  getForwardProps,
  getDateProps,
}) => {
  const [weekdayNamesShort, setWeekdayNamesShort] = React.useState<string[]>(
    [] as string[],
  )
  const [monthNamesShort, setMonthNamesShort] = React.useState<string[]>(
    [] as string[],
  )
  const locale = useCurrentLocale()

  React.useEffect(() => {
    getLocaleImport(locale).then((module) => {
      const dateLocale = module.default

      setMonthNamesShort(
        Array.from({ length: 12 }).map((_, i) =>
          dateLocale.localize?.month(i, { width: 'abbreviated' }),
        ),
      )

      setWeekdayNamesShort([
        dateLocale.localize?.day(1, { width: 'abbreviated' }),
        dateLocale.localize?.day(2, { width: 'abbreviated' }),
        dateLocale.localize?.day(3, { width: 'abbreviated' }),
        dateLocale.localize?.day(4, { width: 'abbreviated' }),
        dateLocale.localize?.day(5, { width: 'abbreviated' }),
        dateLocale.localize?.day(6, { width: 'abbreviated' }),
        dateLocale.localize?.day(0, { width: 'abbreviated' }),
      ])
    })
  }, [locale])

  const [bind, measured] = useMeasure<HTMLDivElement>()
  const [animationDirection, setAnimationDirection] = React.useState(
    AnimationDirection.FORWARDS,
  )

  const content = calendars.map((calendar) => (
    <CalendarMonth key={`${calendar.month}${calendar.year}`}>
      <CalendarMonthHeader>
        {monthNamesShort[calendar.month]} {calendar.year}
      </CalendarMonthHeader>
      {weekdayNamesShort.map((weekday) => (
        <CalendarWeekday key={`${calendar.month}${calendar.year}${weekday}`}>
          {weekday}
        </CalendarWeekday>
      ))}
      {calendar.weeks.map((week, weekIndex) =>
        week.map((dateObj, index) => {
          const key = `${calendar.month}${calendar.year}${weekIndex}${index}`
          if (!dateObj) {
            return <EmptyDay key={key} />
          }

          const { date, selected, selectable } = dateObj

          return (
            <CalendarDay
              selected={selected}
              selectable={selectable}
              key={key}
              {...getDateProps({ dateObj })}
            >
              {date.getDate()}
            </CalendarDay>
          )
        }),
      )}
    </CalendarMonth>
  ))

  if (calendars.length) {
    const backProps = getBackProps({ calendars })
    const forwardProps = getForwardProps({ calendars })

    return (
      <CalendarContainer>
        <HeightCalculation {...bind}>{content}</HeightCalculation>
        <HeightAnimation
          animate={{ height: measured.height, width: measured.width }}
        >
          <Content>
            <Animator animationDirection={animationDirection}>
              {content}
            </Animator>
          </Content>
        </HeightAnimation>
        <div>
          <ArrowButton
            position="left"
            disabled
            {...backProps}
            onClick={(e) => {
              setAnimationDirection(AnimationDirection.BACKWARDS)
              backProps.onClick(e)
            }}
          >
            <BackArrow />
          </ArrowButton>
          <ArrowButton
            position="right"
            disabled
            {...forwardProps}
            onClick={(e) => {
              setAnimationDirection(AnimationDirection.FORWARDS)
              forwardProps.onClick(e)
            }}
          >
            <ForwardArrow />
          </ArrowButton>
        </div>
      </CalendarContainer>
    )
  }
  return null
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
          stiffness: 400,
          damping: 100,
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
