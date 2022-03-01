import { faker } from '@faker-js/faker'
import { createQuoteBundle, createQuoteCart } from './helpers'

const BIRTH_DATE = '1999-07-12'
// You need to manually unsign this member in Hope before running the script
const SSN = '15126533427'

const HOME_CONTENT_QUOTE = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  birthDate: BIRTH_DATE,
  data: {
    type: 'NORWEGIAN_HOME_CONTENT',
    street: faker.address.streetAddress(),
    zipCode: faker.address.zipCode('####'),
    city: faker.address.city(),
    numberCoInsured: faker.datatype.number({ min: 0, max: 5 }),
    livingSpace: faker.datatype.number({ min: 30, max: 120 }),
    subType: 'RENT',
    isYouth: false,
  },
}

const TRAVEL_QUOTE = {
  ...HOME_CONTENT_QUOTE,
  data: {
    type: 'NORWEGIAN_TRAVEL',
    numberCoInsured: HOME_CONTENT_QUOTE.data.numberCoInsured,
    isYouth: false,
  },
}

describe('NO Offer Page', () => {
  faker.setLocale('nb_NO')

  it('should display a Norwegian price quote', async () => {
    createQuoteCart({ market: 'NORWAY', locale: 'en_NO' }).then((quoteCartId) =>
      createQuoteBundle({
        quoteCartId,
        quotes: [HOME_CONTENT_QUOTE, TRAVEL_QUOTE],
      }).then(() => {
        cy.visit(`/no-en/new-member/offer/${quoteCartId}`)
        cy.contains('button', 'Accept All Cookies', {
          timeout: 10000,
        }).click()

        cy.contains('button', 'Proceed').click()

        // Checkout
        const phoneNumber = faker.phone.phoneNumber('+47 ### ## ###')
        cy.get('input[name=phoneNumber]').type(`${phoneNumber}{enter}`)

        cy.get('input[name=ssn]').type(`${SSN}{enter}`)
        cy.contains('button', 'Complete purchase').should('be.disabled')
        cy.contains('button', 'Complete purchase')
          .should('not.be.disabled')
          .click()

        // Connect Payment Page
        cy.contains('Welcome to Hedvig,your insurance is now active', {
          timeout: 20000,
        }).should('be.visible')
        // Cypress doesn't really work well with iFrames so we stop here
        // https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
      }),
    )
  })
})
