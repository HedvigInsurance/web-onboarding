import styled from '@emotion/styled'
import React from 'react'
import * as Notice from 'components/Notice/Notice'
import { Shuffle } from 'components/icons/Shuffle'
import { useTextKeys } from 'utils/textKeys'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const StyledNoticeRoot = styled(Notice.Root)({
  maxWidth: '40rem',
})

const CrossSellSectionHeader = styled.p({
  textTransform: 'uppercase',
  fontSize: '0.875rem',
  [MEDIUM_SCREEN_MEDIA_QUERY]: {
    fontSize: '1rem',
  },
})

export const SwitchingNotice = () => {
  const textKeys = useTextKeys()
  return (
    <div>
      <CrossSellSectionHeader>
        {textKeys.DOWNLOAD_PAGE_CAR_SWITCHER_SECTION_HEADING()}
      </CrossSellSectionHeader>
      <StyledNoticeRoot size="md" icon={<Shuffle size="1.25rem" />}>
        <Notice.Header>
          {textKeys.DOWNLOAD_PAGE_CAR_SWITCHER_HEADING()}
        </Notice.Header>
        {textKeys.DOWNLOAD_PAGE_CAR_SWITCHER_BODY()}
      </StyledNoticeRoot>
    </div>
  )
}
