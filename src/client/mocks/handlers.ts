import { graphql } from 'msw'

import { FaqsQuery, FaqsQueryVariables } from 'data/graphql'

export const handlers = [
  graphql.query<FaqsQuery, FaqsQueryVariables>('Faqs', (_, res, ctx) => {
    return res(
      ctx.data({
        languages: [
          {
            faqs: [
              {
                id: 'faq:0',
                headline: 'faq:0 Headline',
                body: 'faq:0 Body',
                __typename: 'Faq',
              },
            ],
            __typename: 'Language',
          },
        ],
      }),
    )
  }),
]
