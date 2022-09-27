/// <reference types="cypress" />

describe("CAT TAT Testes", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("seleciona um arquivo da pasta fixture", () => {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", {
        action: "drag-drop",
      })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
});
