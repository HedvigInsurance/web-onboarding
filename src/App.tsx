import * as React from 'react'
import styled from 'react-emotion'

const AppComponent = styled('div')({
  backgroundColor: 'pink',
  color: 'red',
})

export const App: React.SFC = () => <AppComponent>Hello world!</AppComponent>
