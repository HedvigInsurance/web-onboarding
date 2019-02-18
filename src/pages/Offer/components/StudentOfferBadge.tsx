import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'

const StudentBadgeWrapper = styled('div')(
  ({ placement }: { placement: 'left' | 'right' }) => ({
    position: 'absolute',
    [placement === 'left' ? 'right' : 'left']: '70%',
    display: 'flex',
    alignItems: 'center',
    top: -35,
    padding: 20,
    width: 140,
    height: 140,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: colors.PINK,
    color: colors.WHITE,
    borderRadius: '50%',
    fontSize: '1em',
    '@media (max-width: 620px)': {
      fontSize: '0.9em',
      top: -30,
      padding: 20,
      width: 120,
      height: 120,
    },
    '@media (max-width: 420px)': {
      display: 'none',
    },
  }),
)

export const StudentBadge: React.SFC<{ placement: 'left' | 'right' }> = ({
  placement,
}) => (
  <StudentBadgeWrapper placement={placement}>
    <TranslationsConsumer textKey="OFFER_STUDENT_BADGE">
      {(t) => t}
    </TranslationsConsumer>
  </StudentBadgeWrapper>
)
