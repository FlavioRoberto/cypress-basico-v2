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

  it("seleciona um arquivo utilizado uma fixture ao qual foi dado um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("@sampleFile", {
        action: "drag-drop",
      })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a politica de privacidade abre em outra aba com o clique", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("verifica que a politica de privacidade abre em outra aba removendo o target e clicando no link", () => {
    cy.get("#privacy a")
      .invoke("removeAttr", "target")
      .click()
      .get("#title")
      .contains("CAC TAT - Política de privacidade")
      .should("be.visible");
  });
});
