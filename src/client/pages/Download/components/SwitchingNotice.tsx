import styled from '@emotion/styled'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import * as Notice from 'components/Notice/Notice'
import { Shuffle } from 'components/icons/Shuffle'
import { useTextKeys } from 'utils/textKeys'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { isStartDateValidForCarSwitching } from 'utils/isStartDateValidForCarSwitching'
import { LinkButton } from 'components/buttons'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

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

type Props = {
  inceptionDate?: string
  contractId: string
}

export const SwitchingNotice = ({ inceptionDate, contractId }: Props) => {
  const textKeys = useTextKeys()
  const { path: pathLocale } = useCurrentLocale()

  let header = textKeys.DOWNLOAD_PAGE_BANKSIGNERING_SWITCHER_HEADING()
  const cancelLink = `/${pathLocale}/new-member/initiate-car-cancellation?contractId=${contractId}`
  let body = (
    <>
      <p>{textKeys.DOWNLOAD_PAGE_BANKSIGNERING_SWITCHER_BODY()}</p>
      <LinkButton to={cancelLink}>
        {textKeys.DOWNLOAD_PAGE_CAR_SWITCHER_BUTTON()}
      </LinkButton>
    </>
  )
  const isTooSoon = !isStartDateValidForCarSwitching(inceptionDate)
  if (isTooSoon) {
    header = textKeys.CAR_SWITCHER_TOO_SOON_HEADING()
    body = <ReactMarkdown source={textKeys.CAR_SWITCHER_TOO_SOON_BODY()} />
  }

  return (
    <div>
      <CrossSellSectionHeader>
        {textKeys.DOWNLOAD_PAGE_CAR_SWITCHER_SECTION_HEADING()}
      </CrossSellSectionHeader>
      <StyledNoticeRoot size="md" icon={<Shuffle size="1.25rem" />}>
        <Notice.Header>{header}</Notice.Header>
        {body}
      </StyledNoticeRoot>
    </div>
  )
}
