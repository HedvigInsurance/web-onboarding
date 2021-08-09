import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { renderComponent, waitFor } from 'test/utils'
import { LanguagePicker } from './LanguagePicker'

jest.mock('../../apolloClient', () => ({}))

test('Swedish language picker renders without 💥', () => {
  const { getByText, queryByText, container } = renderComponent(
    <MemoryRouter initialEntries={['/se/new-member']}>
      <LanguagePicker />
    </MemoryRouter>,
  )

  expect(getByText('Svenska').getAttribute('href')).toBe('/se/new-member')
  expect(getByText('English').getAttribute('href')).toBe('/se-en/new-member')
  expect(queryByText('Norsk')).toBeNull()

  expect(container.firstChild).toMatchSnapshot()
})

test('Norwegian language picker renders without 💥', () => {
  const { getByText, queryByText, container } = renderComponent(
    <MemoryRouter initialEntries={['/no/new-member']}>
      <LanguagePicker />
    </MemoryRouter>,
  )

  expect(getByText('Norsk').getAttribute('href')).toBe('/no/new-member')
  expect(getByText('English').getAttribute('href')).toBe('/no-en/new-member')
  expect(queryByText('Svenska')).toBeNull()

  expect(container.firstChild).toMatchSnapshot()
})

test('Danish language picker renders without 💥', () => {
  const { getByText, queryByText, container } = renderComponent(
    <MemoryRouter initialEntries={['/dk/new-member']}>
      <LanguagePicker />
    </MemoryRouter>,
  )

  expect(getByText('Dansk').getAttribute('href')).toBe('/dk/new-member')
  expect(getByText('English').getAttribute('href')).toBe('/dk-en/new-member')
  expect(queryByText('Svenska')).toBeNull()

  expect(container.firstChild).toMatchSnapshot()
})

test('opens when clicking icon', async () => {
  const { getByText, getByRole } = renderComponent(
    <MemoryRouter initialEntries={['/se/new-member']}>
      <LanguagePicker />
    </MemoryRouter>,
  )

  expect(getByText('Svenska')).not.toBeVisible()

  userEvent.click(getByRole('button'))

  await waitFor(() => expect(getByText('Svenska')).toBeVisible())
})
