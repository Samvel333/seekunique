export function login(email, password){
    cy.visit('/sign-in');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#submitBtn').click();
}

export function getStocks() {
    return cy.get('.col-12').find(".row").children()
}

export function getPage() {
    return cy.get('#count')
}

export function noDuplicate(){
    cy.get('.row').children().find('.artist__title').then($title => {
        const titlesArray = Cypress._.map($title, (t) => t.innerText) // get prices array
        const set = Array.from(new Set(titlesArray))
        expect(set).to.deep.equal(titlesArray)
    })
}