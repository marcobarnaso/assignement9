const customer = require('../commons/data-fakers/customers-faker')

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('SearchForTire', (searchDTO) => {
    cy.get('input[name="s"]').type(`${searchDTO.tire}{enter}`)
    cy.url().should('contain', 'tire')
})

Cypress.Commands.add('SelectAndAddToCart', () => {
    cy.get('h3 a').click()
    cy.get('button[name="add-to-cart"]').click()
    cy.get('span i').click({timeout: 5000})
    cy.url().should('contain', 'cart')
    cy.get('[class="checkout-button button alt wc-forward"]').click()
    cy.url().should('contain', 'checkout')
}) 

Cypress.Commands.add('checkout', (fakeDataDTO) => {
    cy.get('input[name="billing_address_1"]').type(fakeDataDTO.street_address)
    cy.get('input[name="billing_address_2"]').type(fakeDataDTO.aparmentOrSuite)
    cy.get('input[name="billing_city"]').type(fakeDataDTO.city)
    cy.get('span[class="select2-selection select2-selection--single"]').eq(1).type(`${fakeDataDTO.state}{enter}`)
    cy.get('input[name="billing_postcode"]').type(fakeDataDTO.zip_code)
    cy.get('input[name="billing_first_name"]').type(fakeDataDTO.first_name)
    cy.get('input[name="billing_last_name"]').type(fakeDataDTO.last_name)

    
    
    
    cy.get('input[name="billing_phone"]').type(fakeDataDTO.reference1_mobile_number)
    cy.get('input[name="billing_email"]').type(fakeDataDTO.email_1)
})