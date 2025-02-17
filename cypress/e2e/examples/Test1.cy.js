describe("Course Navigation and Section Toggle", () => {
  it("Logs in, searches for a course, enters it, and toggles a section", () => {
    cy.visit("https://nastava.efsa.unsa.ba");
    cy.get("#username").type("m6066");

    cy.get("#password").type("xxxxx");

    cy.get("#loginbtn").click();

    cy.get('input[name="q"]').should("be.visible").type("Osnove");
    cy.get(".btn.btn-primary.search-icon").click();
    cy.contains("EAM101 - Osnove ekonomije").click();

    cy.get("#collapssesection0").then(($el) => {
      const isExpanded = $el.attr("aria-expanded") === "true";

      if (isExpanded) {
        cy.get(
          "#module-82110 > .activity-item > .activity-basis > .flex-md-row > .activity-instance > .activitytitle > .media-body > .activityname > .aalink"
        )
          .should("be.visible")
          .click();

        cy.get(".breadcrumb > :nth-child(1) > a").should("be.visible").click();
        cy.wait(1000);
        cy.get("#collapssesection0")
          .should("be.visible")
          .then(($newEl) => {
            cy.wrap($newEl).click();
          });

        cy.wait(1000);
        cy.get("#collapssesection0").should(
          "have.attr",
          "aria-expanded",
          "false"
        );
      } else {
        cy.wait(1000);
        cy.wrap($el).click();
        cy.get("#collapssesection0").should(
          "have.attr",
          "aria-expanded",
          "true"
        );
      }
    });
  });
});
