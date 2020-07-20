import { mount } from 'enzyme'
import React from 'react'
import { StaticRouter } from 'react-router'
import { useVariation } from 'utils/hooks/useVariation'

const VariationShower: React.FC = () => {
  const variation = useVariation()

  return <>{variation}</>
}

it('returns null on no variation', () => {
  const wrapper = mount(
    <StaticRouter location="/a-path?variation=blargh">
      <VariationShower />
    </StaticRouter>,
  )
  expect(wrapper.find(VariationShower).text()).toBe('')
})

it('returns ios on ios variation, case insensitively', () => {
  const wrapper = mount(
    <StaticRouter location="/a-path?variation=IOS">
      <VariationShower />
    </StaticRouter>,
  )
  expect(wrapper.find(VariationShower).text()).toBe('ios')
})

it('stores and retrieves variations in sessionStorage', async () => {
  mount(
    <StaticRouter location="/a-path?variation=IOS">
      <VariationShower />
    </StaticRouter>,
  )
  expect(sessionStorage.getItem('hvg:variation')).toBe('"ios"')

  const wrapperWithoutVariationQuery = mount(
    <StaticRouter location="/a-path">
      <VariationShower />
    </StaticRouter>,
  )
  expect(wrapperWithoutVariationQuery.find(VariationShower).text()).toBe('ios')
})
