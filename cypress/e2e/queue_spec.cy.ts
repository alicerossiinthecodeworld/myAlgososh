import cypress from 'cypress';
import { ElementStates } from "../../src/types/element-states";

const colorMap = new Map();
colorMap.set(ElementStates.Default, '4px solid rgb(0, 50, 255)')
colorMap.set(ElementStates.Changing, '4px solid rgb(210, 82, 225)')
colorMap.set(ElementStates.Modified, '4px solid rgb(127, 224, 81)')

const inputFirstValue = '542';
const inputSecondValue = '867'

const visitQueue = () => {
  cy.visit('/queue');
};
const addValue = (stringValue: string) => {
  cy.get(`[data-cy="queue-input"]`).type(stringValue);
  cy.get(`[data-cy="queue-add-button"]`).click();
}
describe('Очередь работает', () => {
  it('если в инпуте пусто, кнопка добавления недоступна', () => {
    visitQueue()
    cy.get(`[data-cy="queue-input"]`).clear();
    cy.get(`[data-cy="queue-add-button"]`).should('be.disabled');
  }),
    it('правильно добавляются элементы в очередь', () => {
      const inputFirstValue = '123';
      const inputSecondValue = '867'
      visitQueue()
      addValue(inputFirstValue)
      cy.get('[data-cy="queue-element"]').should('contain', inputFirstValue).and('have.length', 1);
      cy.get('[data-cy="queue-element"]').eq(0).find('[data-cy="default"]').should('have.css', 'border', colorMap.get(ElementStates.Default));
      cy.get('[data-cy="head"]').should('be.visible')
      cy.get('[data-cy="tail"]').should('be.visible')
      addValue(inputSecondValue)
      cy.get('[data-cy="queue-element"]').should('contain', inputFirstValue).and('contain', inputSecondValue);
      cy.get('[data-cy="queue-element"]').find('[data-cy="default"]').should('have.css', 'border', colorMap.get(ElementStates.Default)).should('contain', inputFirstValue);
      cy.get('[data-cy="queue-element"]').find('[data-cy="default"]').should('have.css', 'border', colorMap.get(ElementStates.Default)).should('contain', inputSecondValue);;
    }),
    it('правильно удаляются элементы из очереди', () => {
      visitQueue()
      addValue(inputFirstValue)
      addValue(inputSecondValue)
      cy.get('[data-cy="queue-element"]').should('contain', inputFirstValue).and('contain', inputSecondValue);
      cy.get(`[data-cy="queue-delete-button"]`).click()
      cy.get('[data-cy="queue-element"]').should('contain', inputSecondValue).and('not.contain', inputFirstValue).and('have.length', 1);
    }),
    it('работает очистка очереди', () => {
      visitQueue()
      addValue(inputFirstValue)
      addValue(inputSecondValue)
      cy.get(`[data-cy="queue-clear-button"]`).click()
      cy.get('[data-cy="queue-element"]').should('not.contain', inputFirstValue).and('not.contain', inputSecondValue)
    })
})