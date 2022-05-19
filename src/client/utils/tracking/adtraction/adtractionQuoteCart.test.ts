import { QuoteBundle } from 'data/graphql'
import { getProductCategories } from './adtractionQuoteCart'

const swedishBundleMock = {
  quotes: [
    {
      data: {
        type: 'SWEDISH_APARTMENT',
      },
    },
    {
      data: {
        type: 'SWEDISH_ACCIDENT',
      },
    },
  ],
} as QuoteBundle
const swedishStudentBundleMock = {
  quotes: [
    {
      data: {
        type: 'SWEDISH_APARTMENT',
        subType: 'STUDENT_BRF',
      },
    },
    {
      data: {
        type: 'SWEDISH_ACCIDENT',
      },
    },
  ],
} as QuoteBundle

const norwegianBundleMock = {
  quotes: [
    {
      data: {
        type: 'NORWEGIAN_HOME_CONTENT',
      },
    },
    {
      data: {
        type: 'NORWEGIAN_HOUSE',
      },
    },
    {
      data: {
        type: 'NORWEGIAN_ACCIDENT',
      },
    },
    {
      data: {
        type: 'NORWEGIAN_TRAVEL',
      },
    },
  ],
} as QuoteBundle

const norwegianYouthBundleMock = {
  quotes: [
    {
      data: {
        type: 'NORWEGIAN_HOME_CONTENT',
        isYouth: true,
      },
    },
    {
      data: {
        type: 'NORWEGIAN_HOUSE',
        isYouth: true,
      },
    },
    {
      data: {
        type: 'NORWEGIAN_ACCIDENT',
      },
    },
    {
      data: {
        type: 'NORWEGIAN_TRAVEL',
      },
    },
  ],
} as QuoteBundle

const danishStudentBundleMock = {
  quotes: [
    {
      data: {
        type: 'DANISH_HOME_CONTENT',
        isStudent: true,
      },
    },
    {
      data: {
        type: 'DANISH_ACCIDENT',
      },
    },
    {
      data: {
        type: 'DANISH_TRAVEL',
      },
    },
  ],
} as QuoteBundle

describe('getProductValue', () => {
  it('return the correct pc value for SE bundle', () => {
    expect(getProductCategories(swedishBundleMock)).toBe(
      'homecontent_0-accident_0',
    )
  })

  it('return the correct pc value for SE Student bundle', () => {
    expect(getProductCategories(swedishStudentBundleMock)).toBe(
      'homecontentstudent_0-accident_0',
    )
  })

  it('return the correct pc value for NO bundle', () => {
    expect(getProductCategories(norwegianBundleMock)).toBe(
      'homecontent_0-house_0-accident_0-travel_0',
    )
  })

  it('return the correct pc value for NO Youth bundle', () => {
    expect(getProductCategories(norwegianYouthBundleMock)).toBe(
      'homecontentstudent_0-house_0-accident_0-travel_0',
    )
  })

  it('return the correct pc value for DK Student bundle', () => {
    expect(getProductCategories(danishStudentBundleMock)).toBe(
      'homecontentstudent_0-accident_0-travel_0',
    )
  })
})
