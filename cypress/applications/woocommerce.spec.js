/// <reference types="Cypress"/>
const customer = require('../commons/data-fakers/customers-faker').customer('RTO')
const iframe = require('cypress-iframe')

describe('Test shop with Snap in Woocommerce', () => {
    Cypress.Cookies.defaults({
        preserve: /^wp_woocommerce_session_.*$/
    });

    before(function () {
        cy.fixture('address-validation').as('addressValidation')
        cy.fixture('search-products').as('search')
        cy.fixture('incomeInformation').as('incomeInfo')
        cy.fixture('banking-information').as('bankingInfo')
    })

    describe('Woo-000 | Test shop and apply with Snap', function () {

        it('Should navigate WooCommerce', function () {
            cy.visit('/')
            cy.url().should('contain', 'woo-commerce')
        })

        it('Should search for a product', function () {
            cy.SearchForTire(this.search)
        })

        it('Should Add product to cart', function () {
            cy.SelectAndAddToCart()
        })

        it('Should proceed to checkout', function () {
            cy.checkout(customer)
        })

        it('Should fill the Snap Apply form', function () {
            const fakeIncome = require('../commons/data-fakers/income-faker').income(this.incomeInfo.incomeType.fullTimeJob, this.incomeInfo.paidFrequency.weekly);
            cy.frameLoaded()
            cy.iframe().find('[data-e2e="headerLogo"]').should('be.visible')
            cy.enter().then(function (iframeBody) {
                cy.applyWithSnap(customer, iframeBody)
                cy.fillIncome(fakeIncome, iframeBody)
                cy.identityvalidation(customer, iframeBody)
                cy.bankingInformation(this.bankingInfo, iframeBody)
                cy.reviewApplication(iframeBody)
            })

        })

    })
}) 