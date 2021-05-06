import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { LanguagePicker } from './LanguagePicker'

jest.mock('../../apolloClient', () => ({}))

describe('Swedish language picker renders without 💥', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/se/new-member']}>
      <LanguagePicker />
    </MemoryRouter>,
  )

  it('has the correct links', () => {
    expect(wrapper.find('a[href*="/se/new-member"]')).toHaveLength(1)
    expect(wrapper.find('a[href*="/se-en/new-member"]')).toHaveLength(1)
    expect(wrapper.find('a[href*="/no/new-member"]')).toHaveLength(0)
    expect(wrapper.find('a[href*="/no-en/new-member"]')).toHaveLength(0)
  })

  it('matches snaphot', () => {
    expect(toJson(wrapper.find(LanguagePicker))).toMatchSnapshot()
  })
})

describe('Norwegian language picker renders without 💥', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/no/new-member']}>
      <LanguagePicker />
    </MemoryRouter>,
  )

  it('has the correct links', () => {
    expect(wrapper.find('a[href*="/no/new-member"]')).toHaveLength(1)
    expect(wrapper.find('a[href*="/no-en/new-member"]')).toHaveLength(1)
    expect(wrapper.find('a[href*="/se/new-member"]')).toHaveLength(0)
    expect(wrapper.find('a[href*="/se-en/new-member"]')).toHaveLength(0)
  })

  it('matches snaphot', () => {
    expect(toJson(wrapper.find(LanguagePicker))).toMatchSnapshot()
  })
})

describe('Danish language picker renders without 💥', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/dk/new-member']}>
      <LanguagePicker />
    </MemoryRouter>,
  )

  it('has the correct links', () => {
    expect(wrapper.find('a')).toHaveLength(2)
    expect(wrapper.find('a[href*="/dk/new-member"]')).toHaveLength(1)
    expect(wrapper.find('a[href*="/dk-en/new-member"]')).toHaveLength(1)
  })

  it('matches snaphot', () => {
    expect(toJson(wrapper.find(LanguagePicker))).toMatchSnapshot()
  })
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
