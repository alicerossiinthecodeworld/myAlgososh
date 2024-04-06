import cypress from 'cypress';
import { ElementStates, colorMap } from "../../src/types/element-states";

const inputFirstValue = '542';
const inputSecondValue = '867'

const visitQueue = () => {
  cy.visit('/queue');
};
const addValue = (stringValue: string) => {
  cy.get('@input').type(stringValue);
  cy.get('@queue-add').click();
}
describe('Очередь работает', () => {
  beforeEach(() => {
    visitQueue()
    cy.get(`[data-cy="queue-input"]`).as('input')
    cy.get('[data-cy="queue-element"]').as('queue')
    cy.get(`[data-cy="queue-add-button"]`).as('queue-add')
  }),
  it('если в инпуте пусто, кнопка добавления недоступна', () => {
    cy.get('@input').clear();
    cy.get('@queue-add').should('be.disabled');
  }),
    it('правильно добавляются элементы в очередь', () => {
      const inputFirstValue = '123';
      const inputSecondValue = '867'
      addValue(inputFirstValue)
      cy.get('@queue').should('contain', inputFirstValue).and('have.length', 1);
      cy.get('@queue').eq(0).find('[data-cy="default"]').should('have.css', 'border', colorMap.get(ElementStates.Default));
      cy.get('[data-cy="head"]').should('be.visible')
      cy.get('[data-cy="tail"]').should('be.visible')
      addValue(inputSecondValue)
      cy.get('@queue').should('contain', inputFirstValue).and('contain', inputSecondValue);
      cy.get('@queue').find('[data-cy="default"]').should('have.css', 'border', colorMap.get(ElementStates.Default)).should('contain', inputFirstValue);
      cy.get('@queue').find('[data-cy="default"]').should('have.css', 'border', colorMap.get(ElementStates.Default)).should('contain', inputSecondValue);;
    }),
    it('правильно удаляются элементы из очереди', () => {
      addValue(inputFirstValue)
      addValue(inputSecondValue)
      cy.get('@queue').should('contain', inputFirstValue).and('contain', inputSecondValue);
      cy.get(`[data-cy="queue-delete-button"]`).click()
      cy.get('@queue').should('contain', inputSecondValue).and('not.contain', inputFirstValue).and('have.length', 1);
    }),
    it('работает очистка очереди', () => {
      addValue(inputFirstValue)
      addValue(inputSecondValue)
      cy.get(`[data-cy="queue-clear-button"]`).click()
      cy.get('@queue').should('not.contain', inputFirstValue).and('not.contain', inputSecondValue)
    })
})