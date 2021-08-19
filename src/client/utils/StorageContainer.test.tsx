import React from 'react'
import userEvent from '@testing-library/user-event'
import { renderComponent } from 'test/utils'
import { createSession } from '../../shared/sessionStorage'
import { notNullable } from './nullables'
import { MockStorage } from './storage/MockStorage'
import { StorageContainer } from './StorageContainer'

test('stores a token in the session', () => {
  const { getByTestId, getByText } = renderComponent(
    <StorageContainer
      initialState={{ session: createSession(new MockStorage()) }}
    >
      {(state) => (
        <>
          <div data-testid="test-div">
            {notNullable(state.session.getSession()).token || null}
          </div>
          <button onClick={() => state.setToken('blargh')}>Set token</button>
        </>
      )}
    </StorageContainer>,
  )

  expect(getByTestId('test-div').innerHTML).toBe('')

  userEvent.click(getByText('Set token'))
  expect(getByTestId('test-div').innerHTML).toBe('blargh')
})
