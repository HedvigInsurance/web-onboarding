import { faker } from '@faker-js/faker'

const HOME_CONTENT_FLOW = '/no/new-member/home'
const HOME_CONTENT_TRAVEL_FLOW = '/no/new-member/home-travel'

describe('NO Norwegian Embark Flows', () => {
  faker.setLocale('nb_NO')
  const parameters = [HOME_CONTENT_FLOW, HOME_CONTENT_TRAVEL_FLOW]

  parameters.forEach((flowUrl) => {
    it(`should get a Norwegian price quote (${flowUrl})`, () => {
      cy.session(flowUrl, () => false)
      cy.visit(flowUrl)

      // start
      cy.contains('button', 'Godta alle informasjonskapsler').click()
      cy.contains('button', 'Jeg er på flyttefot').click()

      // ownership
      cy.contains('button', 'Jeg eier den').click()

      // address
      const address = faker.address.streetAddress()
      cy.contains('Hva er adressen?').should('be.visible')
      cy.focused().type(address)
      cy.contains('Postnummer')
        .parent()
        .siblings('input[type=text]')
        .type(`${faker.address.zipCode('####')}{enter}`)

      // size
      cy.contains('Hvor mange kvadratmeter').should('be.visible')
      cy.focused().type(
        `${faker.datatype.number({ min: 25, max: 100 })}{enter}`,
      )

      // co-insured
      cy.contains('Hvor mange vil du at forsikringen').click()
      cy.focused().type(`${faker.datatype.number({ min: 0, max: 5 })}{enter}`)

      // name
      cy.contains('Hva heter du?').should('be.visible')
      cy.focused().type(faker.name.firstName())
      cy.contains('Etternavn')
        .parent()
        .siblings('input[type=text]')
        .type(`${faker.name.lastName()}{enter}`)

      // birth-date
      cy.contains('Når er du født?').should('be.visible')
      const pastDate = faker.date.between('1940-01-01', '1990-01-01')
      const date = String(pastDate.getDate()).padStart(2, '0')
      const month = String(pastDate.getMonth() + 1).padStart(2, '0')
      const birthDate = `${date}-${month}-${pastDate.getFullYear()}`
      cy.focused().type(`${birthDate}{enter}`)

      // currently-insured
      cy.contains('button', 'Ja, jeg har innboforsikring').click()

      // current-insurer
      cy.contains('button', 'Fremtind').click()

      // email
      cy.contains('Fyll inn e-postadressen').should('be.visible')
      cy.focused().type(`${faker.internet.email()}{enter}`)

      // offer page
      cy.contains('Prisforslaget ditt').should('be.visible')
      cy.contains(address).should('be.visible')

      cy.get('[data-testid=offer-sidebar]')
        .find('[data-testid=price-breakdown]')
        .contains('Innboforsikring')
        .should('be.visible')

      if (flowUrl === HOME_CONTENT_TRAVEL_FLOW) {
        cy.get('[data-testid=offer-sidebar]')
          .find('[data-testid=price-breakdown]')
          .contains('Reiseforsikring')
          .should('be.visible')

        cy.get('[data-testid=offer-sidebar]')
          .find('[data-testid=price-breakdown-row]')
          .should('have.length', 2)
      } else {
        cy.get('[data-testid=offer-sidebar]')
          .find('[data-testid=price-breakdown-row]')
          .should('have.length', 1)
      }
    })
  })
})
