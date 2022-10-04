Cypress.Commands.add("typeValue", (field, value, obj) => {
  if (obj) cy.get(field).type(value, obj);
  else cy.get(field).type(value);
});

Cypress.Commands.add(
  "tickCallback",
  (time, beforeTickCallback, afterTickCallback) => {
    cy.clock();

    if (beforeTickCallback) beforeTickCallback();

    cy.tick(time);

    if (afterTickCallback) afterTickCallback();
  }
);
