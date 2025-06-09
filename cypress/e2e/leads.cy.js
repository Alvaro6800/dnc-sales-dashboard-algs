describe('Check if create profile page renders the correct components', () => {
  beforeEach(() => {
    cy.login('alvaro_cypress_test@dnc.com', 'Cypresstest123@')
    cy.visit('http://localhost:5173/leads')
  })

  it('should display leads form', () => {
    cy.get('form').should('be.visible')
    cy.get('input[type="text"]').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="phone"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('should display leads title', () => {
    cy.get('#leads-title').should('be.visible')
  })
})
