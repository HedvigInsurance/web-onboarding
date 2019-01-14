import * as React from 'react'
import styled from 'react-emotion'
import { LoggedInMaybe } from './LoggedInMaybe'
import { LoginMaybe } from './LoginMaybe'

const Wrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  minHeight: '100vh',
}))

export class DontPanic extends React.Component {
  public render() {
    return (
      <Wrapper>
        <LoginMaybe reload={() => this.forceUpdate()} />
        <LoggedInMaybe />
      </Wrapper>
    )
  }
}
