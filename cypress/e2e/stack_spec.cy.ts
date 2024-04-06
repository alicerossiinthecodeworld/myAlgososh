import cypress from 'cypress';
import { ElementStates, colorMap } from "../../src/types/element-states";

const inputFirstValue = '123';
const inputSecondValue = '867'

const visitStack = () => {
  cy.visit('/stack');
};
const addValue = (stringValue: string) => {
  cy.get('@input').type(stringValue);
  cy.get('@stack-add').click();
}
describe('Cтек работает', () => {
  beforeEach(() => {
    visitStack()
    cy.get(`[data-cy="stack-input"]`).as('input')
    cy.get('[data-cy="stack-element"]').as('stack')
    cy.get(`[data-cy="stack-add-button"]`).as('stack-add')
  }),
    it('если в инпуте пусто, кнопка добавления недоступна', () => {
      cy.get('@input').clear();
      cy.get('@stack-add').should('be.disabled');
    }),
    it('правильно добавляются элементы в стек', () => {
      const inputFirstValue = '123';
      const inputSecondValue = '867'
      addValue(inputFirstValue)
      cy.get('@stack').should('contain', inputFirstValue);
      cy.get('@stack').eq(0).find('[data-cy="changing"]').should('have.css', 'border', colorMap.get(ElementStates.Changing));
      addValue(inputSecondValue)
      cy.get('@stack').should('contain', inputFirstValue).and('contain', inputSecondValue);
      cy.get('@stack').eq(0).find('[data-cy="default"]').should('have.css', 'border', colorMap.get(ElementStates.Default)).should('contain', inputFirstValue);
      cy.get('@stack').eq(0).find('[data-cy="changing"]').should('have.css', 'border', colorMap.get(ElementStates.Changing)).should('contain', inputSecondValue);;
    }),
    it('правильно удаляются элементы из стека', () => {

      addValue(inputFirstValue)
      addValue(inputSecondValue)
      cy.get('@stack').should('contain', inputFirstValue).and('contain', inputSecondValue);
      cy.get('@stack').eq(0).find('[data-cy="default"]').should('have.css', 'border', colorMap.get(ElementStates.Default)).should('contain', inputFirstValue);
      cy.get('@stack').eq(0).find('[data-cy="changing"]').should('have.css', 'border', colorMap.get(ElementStates.Changing)).should('contain', inputSecondValue);
      cy.get(`[data-cy="stack-delete-button"]`).click()
      cy.get('@stack').should('contain', inputFirstValue).and('not.contain', inputSecondValue).and('have.length', 1);
    }),
    it('работает очистка стека', () => {
      addValue(inputFirstValue)
      addValue(inputSecondValue)
      cy.get(`[data-cy="stack-clear-button"]`).click()
      cy.get('@stack').should('not.contain', inputFirstValue).and('not.contain', inputSecondValue)
    })
})