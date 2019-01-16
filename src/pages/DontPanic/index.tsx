import { Container } from 'constate'
import * as React from 'react'
import { Mount } from 'react-lifecycle-components'
import { DontPanic } from './DontPanic'

// export const LazyDontPanic = () => (
//   <Container<
//     { DontPanicComponent: null | React.ComponentType },
//     {
//       setDontPanicComponent: (DontPanicComponent: React.ComponentType) => void
//     }
//   >
//     initialState={{ DontPanicComponent: null }}
//     actions={{
//       setDontPanicComponent: (DontPanicComponent) => ({ DontPanicComponent }),
//     }}
//   >
//     {({ DontPanicComponent, setDontPanicComponent }) => (
//       <Mount
//         on={() =>
//           import(/* webpackChunkName: 'dont-panic' */ './DontPanic').then(
//             ({ DontPanic }) => setDontPanicComponent(DontPanic),
//           )
//         }
//       >
//         {DontPanicComponent && <DontPanicComponent />}
//       </Mount>
//     )}
//   </Container>
// )
export const LazyDontPanic = () => <DontPanic />
