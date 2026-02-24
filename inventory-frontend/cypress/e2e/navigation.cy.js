describe('Navigation', () => {

  it('should navigate between pages', () => {
    cy.visit('/')
    
    cy.contains('Produtos').click()
    cy.url().should('include', '/products')
    
    cy.contains('Matérias-Primas').click()
    cy.url().should('include', '/raw-materials')
  })

})
