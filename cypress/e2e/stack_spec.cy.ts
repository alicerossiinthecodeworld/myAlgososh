import cypress from 'cypress';
import { ElementStates } from "../../src/types/element-states";

const colorMap = new Map();
colorMap.set(ElementStates.Default, '4px solid rgb(0, 50, 255)')
colorMap.set(ElementStates.Changing, '4px solid rgb(210, 82, 225)')
colorMap.set(ElementStates.Modified, '4px solid rgb(127, 224, 81)')

const inputFirstValue = '123';
const inputSecondValue = '867'

const visitStack = () => {
  cy.visit('/stack');
};
const addValue = (stringValue: string) => {
  cy.get(`[data-cy="stack-input"]`).type(stringValue);
  cy.get(`[data-cy="stack-add-button"]`).click();
}
describe('Cтек работает', () => {
  it('если в инпуте пусто, кнопка добавления недоступна', () => {
    visitStack()
    cy.get(`[data-cy="stack-input"]`).clear();
    cy.get(`[data-cy="stack-add-button"]`).should('be.disabled');
  }),
    it('правильно добавляются элементы в стек', () => {
      const inputFirstValue = '123';
      const inputSecondValue = '867'
      visitStack()
      addValue(inputFirstValue)
      cy.get('[data-cy="stack-element"]').should('contain', inputFirstValue);
      cy.get('[data-cy="stack-element"]').eq(0).find('[data-cy="changing"]').should('have.css', 'border', colorMap.get(ElementStates.Changing));
      addValue(inputSecondValue)
      cy.get('[data-cy="stack-element"]').should('contain', inputFirstValue).and('contain', inputSecondValue);
      cy.get('[data-cy="stack-element"]').eq(0).find('[data-cy="default"]').should('have.css', 'border', colorMap.get(ElementStates.Default)).should('contain', inputFirstValue);
      cy.get('[data-cy="stack-element"]').eq(0).find('[data-cy="changing"]').should('have.css', 'border', colorMap.get(ElementStates.Changing)).should('contain', inputSecondValue);;
    }),
    it('правильно удаляются элементы из стека', () => {
      visitStack()
      addValue(inputFirstValue)
      addValue(inputSecondValue)
      cy.get('[data-cy="stack-element"]').should('contain', inputFirstValue).and('contain', inputSecondValue);
      cy.get('[data-cy="stack-element"]').eq(0).find('[data-cy="default"]').should('have.css', 'border', colorMap.get(ElementStates.Default)).should('contain', inputFirstValue);
      cy.get('[data-cy="stack-element"]').eq(0).find('[data-cy="changing"]').should('have.css', 'border', colorMap.get(ElementStates.Changing)).should('contain', inputSecondValue);
      cy.get(`[data-cy="stack-delete-button"]`).click()
      cy.get('[data-cy="stack-element"]').should('contain', inputFirstValue).and('not.contain', inputSecondValue).and('have.length', 1);
    }),
    it('работает очистка стека', () => {
      visitStack()
      addValue(inputFirstValue)
      addValue(inputSecondValue)
      cy.get(`[data-cy="stack-clear-button"]`).click()
      cy.get('[data-cy="stack-element"]').should('not.contain', inputFirstValue).and('not.contain', inputSecondValue)
    })
})