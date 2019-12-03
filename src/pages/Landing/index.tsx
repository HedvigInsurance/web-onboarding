import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { EmptyTopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { TopBar } from 'new-components/TopBar'

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-position: center center;
  background-size: cover;
  background-image: url(/new-member-assets/landing/background.jpg);
`

export const Landing: React.FC = () => (
  <Page>
    <TopBar transparent />
    <Background />
  </Page>
)
