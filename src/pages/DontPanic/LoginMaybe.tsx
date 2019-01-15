import { colors, fonts } from '@hedviginsurance/brand'
import { css } from 'emotion'
import * as React from 'react'
import styled from 'react-emotion'
import ReactFacebookLogin, {
  ReactFacebookLoginInfo,
} from 'react-facebook-login'
import { StorageContainer } from '../../utils/StorageContainer'

const Header = styled('h1')({
  fontSize: '5rem',
  color: colors.BLACK_PURPLE,
})

const dontPanicButton = css({
  appearance: 'none',
  border: 0,
  boxShadow:
    '0 0 0 20px rgba(27, 233, 182, .2), 0 0 0 40px rgba(27, 233, 182, .2)',
  margin: 80,
  height: '30vh',
  width: '30vh',
  borderRadius: '100%',
  backgroundColor: colors.GREEN,
  color: '#fff',
  fontSize: '5vh',
  fontFamily: fonts.SORAY,
  cursor: 'pointer',
  transition: 'transform 200ms, box-shadow 400ms',

  '&:hover, &:focus': {
    transform: 'scale(1.05)',
    boxShadow:
      '0 0 0 20px rgba(27, 233, 182, .3), 0 0 0 40px rgba(27, 233, 182, .25)',
  },
})

const Info = styled('div')({
  color: colors.BLACK_PURPLE,
  textAlign: 'center',
  fontSize: '1.2rem',
  marginBottom: 0,
})

const QuestionsSection = styled('div')({
  textAlign: 'center',
  padding: '3rem 0',
  marginTop: '3rem',
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
  borderTop: '1px solid ' + colors.LIGHT_GRAY,
})

const SubTitle = styled('h2')({
  fontSize: 45,
  marginBottom: 0,
  lineHeight: 1.1,
  span: {
    display: 'block',
    fontSize: 28,
  },
})

const HelpButton = styled('div')({
  width: '50%',
  textAlign: 'center',
  padding: '.5rem 0',
  border: '1px solid ' + colors.PURPLE,
  borderRadius: '100px',
  color: colors.PURPLE,
  margin: '1rem auto',
})

export const LoginMaybe = (props: { reload: () => void }) => (
  <StorageContainer>
    {({ dontPanicSession }) => {
      if (
        dontPanicSession!.getSession() &&
        dontPanicSession!.getSession().fbData
      ) {
        return null
      }

      return (
        <>
          <Header>Har något hänt?</Header>
          <ReactFacebookLogin
            appId="221855442096816"
            callback={
              ((
                fbData: ReactFacebookLoginInfo & {
                  picture: { data: { url: string } }
                },
              ) => {
                if (!fbData || !fbData.id) {
                  return
                }
                dontPanicSession!.setSession({
                  ...dontPanicSession!.getSession(),
                  fbData,
                })
                props.reload()
              }) as any
            }
            fields="name,email,picture"
            textButton="Don't panic"
            cssClass={dontPanicButton}
          />

          <Info>
            Livet händer. Låt hedvig hjälpa dig.
            <br />
            När som helst. Med (nästan) vad som helst.
          </Info>

          <QuestionsSection>
            <SubTitle>
              Några saker
              <span>du kan få hjälp med</span>
            </SubTitle>

            <HelpButton>Mitt flyg är försenat, blir jag ersatt?</HelpButton>
            <HelpButton>Jag ska bli sambo - vad gäller?</HelpButton>
            <HelpButton>Vad hette Karl XIIs häst?</HelpButton>
          </QuestionsSection>
        </>
      )
    }}
  </StorageContainer>
)
