describe('Raw Materials Page', () => {

  beforeEach(() => {
    cy.visit('/raw-materials')
  })

  it('should load raw materials page', () => {
    cy.contains('Matérias-Primas').should('exist')
  })

})
