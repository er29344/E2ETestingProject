
describe('Add Book Functionality', () => {
    beforeEach(() => {
      cy.visit('index.html');
    });
  
    it('should add a new book', () => {
      cy.get('#bookName').type('Test Book');
      cy.get('#author').type('Test Author');
      cy.get('#isbnno').type('1234567890');
      cy.get('#edition').type('1');
      cy.get('#publicationdate').type('2024-06-15');
      cy.get('#bookurl').type('https://example.com/book');
      cy.get('#fav-toggle').check({ force: true }); 
      cy.get('#read-toggle').check({ force: true }); 
      cy.get('#programming').check({ force: true }); 
  
      cy.get('button[type="submit"]').first().click(); // Ensure clicking the first submit button
  
      cy.get('#tableBody').contains('Test Book').should('exist');
    });
  
    it('should prevent adding a book with duplicate ISBN', () => {
      // Add a book with a specific ISBN
      cy.get('#bookName').type('Duplicate Book');
      cy.get('#author').type('Duplicate Author');
      cy.get('#isbnno').type('1111111111'); // Use the same ISBN
      cy.get('#edition').type('1');
      cy.get('#publicationdate').type('2024-06-15');
      cy.get('#bookurl').type('https://example.com/duplicate-book');
      cy.get('#fiction').check({ force: true }); // Use force option
  
      cy.get('button[type="submit"]').first().click(); // Ensure clicking the first submit button
  
      // Try to add another book with the same ISBN
      cy.get('#bookName').type('Another Duplicate');
      cy.get('#author').type('Another Author');
      cy.get('#isbnno').type('1111111111'); // Same ISBN as the first one
      cy.get('#edition').type('2');
      cy.get('#publicationdate').type('2024-06-16');
      cy.get('#bookurl').type('https://example.com/another-duplicate');
      cy.get('#non-fiction').check({ force: true }); // Use force option
  
      cy.get('button[type="submit"]').first().click(); // Ensure clicking the first submit button
  
      // Verify that an error message is displayed
      cy.contains('Book with this ISBN already exists.').should('exist');
      // Ensure the first book is still in the list
      cy.get('#tableBody').contains('Duplicate Book').should('exist');
      cy.get('#tableBody').contains('Another Duplicate').should('not.exist');
    });
  
  });
  