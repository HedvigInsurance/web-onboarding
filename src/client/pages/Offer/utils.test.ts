import { BundledQuote } from 'src/client/data/graphql'
import { getCarMakeAndOrModel } from './utils'

describe('Offer utils', () => {
  describe('getCarMakeAndOrModel', () => {
    it('should return empty string when car data cannot be found', () => {
      const quoteWithNoCar = ([{}] as unknown) as BundledQuote[]

      const result = getCarMakeAndOrModel(quoteWithNoCar)

      expect(result).toBe('')
    })

    it('should return model when found', () => {
      const model = 'XC60 T8 TWIN ENGINE'
      const quoteWithModel = ([
        {
          quoteDetails: {
            info: {
              model,
            },
          },
        },
      ] as unknown) as BundledQuote[]

      const result = getCarMakeAndOrModel(quoteWithModel)

      expect(result).toBe(model)
    })

    it('should return makeAndModel when found', () => {
      const makeAndModel = 'VOLVO'
      const quoteWithModel = ([
        {
          quoteDetails: {
            info: {
              makeAndModel,
            },
          },
        },
      ] as unknown) as BundledQuote[]

      const result = getCarMakeAndOrModel(quoteWithModel)

      expect(result).toBe(makeAndModel)
    })

    it('should return both model and makeAndModel when found', () => {
      const makeAndModel = 'VOLVO'
      const model = 'XC60 T8 TWIN ENGINE'

      const quoteWithModel = ([
        {
          quoteDetails: {
            info: {
              makeAndModel,
              model,
            },
          },
        },
      ] as unknown) as BundledQuote[]

      const result = getCarMakeAndOrModel(quoteWithModel)

      expect(result).toBe(`${makeAndModel} ${model}`)
    })

    it.each([
      ['', 'XC60 T8 TWIN ENGINE', 'XC60 T8 TWIN ENGINE'],
      [' ', 'XC60 T8 TWIN ENGINE', 'XC60 T8 TWIN ENGINE'],
      [null, 'XC60 T8 TWIN ENGINE', 'XC60 T8 TWIN ENGINE'],
      [undefined, 'XC60 T8 TWIN ENGINE', 'XC60 T8 TWIN ENGINE'],
      ['VOLVO', '', 'VOLVO'],
      ['VOLVO', ' ', 'VOLVO'],
      ['VOLVO', null, 'VOLVO'],
      ['VOLVO', undefined, 'VOLVO'],
    ])(
      'should remove empty values for return both model and makeAndModel',
      (makeAndModel, model, expected) => {
        const quoteWithModel = ([
          {
            quoteDetails: {
              info: {
                makeAndModel: makeAndModel,
                model: model,
              },
            },
          },
        ] as unknown) as BundledQuote[]

        const result = getCarMakeAndOrModel(quoteWithModel)

        expect(result).toBe(expected)
      },
    )

    it.each([['TOYOTA T27', 'TOYOTA AVENSIS', 'TOYOTA T27 AVENSIS']])(
      'should remove duplicate information when same words occur in both makeAndModel and model',
      (makeAndModel, model, expected) => {
        const quoteWithModel = ([
          {
            quoteDetails: {
              info: {
                makeAndModel: makeAndModel,
                model: model,
              },
            },
          },
        ] as unknown) as BundledQuote[]

        const result = getCarMakeAndOrModel(quoteWithModel)

        expect(result).toBe(expected)
      },
    )
  })
})
