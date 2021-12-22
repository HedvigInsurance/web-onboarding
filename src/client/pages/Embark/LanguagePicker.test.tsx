import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { renderComponent } from 'test/utils'
import { LanguagePicker } from './LanguagePicker'

jest.mock('../../apolloClient', () => ({}))

test('Swedish language picker renders without 💥', () => {
  const { getByText, queryByText, container } = renderComponent(
    <MemoryRouter initialEntries={['/se/new-member']}>
      <LanguagePicker color="black" />
    </MemoryRouter>,
  )

  expect(getByText('Sv')).toBeVisible()
  expect(getByText('En').getAttribute('href')).toBe('/se-en/new-member')
  expect(queryByText('No')).toBeNull()

  expect(container.firstChild).toMatchSnapshot()
})

test('Norwegian language picker renders without 💥', () => {
  const { getByText, queryByText, container } = renderComponent(
    <MemoryRouter initialEntries={['/no/new-member']}>
      <LanguagePicker color="black" />
    </MemoryRouter>,
  )

  expect(getByText('No')).toBeVisible()
  expect(getByText('En').getAttribute('href')).toBe('/no-en/new-member')
  expect(queryByText('Sv')).toBeNull()

  expect(container.firstChild).toMatchSnapshot()
})

test('Danish language picker renders without 💥', () => {
  const { getByText, queryByText, container } = renderComponent(
    <MemoryRouter initialEntries={['/dk/new-member']}>
      <LanguagePicker color="black" />
    </MemoryRouter>,
  )

  expect(getByText('Da')).toBeVisible()
  expect(getByText('En').getAttribute('href')).toBe('/dk-en/new-member')
  expect(queryByText('Sv')).toBeNull()

  expect(container.firstChild).toMatchSnapshot()
})
