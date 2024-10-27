describe("TodoList", () => {
    it("addTodo", () => {
        cy.visit("http://localhost:3000/")
        cy.get('[data-cy = form_input]')
            .type('Написать e2e тест{enter}')
        cy.get('[data-cy = listItem]').should('have.length', 4)
    })

    it("removeTodo", () => {
        cy.visit("http://localhost:3000/")
        cy.get('[data-cy = removeTodo]').first().click()
        cy.get('[data-cy = listItem]').should('have.length', 2)
    })

    it("changeChecked", () => {
        cy.visit("http://localhost:3000/")
        cy.get('[data-cy = changeCheck]').first().click()
        cy.get('[data-cy = todoText]').first().should('have.css', "text-decoration", "line-through solid rgb(158, 120, 207)")
    })

    it("showActiveTOdo", () => {
        cy.visit("http://localhost:3000/")
        cy.get('[data-cy = showActiveTodos]').click()
        cy.get('[data-cy = listItem]').should('have.length', 2)
    })

    it("clearTodos", () => {
        cy.visit("http://localhost:3000/")
        cy.get('[data-cy = clearTodos]').click()
        cy.get('[data-cy = todoText]').should('have.css', "text-decoration", "none solid rgb(158, 120, 207)")
    })
})