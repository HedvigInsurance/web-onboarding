import styled from '@emotion/styled'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-scroll'
import * as Notice from 'components/Notice/Notice'
import { Shuffle } from 'components/icons/Shuffle'
import { useTextKeys } from 'utils/textKeys'
import { PromotionTypes } from '../../useGetPromotions'

const StyleedNoticeRoot = styled(Notice.Root)({
  marginTop: '1.5rem',
})

const StyledLink = styled(Link)({
  cursor: 'pointer',
})

export const SwitchingNotice = () => {
  const textKeys = useTextKeys()
  return (
    <StyleedNoticeRoot size="sm" icon={<Shuffle size="1.25rem" />}>
      <Notice.Header>
        {textKeys.SIDEBAR_SWITCHING_NOTICE_HEADING()}
      </Notice.Header>
      <ReactMarkdown source={textKeys.SIDEBAR_SWITCHING_NOTICE_BODY()} />

      <StyledLink to={PromotionTypes.SWITCH} smooth={true} duration={500}>
        {textKeys.SIDEBAR_SWITCHING_NOTICE_LINK()}
      </StyledLink>
    </StyleedNoticeRoot>
  )
}
