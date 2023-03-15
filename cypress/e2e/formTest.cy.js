describe("form", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("pizza name check", () => {
    cy.visit("/pizza");
    cy.get('[data-cy="name-input"]')
      .type("Italyan")
      .should("have.value", "Italyan")
      .type(
        "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}"
      )
      .should("have.class", "is-invalid")
      .type("{backspace}")
      .should("have.class", "is-invalid")
      .type("Italyan")
      .should("not.have.class", "is-invalid");
  });
});
