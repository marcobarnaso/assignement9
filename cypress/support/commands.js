const customer = require('../commons/data-fakers/customers-faker')
const income = require('../commons/data-fakers/income-faker')
const iframe = require('cypress-iframe')

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


Cypress.Commands.add('SearchForTire', function (searchDTO) {
    cy.get('input[name="s"]').type(`${searchDTO.tire}{enter}`)
    cy.url().should('contain', 'tire')
})

Cypress.Commands.add('SelectAndAddToCart', function () {
    cy.get('h3 a').click()
    cy.get('button[name="add-to-cart"]').click()
    cy.get('span i').click()
    cy.url().should('contain', 'cart')
    cy.get('[class="checkout-button button alt wc-forward"]').click()
    cy.url().should('contain', 'checkout')
}) 

Cypress.Commands.add('checkout', function (fakeDataDTO) {
    cy.get('input[name="billing_address_1"]').type(fakeDataDTO.street_address)
    cy.get('input[name="billing_address_2"]').type(fakeDataDTO.aparmentOrSuite)
    cy.get('input[name="billing_city"]').type(fakeDataDTO.city)
    cy.get('span[class="select2-selection select2-selection--single"]').eq(1).type(`${fakeDataDTO.state}{enter}`)
    cy.get('input[name="billing_postcode"]').type(fakeDataDTO.zip_code)
    cy.get('input[name="billing_first_name"]').type(fakeDataDTO.first_name)
    cy.get('input[name="billing_last_name"]').type(fakeDataDTO.last_name)
    cy.get('input[name="billing_phone"]').type(fakeDataDTO.reference1_mobile_number)
    cy.get('input[name="billing_email"]').type(fakeDataDTO.email_1)
    cy.get('input[name="terms"]').click()
    cy.get('button[name="woocommerce_checkout_place_order"]').should('be.enabled').click()
    cy.url().should('contain', 'payment_method=snap')
})

Cypress.Commands.add('applyWithSnap', (fakeDataDTO, iframeBody) => {
    iframeBody().find('input[name="Mobile Phone Number"]').type(fakeDataDTO.reference1_mobile_number)
    iframeBody().find('[data-e2e="steps-welcome_submitbtn"]').should('be.enabled').click()
    iframeBody().find('input[name="Verification Code"]').type('111')
    iframeBody().find('[data-e2e="steps-verify_submitbtn"]').should('be.enabled').click()
    iframeBody().find('[data-e2e="steps-start_submitbtn"]').should('be.enabled').click()
    iframeBody().find('[data-e2e="steps-location_rentbtn"]').click()
    iframeBody().find('[data-e2e="steps-location_onetothreebtn"]').click()
    iframeBody().find('[data-e2e="steps-location_submitbtn"]').should('be.enabled').click()
    iframeBody().find('[class="mat-card-content"]').eq(0).click()
    iframeBody().find('[data-e2e="steps-income_fulltimebtn"]').click()

})

Cypress.Commands.add('fillIncome', (fakeIncomeDTO, iframeBody) => {
    iframeBody().find('[data-e2e="steps-income_jobTitle"]').type(fakeIncomeDTO.employer_name)
    iframeBody().find('[data-e2e="steps-income"]').type(fakeIncomeDTO.income_amt)
    iframeBody().find('[data-e2e="steps-income_payweeklybtn"]').click()
    iframeBody().find('[data-e2e="steps-income_paywednesdaybtn"]').click()
    iframeBody().find('[data-e2e="steps-income_submitbtn"]').should('be.enabled').click()
})

Cypress.Commands.add('identityvalidation', (fakeDataDTO, iframeBody) => {
    iframeBody().find('input[name="Date of Birth"]').type(fakeDataDTO.birth_dt)
    iframeBody().find('input[name="Driver License Number"]').type(fakeDataDTO.drivers_license_numb)
    iframeBody().find('input[name="Social Security Number or ITIN"]').type(fakeDataDTO.social_security_number)
    iframeBody().find('[data-e2e="steps-identity_submitbtn"]').should('be.enabled').click()
})

Cypress.Commands.add('bankingInformation', (bankingDTO, iframeBody) => {
    iframeBody().find('input[name="Bank Routing Number"]').type(bankingDTO.routing)
    iframeBody().find('input[name="Checking Account Number"]').type(bankingDTO.account)
    iframeBody().find('[data-e2e="steps-banking_directdeposityesbtn"]').click()
    iframeBody().find('[data-e2e="steps-banking_submitbtn"]').should('be.enabled').click()
})

Cypress.Commands.add('reviewApplication', (iframeBody) => {
    iframeBody().find('[data-e2e="steps-review_termsandconditions"]').click()
    iframeBody().find('[name="submitBtn"]').should('be.enabled').click()
    iframeBody().find('[data-e2e="smsOptYes"]').click()
    //iframeBody().find('[class="snap-heading-4 mb-2"]').should('contain', 'approved') Woocommerce takes too long to show the approval page
})