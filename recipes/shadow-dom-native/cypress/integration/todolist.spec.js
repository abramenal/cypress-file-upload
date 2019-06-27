describe('Todo List', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders list correctly', () => {
    cy.document({ log: false })
      .shadowGet('todo-list todo-list-item')
      .its('length')
      .should('eq', 2);
  });

  it('displays each item title correctly', () => {
    cy.document({ log: false })
      .shadowGet('todo-list todo-list-item')
      .shadowFirst()
      .shadowContains('Read some books');

    cy.document({ log: false })
      .shadowGet('todo-list todo-list-item')
      .shadowLast()
      .shadowContains('Buy some serials');
  });

  it('removes list item when clicking X (remove) button', () => {
    cy.document({ log: false })
      .shadowGet('todo-list todo-list-item')
      .shadowFirst()
      .shadowFind('button.destroy')
      .shadowTrigger('click');

    cy.document({ log: false })
      .shadowGet('todo-list todo-list-item')
      .its('length')
      .should('eq', 1);
  });
});
