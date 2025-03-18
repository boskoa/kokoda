describe("Testing Register component", () => {
  beforeEach(function () {
    cy.visit("authentication/register");
  });

  it("shows form", function () {
    cy.get("form").contains("REGISTER");
  });

  it("register button is visible", function () {
    cy.get("button").contains(/register/i);
  });

  it("shows login form after registration", function () {
    cy.get("[name='name']").type("test");
    cy.get("[name='username']").type("test");
    cy.get("[name='email']").type("test@example.com");
    cy.get("[name='password']").type("hahaha");
    cy.get("button")
      .contains(/register/i)
      .click();
    cy.contains("LOGIN");
  });
});
