import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { RenderProps as DayzedCalendarProps } from 'dayzed'
import { colorsV3 } from '@hedviginsurance/brand'
import { useCurrentLocale } from '../utils/CurrentLocale'
import { BackArrow } from '../icons/BackArrow'
import { ForwardArrow } from '../icons/ForwardArrow'
import { AnimationDirection, Animator } from './Animator'
import { getLocaleImport } from '.'

const Content = styled.div`
  width: 100%;
`

const CalendarMonthWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CalendarMonth = styled.div`
  display: inline-block;
  width: 82%;
  padding: 0 0.625rem;
  box-sizing: border-box;
  user-select: none;
  text-align: center;
`

const CalendarMonthHeader = styled.span`
  display: block;
  padding: 2.25rem 0 1.25rem;
  font-size: 1rem;
  text-transform: capitalize;
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
  color: ${colorsV3.gray900};

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
  ${(props) =>
    props.position === 'left' ? `left: 0.5rem;` : `right: 0.5rem;`};
  ${(props) => props.disabled && `opacity: 0.5;`};
  top: 150px;
  cursor: pointer;

  path {
    fill: ${colorsV3.gray900};
  }

  :hover path {
    fill: ${colorsV3.gray700};
  }

  :active {
    transform: translateY(2px);
  }
`

const EmptyDay = styled.div`
  display: inline-block;
  width: calc(100% / 7);
`

export const Calendar: React.FC<DayzedCalendarProps> = ({
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

  useEffect(() => {
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

  const [animationDirection, setAnimationDirection] = React.useState(
    AnimationDirection.FORWARDS,
  )

  const content = calendars.map((calendar) => (
    <CalendarMonthWrapper key={`${calendar.month}${calendar.year}`}>
      <CalendarMonth>
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
    </CalendarMonthWrapper>
  ))

  if (calendars.length) {
    const backProps = getBackProps({ calendars })
    const forwardProps = getForwardProps({ calendars })

    return (
      <>
        <Content>
          <Animator animationDirection={animationDirection}>{content}</Animator>
        </Content>
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
      </>
    )
  }
  return null
}
