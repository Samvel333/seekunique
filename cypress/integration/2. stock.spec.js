/// <reference types="cypress" />

import { noDuplicate } from "../functions/functions";
import { getPage, getStocks } from "../functions/functions";

describe('', () => {
    it('should visit stock page', () => {
        // Visiting to stock page
        cy.visit('/stock');
        // Confirm that element of dashboard is visible, dashboard is loaded
        cy.get('.items-count').should('be.visible')
    });


    it('Check sorting by price high-low', () => {
        // selecting 'high-low' from selector
        cy.get('#sort').select('price_desc').should('have.value', 'price_desc')
        // waiting to load selected page
        cy.wait(2000)

        // Get prices array and confirm that it's sorted
        getStocks().find('.artist__price').then($price => {
            const pricesArray = Cypress._.map($price, (p) => p.innerText) // get prices array
            const map = pricesArray.map(el => el.substring(1)) // remove symbol of valute from price
            const nums = map.map(el => el.replace(',', '')) // 
            cy.log(nums.join(', '))
            const onlyNums = nums.map(el => el.replace(/[^0-9]/g, '')) // remove text items from array for sorting
            const numbers = onlyNums.filter(el => el !== '') // remove empty elems of array
            cy.log(numbers.join(', '))
            //sort array from high to low
            const sorted = numbers.sort(function (a, b) {
                return b - a
            })
            // Confirm, that prices are sorted by "High-Low"
            expect(sorted).to.deep.equal(numbers)
        })
        //checking Duplication of stocks after sorting
        noDuplicate()
    });

    it('Check sorting by prices Low to High', () => {
        //Similat to testcase of High-Low, with another sorting and selector
        cy.get('#sort').select('price_asc').should('have.value', 'price_asc')
        // waiting to load selected page
        cy.wait(2000)

        // Get prices array and confirm that it's sorted
        getStocks().find('.artist__price').then($price => {
            const pricesArray = Cypress._.map($price, (p) => p.innerText) // get prices array
            const map = pricesArray.map(el => el.substring(1)) // remove symbol of valute from price
            const nums = map.map(el => el.replace(',', '')) // 
            cy.log(nums.join(', '))
            const onlyNums = nums.map(el => el.replace(/[^0-9]/g, '')) // remove text items from array for sorting
            const numbers = onlyNums.filter(el => el !== '') // remove empty elems of array
            cy.log(numbers.join(', '))
            //sort array from Low to High
            const sorted = numbers.sort(function (a, b) {
                return a - b
            })
            // Confirm, that prices are sorted by "Low-High"
            expect(sorted).to.deep.equal(numbers)
        })

        //checking Duplication of stocks after sorting
        noDuplicate()
    });
    it('Check Pagination work', () => {

        // 1st page
        getPage()
            .should('have.text', '1');
        getStocks().should('have.length', 24)

        //2nd page
        cy.scrollTo(0, 4000);
        getPage().should('have.text', 2)
        getStocks().should('have.length', 48)

    })
});

