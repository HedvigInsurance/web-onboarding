import styled from '@emotion/styled'
import React from 'react'
import * as Notice from 'components/Notice/Notice'
import { Shuffle } from 'components/icons/Shuffle'
import { useTextKeys } from 'utils/textKeys'

const StyleedNoticeRoot = styled(Notice.Root)({
  marginTop: '1.5rem',
})

export const SwitchingNotice = () => {
  const textKeys = useTextKeys()
  return (
    <StyleedNoticeRoot icon={<Shuffle size="1.25rem" />}>
      <Notice.Header>
        {textKeys.SIDEBAR_SWITCHING_NOTICE_HEADING()}
      </Notice.Header>
      {textKeys.SIDEBAR_SWITCHING_NOTICE_BODY()}
      <br />
      <a href="#">{textKeys.SIDEBAR_SWITCHING_NOTICE_LINK()}</a>
    </StyleedNoticeRoot>
  )
}
