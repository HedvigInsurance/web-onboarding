import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import Dayzed, { RenderProps as DayzedCalendarProps } from 'dayzed'
import { addYears, subDays } from 'date-fns'
import * as React from 'react'
import { Animator, AnimationDirection } from './Animator'
import { useMeasure } from './useMeasure'
import { BackArrow } from 'components/icons/BackArrow'
import { ForwardArrow } from 'components/icons/ForwardArrow'
import { Cross } from 'components/icons/Cross'
import { useCurrentLanguage } from 'components/utils/CurrentLanguage'

const Wrapper = styled(motion.div)`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0.625rem 1.25rem;
`

const Container = styled(motion.div)`
  margin: 0 auto;
  position: relative;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
  background-color: ${colorsV2.white};
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
  boxsizing: border-box;
  user-select: none;
`

const CalendarMonthHeader = styled.span`
  display: block;
  padding: 1.25rem;
  font-size: 1rem;
  font-weight: 600;
`

const CalendarWeekday = styled.span`
  font-size: 0.875rem;
  font-weight: 300;
  display: inline-block;
  width: calc(100% / 7);
`

const CalendarDay = styled.button<{ selected: boolean; selectable: boolean }>`
  display: inline-block;
  width: calc(100% / 10);
  border: none;
  appearance: none;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-size: 0.875rem;
  padding-top: 0.15625rem;
  padding-bottom: 0.15625rem;
  border-radius: 12px;
  transition: background-color 250ms, color 250ms;
  margin: 2.1%;

  svg {
    width: 13px;
    height: 13px;
    transform: translateY(1px);

    path {
      fill: ${colorsV2.darkgray};
    }
  }

  ${(props) =>
    !props.selected &&
    props.selectable &&
    `
    :hover {
      background-color: ${colorsV2.violet200};
      color: ${colorsV2.white};
    }

    :active {
      background-color: ${colorsV2.violet500};
      color: ${colorsV2.white};
    }
  `};

  ${(props) =>
    props.selected &&
    `
    background-color: ${colorsV2.violet500};
    color: ${colorsV2.white};
  `};

  ${(props) =>
    !props.selectable &&
    `
    background-color: ${colorsV2.lightgray};
    color: ${colorsV2.darkgray};
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
  ${(props) => (props.position == 'left' ? `left: 10px;` : `right: 10px;`)};
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
`

interface DateInputProps {
  open: boolean
  setOpen: (open: boolean) => void
  date: Date
  setDate: (date: Date) => void
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
  const language = useCurrentLanguage()

  React.useEffect(() => {
    const getLocaleImport = () => {
      if (language === 'en') {
        return import('date-fns/locale/en-GB')
      }

      return import('date-fns/locale/sv')
    }

    getLocaleImport().then((module) => {
      const locale = module.default

      setMonthNamesShort(
        Array.from({ length: 12 }).map((_, i) =>
          locale.localize.month(i, { width: 'abbreviated' }),
        ),
      )

      setWeekdayNamesShort([
        locale.localize.day(1, { width: 'abbreviated' }),
        locale.localize.day(2, { width: 'abbreviated' }),
        locale.localize.day(3, { width: 'abbreviated' }),
        locale.localize.day(4, { width: 'abbreviated' }),
        locale.localize.day(5, { width: 'abbreviated' }),
        locale.localize.day(6, { width: 'abbreviated' }),
        locale.localize.day(0, { width: 'abbreviated' }),
      ])
    })
  }, [])

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
          let key = `${calendar.month}${calendar.year}${weekIndex}${index}`
          if (!dateObj) {
            return <EmptyDay key={key} />
          }

          let { date, selected, selectable } = dateObj

          return (
            <CalendarDay
              selected={selected}
              selectable={selectable}
              key={key}
              {...getDateProps({ dateObj })}
            >
              {selectable ? date.getDate() : <Cross />}
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
      <CalendarContainer
        style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}
      >
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
}) => {
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
      </Container>
    </Wrapper>
  )
}
