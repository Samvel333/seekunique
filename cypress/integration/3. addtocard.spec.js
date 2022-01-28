/// <reference types="cypress" />

import { login } from "../functions/functions";

let email = "antiquetest0@mail.ru";
let password = "Seekunique15@";

describe('Check adding items to the cart', () => {
    it('Login', () => {
        login(email, password)
        cy.visit('/contemporary-art/seascape-2/needles-sunset-2')
        cy.contains('Add to Cart').click();
        cy.get('.menu__item').contains('CART').click();
        cy.get('.cart-sidebar').should('be.visible');
        cy.get('.sidebar-cart-item').should('be.visible')
    })
});