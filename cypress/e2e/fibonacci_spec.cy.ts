import cypress from "cypress"
import {SHORT_DELAY_IN_MS} from '../../src/constants/delays'
import {calculateFibonacci} from '../../src/components/fibonacci-page/utils'
const visitFibonacciPage = () =>{
  cy.visit('/fibonacci')
}

describe('Фибоначчи работает', ()=>{
  it(`если в инпуте пусто, то кнопка добавления недоступна`, () => {
    visitFibonacciPage()
    cy.get(`[data-cy="fibonacci-input"]`).clear();
    cy.get(`[data-cy="fibonacci-button"]`).should('be.disabled');
  }),
  it(`числа генерируются корректно`, () => {
    const inputNumber = 10;
    visitFibonacciPage();
    cy.get(`[data-cy="fibonacci-input"]`).type(String(inputNumber));
    cy.get(`[data-cy="fibonacci-button"]`).should('not.be.disabled').click();
    let fibSequence: number[] = [1, 1];
    for (let i = 3; i <= inputNumber; i++) {
      fibSequence.push(calculateFibonacci(i));
    }
  
    cy.wrap(fibSequence).each((num, index) => {
      cy.get(`[data-cy="fibonacci-numbers"]`).children().eq(index).should('contain', num);
    });
  });
})