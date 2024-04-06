import cypress from 'cypress';
import { ElementStates, colorMap } from '../../src/types/element-states';
import { reverseStringSteps } from '../../src/components/string/utils';

const visitString = () => {
  cy.visit('/recursion');
};

describe('Строка работает', () => {
  beforeEach(()=>{
    visitString();
    cy.get(`[data-cy="string_input"]`).as('input')
    cy.get(`[data-cy="string_button"]`).as('button')
  })
  it('если в инпуте пусто, кнопка добавления недоступна', () => {
    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  });

  it('строка разворачивается корректно с проверкой каждого шага анимации', () => {
    const testString = 'Разворот';
    cy.get('@input').type(testString);
  
    const steps = reverseStringSteps(testString);
    cy.get('@button').click();
    cy.get(`[data-cy="letters"]`).as('letters')
    steps.forEach((step, stepIndex) => {
      cy.get('@letters').children()
        .each((el, index) => {
          const expectedLetter = step[index].letter;
          const elementState = step[index].state
          const expectedBorderColor = colorMap.get(elementState); 
          cy.wrap(el).find(`[data-cy=${elementState}]`).should('have.text', expectedLetter).should('have.css', 'border', `${expectedBorderColor}`);
        });
    });
  });
});
