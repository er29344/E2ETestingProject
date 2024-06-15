/// <reference types="Cypress" />

describe('Edit Book Functionality', () => {
    beforeEach(() => {
      cy.visit('index.html');
      // Add a book to edit
      cy.get('#bookName').type('Book to Edit');
      cy.get('#author').type('Author A');
      cy.get('#isbnno').type('1111111111');
      cy.get('#edition').type('1');
      cy.get('#publicationdate').type('2024-06-15');
      cy.get('#bookurl').type('https://example.com/book1');
      cy.get('#programming').check({ force: true });
      cy.get('button[type="submit"]').first().click(); 
    });
  
    it('should edit an existing book', () => {
      cy.contains('Book to Edit').parent().within(() => {
        cy.get('td').eq(8).find('button').first().click(); // Ensure clicking the first edit button
      });
  
      cy.get('#author').clear().type('New Author Name');
      cy.get('#isbnno').clear().type('2222222222');
      cy.get('#edition').clear().type('2');
      cy.get('#publicationdate').clear().type('2025-06-15');
      cy.get('#bookurl').clear().type('https://example.com/edited-book');
      cy.get('#fiction').check({ force: true });
  
      cy.get('button[type="submit"]').first().click(); 
  
      cy.get('#tableBody').contains('Book to Edit').should('not.exist');
      cy.get('#tableBody').contains('New Author Name').should('exist');
    });
  
    it('should prevent editing to a duplicate ISBN', () => {
      // Add another book with a different ISBN
      cy.get('#bookName').type('Second Book');
      cy.get('#author').type('Author B');
      cy.get('#isbnno').type('2222222222');
      cy.get('#edition').type('1');
      cy.get('#publicationdate').type('2024-06-16');
      cy.get('#bookurl').type('https://example.com/book2');
      cy.get('#non-fiction').check({ force: true });
      cy.get('button[type="submit"]').first().click();
  
      // Edit the first book to have the same ISBN as the second book
      cy.contains('Book to Edit').parent().within(() => {
        cy.get('td').eq(8).find('button').first().click(); 
      });
  
      cy.get('#isbnno').clear().type('2222222222'); // Same ISBN as the second book
  
      cy.get('button[type="submit"]').first().click(); 
  
      // Verify that an error message is displayed
      cy.contains('Book with this ISBN already exists.').should('exist');
      // Ensure the first book is still in the list
      cy.get('#tableBody').contains('Book to Edit').should('exist');
      cy.get('#tableBody').contains('Second Book').should('exist');
    });
  
  });
  