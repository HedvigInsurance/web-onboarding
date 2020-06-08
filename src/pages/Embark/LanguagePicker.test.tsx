import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { LanguagePicker } from './LanguagePicker'

jest.mock('../../client/apolloClient', () => ({}))

it('renders SE without 💥', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/se/new-member']}>
      <LanguagePicker />
    </MemoryRouter>,
  )

  expect(wrapper.find('Link[to*="/se/new-member"]')).toHaveLength(1)
  expect(wrapper.find('Link[to*="/se-en/new-member"]')).toHaveLength(1)
  expect(wrapper.find('Link[to*="/no/new-member"]')).toHaveLength(0)
  expect(wrapper.find('Link[to*="/no-en/new-member"]')).toHaveLength(0)

  expect(toJson(wrapper.find(LanguagePicker))).toMatchSnapshot()
})

it('renders NO without 💥', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/no/new-member']}>
      <LanguagePicker />
    </MemoryRouter>,
  )

  expect(wrapper.find('Link[to*="/no/new-member"]')).toHaveLength(1)
  expect(wrapper.find('Link[to*="/no-en/new-member"]')).toHaveLength(1)
  expect(wrapper.find('Link[to*="/se/new-member"]')).toHaveLength(0)
  expect(wrapper.find('Link[to*="/se-en/new-member"]')).toHaveLength(0)

  expect(toJson(wrapper.find(LanguagePicker))).toMatchSnapshot()
})

it('opens when clicking icon', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/se/new-member']}>
      <LanguagePicker />
    </MemoryRouter>,
  )

  expect(wrapper.find('ForwardRef(MotionComponent)').prop('animate')).toBe(
    'closed',
  )
  act(() => {
    wrapper.find('LanguageDropdownButton').simulate('click')
  })
  wrapper.update()

  expect(wrapper.find('ForwardRef(MotionComponent)').prop('animate')).toBe(
    'open',
  )
})
