import * as React from 'react'
import { Mount } from 'react-lifecycle-components'
import { StorageContainer } from 'utils/StorageContainer'
import { RedeemCodeMutation } from './containers/RedeemCodeMutation'

interface Props {
  refetch: () => void
}

export const DiscountAutoConsumer: React.FunctionComponent<Props> = ({
  refetch,
}) => (
  <RedeemCodeMutation>
    {(mutate) => (
      <StorageContainer>
        {({ session }) => (
          <Mount
            on={() => {
              const sess = session.getSession()
              if (sess && sess.code) {
                mutate({ variables: { code: sess.code } }).then(() => {
                  session.setSession({ ...sess, code: undefined })
                  refetch()
                })
              }
            }}
          >
            {null}
          </Mount>
        )}
      </StorageContainer>
    )}
  </RedeemCodeMutation>
)
