describe('Products Page', () => {

  beforeEach(() => {
    cy.visit('/products')
  })

  it('should load products page', () => {
    cy.contains('Produtos').should('exist')
  })

  it('should open new product form', () => {
    cy.contains('Novo Produto').click()
    cy.get('form').should('exist')
  })

  it('should create a new product', () => {
    cy.contains('Novo Produto').click()
    cy.get('input[type="text"]').type('Test Product')
    cy.get('input[type="number"]').type('100')
    cy.contains('Criar').click()
    cy.contains('Produto criado com sucesso').should('exist')
  })

  it('should list products', () => {
    cy.contains('Gerencie seus produtos').should('exist')
  })

  it('should display table with products', () => {
    cy.get('table').should('exist')
    cy.contains('Nome').should('exist')
    cy.contains('Preço').should('exist')
    cy.contains('Ações').should('exist')
  })
})
