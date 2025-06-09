describe('Check if create profile page renders the correct components', () => {
  beforeEach(() => {
    cy.login('alvaro_cypress_test@dnc.com', 'Cypresstest123@')
    cy.visit('http://localhost:5173/home')
  })

  it('should display total sales', () => {
    cy.get('#total-sales').should('be.visible')
  })

  it('should display month goals', () => {
    cy.get('#month-goals').should('be.visible')
  })

  it('should display total leads', () => {
    cy.get('#total-leads').should('be.visible')
  })

  it('should display month sales charts', () => {
    cy.get('#month-sales-chart').should('be.visible')
  })

  it('should display sales stars', () => {
    cy.get('#sales-stars').should('be.visible')
  })

  it('should display news', () => {
    cy.get('#news').should('be.visible')
  })

  it('should display year sales chart', () => {
    cy.get('#year-sales-chart').should('be.visible')
  })
})
