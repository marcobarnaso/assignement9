/// <reference types="Cypress"/>
const customer = require('../commons/data-fakers/customers-faker').customer('RTO')

context('Test shop with Snap in Woocommerce', () => {

    before(function () {
        cy.fixture('search-products').as('search')
    })

    describe('Woo-000 | Test shop and apply with Snap', () => {
        Cypress.Cookies.defaults({
            preserve: /^wp_woocommerce_session_.*$/
        });

        it('Should navigate WooCommerce', function () {
            cy.visit('/')
            cy.url().should('contain', 'woo-commerce')
        })

        it('Should search for a product', function () {
            cy.SearchForTire(this.search)
        })

        it('Add product to cart', function () {
            cy.SelectAndAddToCart()
        })

        it('Should proceed to checkout', function () {
            cy.checkout(customer)
        })

        // it('Should submit the application', function () {
        //     cy.server()
        //     cy.route('PUT', 'api/v1/applications/*/submitApplication').as('submit')
        //     cy.SubmitApplication()
        //     cy.wait('@submit').its('status').should('eq', 200)
        // })

        // it('Should assert the results page', function () {
        //     cy.AssertResultsPage()
        // })
    })
}) 