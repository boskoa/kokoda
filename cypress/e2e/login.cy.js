describe("Testing Login component", () => {
  beforeEach(function () {
    cy.visit("authentication/login");
  });

  it("shows form at start", function () {
    cy.get("form").contains("LOGIN");
  });

  it("login button is visible", function () {
    cy.get("button").contains("Log in");
  });

  it("incorrect login fails", function () {
    cy.get("[name='username']").type("rest");
    cy.get("[name='password']").type("vozinka");
    cy.contains(/log in/i).click();
    cy.contains(/failed/i);
  });
});
