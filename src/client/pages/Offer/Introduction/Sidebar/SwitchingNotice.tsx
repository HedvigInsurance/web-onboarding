import styled from '@emotion/styled'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import * as Notice from 'components/Notice/Notice'
import { Shuffle } from 'components/icons/Shuffle'
import { useTextKeys } from 'utils/textKeys'
import { PromotionTypes } from '../../useGetPromotions'

const StyleedNoticeRoot = styled(Notice.Root)({
  marginTop: '1.5rem',
})

export const SwitchingNotice = () => {
  const textKeys = useTextKeys()
  return (
    <StyleedNoticeRoot size="sm" icon={<Shuffle size="1.25rem" />}>
      <Notice.Header>
        {textKeys.SIDEBAR_SWITCHING_NOTICE_HEADING()}
      </Notice.Header>
      <ReactMarkdown source={textKeys.SIDEBAR_SWITCHING_NOTICE_BODY()} />

      <a href={`#${PromotionTypes.SWITCH}`}>
        {textKeys.SIDEBAR_SWITCHING_NOTICE_LINK()}
      </a>
    </StyleedNoticeRoot>
  )
}
