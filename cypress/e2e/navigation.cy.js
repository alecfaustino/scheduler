describe("Navigation", () => {
  it("should Navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should('have.class', 'day-list__item--selected');
  });

});