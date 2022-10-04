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

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText =
      "Nostrud excepteur anim sunt adipisicing eu proident sit tempor labore incididunt laborum officia.";

    cy.tickCallback(
      3000,
      () => {
        cy.typeValue("#firstName", "Flávio Roberto");
        cy.typeValue("#lastName", "Flávio Roberto");
        cy.typeValue("#email", "flavio.roberto@email.com");
        cy.typeValue("#open-text-area", longText, { delay: 0 });
        cy.contains("button", "Enviar").click();
        cy.get(".success").should("be.visible");
      },
      () => cy.get(".success").should("not.be.visible")
    );
  });

  it("exibe e esconte as mensagens de sucesso usando o .invoke", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .invoke("hide")
      .should("not.be.visible");
  });

  it.only("preenche area de texto usando invoke", () => {
    const text = Cypress._.repeat("teste", 20);
    cy.get("#open-text-area").invoke("val", text).should("have.value", text);
  });
});
