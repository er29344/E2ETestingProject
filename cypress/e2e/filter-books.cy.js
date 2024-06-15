
describe('Edit Book Functionality', () => {
  beforeEach(() => {
    cy.visit('index.html');

    // Add a book for editing tests
    cy.get('#bookName').type('Book to Edit');
    cy.get('#author').type('Initial Author');
    cy.get('#isbnno').type('1111111111');
    cy.get('#edition').type('1');
    cy.get('#publicationdate').type('2024-06-15');
    cy.get('#bookurl').type('https://example.com/book1');
    cy.get('#programming').check();
    cy.get('form').submit(); 
  });

  it('should edit an existing book', () => {
    // Find the added book and click edit
    cy.contains('Book to Edit').parent().within(() => {
      cy.get('td').eq(8).find('button').eq(0).click(); // Assuming edit button is the first button
    });

    // Edit the book details
    cy.get('#author').clear().type('New Author Name');
    cy.get('#isbnno').clear().type('1112223334');
    cy.get('#edition').clear().type('3');
    cy.get('#publicationdate').clear().type('2022-06-15');
    cy.get('#bookurl').clear().type('https://example.com/edited-book');
    cy.get('#science').check(); // Change type to Science

    cy.get('form').submit(); 

    // Check if changes are reflected in the table
    cy.get('#tableBody').contains('Book to Edit').should('not.exist');
    cy.get('#tableBody').contains('New Author Name').should('exist');
  });

  it('should remove a book', () => {
    // Add a book first
    cy.get('#bookName').type('Book to Remove');
    cy.get('#author').type('Author to Remove');
    cy.get('#isbnno').type('1357924680');
    cy.get('#edition').type('3');
    cy.get('#publicationdate').type('2023-06-15');
    cy.get('#bookurl').type('https://example.com/book3');
    cy.get('#non-fiction').check();
    cy.get('form').submit(); 

    // Find the added book and click remove
    cy.contains('Book to Remove').parent().within(() => {
      cy.get('td').eq(9).find('button').eq(1).click(); // Assuming remove button is the second button
    });

    // Check if the book is removed from the table
    cy.get('#tableBody').contains('Book to Remove').should('not.exist');
  });
});
