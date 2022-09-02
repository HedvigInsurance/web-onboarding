import styled from '@emotion/styled'
import React from 'react'
import * as Notice from 'components/Notice/Notice'
import { Shuffle } from 'components/icons/Shuffle'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const StyleedNoticeRoot = styled(Notice.Root)({
  maxWidth: '32rem',
  marginTop: '1.5rem',
  [LARGE_SCREEN_MEDIA_QUERY]: {
    marginRight: '2rem',
  },
})

const CrossSellSectionHeader = styled.p({
  textTransform: 'uppercase',
  marginTop: '4rem',
})

export const SwitchingNotice = () => {
  const textKeys = useTextKeys()
  return (
    <>
      <CrossSellSectionHeader>
        {textKeys.DOWNLOAD_PAGE_CAR_SWITCHER_SECTION_HEADING()}
      </CrossSellSectionHeader>
      <StyleedNoticeRoot size="md" icon={<Shuffle size="1.25rem" />}>
        <Notice.Header>
          {textKeys.DOWNLOAD_PAGE_CAR_SWITCHER_HEADING()}
        </Notice.Header>
        {textKeys.DOWNLOAD_PAGE_CAR_SWITCHER_BODY()}
      </StyleedNoticeRoot>
    </>
  )
}
