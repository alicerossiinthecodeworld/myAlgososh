import cypress from 'cypress';
import { ElementStates } from '../../src/types/element-states';
import { reverseStringSteps } from '../../src/components/string/utils';

const colorMap = new Map();
colorMap.set(ElementStates.Default, 'rgb(0, 50, 255)')
colorMap.set(ElementStates.Changing, 'rgb(210, 82, 225)')
colorMap.set(ElementStates.Modified, 'rgb(127, 224, 81)')

const visitString = () => {
  cy.visit('/recursion');
};

describe('Строка работает', () => {
  it('если в инпуте пусто, кнопка добавления недоступна', () => {
    visitString();
    cy.get(`[data-cy="string_input"]`).clear();
    cy.get(`[data-cy="string_button"]`).should('be.disabled');
  });

  it('строка разворачивается корректно с проверкой каждого шага анимации', () => {
    visitString();
    const testString = 'Пидорас';
    cy.get(`[data-cy="string_input"]`).type(testString);
  
    const steps = reverseStringSteps(testString);
    cy.get(`[data-cy="string_button"]`).click();
  
    steps.forEach((step, stepIndex) => {
      cy.get(`[data-cy="letters"]`).children()
        .each((el, index) => {
          const expectedLetter = step[index].letter;
          const elementState = step[index].state
          const expectedBorderColor = colorMap.get(elementState); 
          cy.wrap(el).find(`[data-cy=${elementState}]`).should('have.text', expectedLetter).should('have.css', 'border', `4px solid ${expectedBorderColor}`);
        });
    });
  });
  
});
