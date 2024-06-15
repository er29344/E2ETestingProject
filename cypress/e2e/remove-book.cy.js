
describe('Remove Book Functionality', () => {
  beforeEach(() => {
    cy.visit('index.html');
    // Add a book to remove
    cy.get('#bookName').type('Book to Remove');
    cy.get('#author').type('Author B');
    cy.get('#isbnno').type('2222222222');
    cy.get('#edition').type('2');
    cy.get('#publicationdate').type('2024-06-16');
    cy.get('#bookurl').type('https://example.com/book2');
    cy.get('#fiction').check();
    cy.get('button[type="submit"]').first().click();
  });

  it('should remove a book', () => {
    cy.contains('Book to Remove').parent().within(() => {
      cy.get('td').eq(9).find('button').eq(1).click(); // Assuming remove button is the second button
    });

    // Assert that the book is removed from the table
    cy.contains('Book to Remove').should('not.exist');
  });

  it('should confirm book removal', () => {
    cy.contains('Book to Remove').parent().within(() => {
      cy.get('td').eq(9).find('button').eq(1).click(); 
    });

    // Confirm the removal in the alert
    cy.get('.swal2-confirm').click();

    // Assert that the book is removed from the table
    cy.contains('Book to Remove').should('not.exist');

    // Ensure alert is closed
    cy.get('.swal2-popup').should('not.exist');
  });

});
