import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'

const StudentBadgeWrapper = styled('div')(
  ({ placement }: { placement: 'left' | 'right' }) => ({
    position: 'absolute',
    [placement === 'left' ? 'right' : 'left']: '70%',
    top: -30,
    padding: 20,
    width: 140,
    height: 140,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: colors.PINK,
    color: colors.WHITE,
    borderRadius: '50%',

    '@media (max-width: 560px)': {
      display: 'none', // TODO fixme (this is a quick hack to get it working on desktop but not break mobile completely)
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
