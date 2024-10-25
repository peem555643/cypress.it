
describe('Shopee Tests', () => {
  before(() => {
    cy.visit('https://shopee.co.th/');

    // ตรวจสอบและเลือกภาษา
    cy.get('body').then(($body) => {
      if ($body.find('#modal').length > 0) {
        cy.wait(getRandomDelay()).get('#modal').within(() => {
          cy.get('button.shopee-button-outline--primary-reverse').contains('English').click();
        });
      }
    });
  });

  // Scenario A
  it('Scenario A: Log in to Shopee with valid credentials', () => {
    cy.wait(getRandomDelay());
    
    cy.get('input[name="loginKey"]')
      .type(Cypress.env('USERNAME'), { delay: 200 })
      .should('have.value', Cypress.env('USERNAME')); // ตรวจสอบว่าป้อนชื่อผู้ใช้ถูกต้อง

    cy.wait(getRandomDelay());
    
    cy.get('input[name="password"]')
      .type(Cypress.env('PASSWORD'), { delay: 300 })
      .should('have.value', Cypress.env('PASSWORD')); // ตรวจสอบว่าป้อนรหัสผ่านถูกต้อง

    cy.wait(getRandomDelay());
    
    cy.get('button:contains("Login")')
      .should('not.be.disabled')
      .click();

    cy.wait(getRandomDelay());
    
    // ตรวจสอบว่าการล็อกอินสำเร็จ
    cy.get('.ZVb1Bo').should('contain', 'English');
  });

  // Scenario B
  it('Scenario B: Search for keywords "baby toys"', () => {
    cy.wait(getRandomDelay());
    
    cy.get('input.shopee-searchbar-input__input')
      .type('baby toys', { delay: 200 });

    cy.wait(getRandomDelay());
    
    cy.get('button.shopee-searchbar-input__submit').click();
  });

  // Scenario C
  it('Scenario C: Verify search results are displayed', () => {
    cy.wait(getRandomDelay());
    
    cy.get('.shopee-search-item-result__items').should('exist');
  });
});
