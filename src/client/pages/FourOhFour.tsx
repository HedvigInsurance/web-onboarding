import styled from '@emotion/styled'
import React from 'react'
import Helmet from 'react-helmet-async'
import { RouteComponentProps } from 'react-router'
import { TopBar } from 'components/TopBar'
import { useTextKeys } from 'utils/textKeys'

const FourOhFourWrapper = styled('div')({
  textAlign: 'center',
  padding: 20,
  paddingTop: '5rem',
})

const LinksWrapper = styled('div')({
  paddingTop: 50,
})

export const FourOhFour: React.FunctionComponent<RouteComponentProps<
  Record<string, string>
>> = ({ staticContext }) => {
  if (staticContext) {
    staticContext.statusCode = 404
  }
  const textKeys = useTextKeys()

  return (
    <>
      <Helmet>
        <title>{textKeys.FOUR_OH_FOUR_PAGE_TITLE()}</title>
      </Helmet>

      <TopBar />
      <FourOhFourWrapper>
        <h1>{textKeys.FOUR_OH_FOUR_HEADLINE()}</h1>
        <LinksWrapper>
          <div
            dangerouslySetInnerHTML={{ __html: textKeys.FOUR_OH_FOUR_LINKS() }}
          />
        </LinksWrapper>
      </FourOhFourWrapper>
    </>
  )
}
