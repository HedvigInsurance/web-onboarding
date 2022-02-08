import { faker } from '@faker-js/faker'

const HOME_CONTENT_FLOW = '/no-en/new-member/home'
const HOME_CONTENT_TRAVEL_FLOW = '/no-en/new-member/home-travel'

describe('NO English Embark Flows', () => {
  faker.setLocale('nb_NO')
  const parameters = [HOME_CONTENT_FLOW, HOME_CONTENT_TRAVEL_FLOW]

  parameters.forEach((flowUrl) => {
    it(`should get a Norwegian price quote (${flowUrl})`, () => {
      cy.session(flowUrl, () => false)
      cy.visit(flowUrl)

      // start
      cy.contains('button', 'Accept All Cookies').click()
      cy.contains('button', 'My current apartment').click()

      // ownership
      cy.contains('button', 'I rent it').click()

      // address
      const address = faker.address.streetAddress()
      cy.contains("What's the address?").should('be.visible')
      cy.focused().type(address)
      cy.contains('Postal code')
        .parent()
        .siblings('input[type=text]')
        .type(`${faker.address.zipCode('####')}{enter}`)

      // size
      cy.contains('How many square meters is it?').should('be.visible')
      cy.focused().type(
        `${faker.datatype.number({ min: 25, max: 100 })}{enter}`,
      )

      // co-insured
      cy.contains('How many others would you like to be covered', {
        timeout: 5000,
      }).click()
      cy.focused().type(`${faker.datatype.number({ min: 0, max: 5 })}{enter}`)

      // name
      cy.contains("What's your name?").should('be.visible')
      cy.focused().type(faker.name.firstName())
      cy.contains('Surname')
        .parent()
        .siblings('input[type=text]')
        .type(`${faker.name.lastName()}{enter}`)

      // birth-date
      cy.contains("What's your birth date?").should('be.visible')
      const pastDate = faker.date.between('1940-01-01', '1990-01-01')
      const date = String(pastDate.getDate()).padStart(2, '0')
      const month = String(pastDate.getMonth() + 1).padStart(2, '0')
      const birthDate = `${date}-${month}-${pastDate.getFullYear()}`
      cy.focused().type(`${birthDate}{enter}`)

      // currently-insured
      const buttonLabel =
        flowUrl === HOME_CONTENT_FLOW
          ? 'Yes, I have contents insurance'
          : 'Yes, by a contents insurance'
      cy.contains('button', buttonLabel).click()

      // current-insurer
      cy.contains('button', 'Fremtind').click()

      // email
      cy.contains('Enter you email address').should('be.visible')
      cy.focused().type(`${faker.internet.email()}{enter}`)

      // offer page
      cy.contains('Your price quote').should('be.visible')
      cy.contains(address).should('be.visible')
    })
  })
})
