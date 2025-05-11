describe("Navigation", () => {
  it("should Navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("Tuesday")
      .click();
  });




});