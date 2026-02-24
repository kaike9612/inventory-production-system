describe('Dashboard', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('should load dashboard', () => {
    cy.contains('Dashboard').should('exist')
  })

})
