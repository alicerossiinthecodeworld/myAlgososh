import cypress from 'cypress';
import { ElementStates } from "../../src/types/element-states";

const visitList= () => {
  cy.visit('/list');
};

const typeIndex =(indexValue:string) => {
  cy.get(`[data-cy="list-index-input"]`).type(indexValue);
}
const typeInput =(inputValue:string) => {
  cy.get(`[data-cy="list-value-input"]`).type(inputValue);
}
const addToHead=(inputValue:string) =>{
  typeInput(inputValue)
  cy.get(`[data-cy="list-add-head-button"]`).should('not.be.disabled').click();
}
const addToTail=(inputValue:string) =>{
  typeInput(inputValue)
  cy.get(`[data-cy="list-add-tail-button"]`).should('not.be.disabled').click();
}

describe('Список работает', () => {
  it('если в инпуте пусто, кнопки добавления недоступны', () => {
    visitList()
    cy.get(`[data-cy="list-value-input"]`).clear();
    cy.get(`[data-cy="list-add-head-button"]`).should('be.disabled');
    cy.get(`[data-cy="list-add-tail-button"]`).should('be.disabled');
    cy.get(`[data-cy="add-by-index-button"]`).should('be.disabled');
  })
  it('если в индексе пусто, кнопки добавления и удаления по индексу недоступны', () => {
    visitList()
    cy.get(`[data-cy="list-index-input"]`).clear();
    cy.get(`[data-cy="add-by-index-button"]`).should('be.disabled');
    cy.get(`[data-cy="delete-by-index-button"]`).should('be.disabled');
  }),
  it('дефолтный список отрисован', () => {
    visitList()
    cy.get(`[data-cy="list"]`).should("contain", "0").should("contain", "34").should("contain", "8").should("contain", "1")
  }),
  it('элемент добавляется в head', () =>{
    visitList()
    const inputValue = "1235"
    addToHead(inputValue)
    cy.get(`[data-cy="index_0"]`).should('contain', inputValue)
    const changedinputValue = "3235"
    addToHead(changedinputValue)
    cy.get(`[data-cy="index_0"]`).should('contain', changedinputValue).should('not.contain', inputValue )
  }),
  it('элемент добавляется в tail', () =>{
    visitList()
    const inputValue = "1235"
    addToTail(inputValue)
    cy.get(`[data-cy="index_4"]`).should('contain', inputValue)
    const changedinputValue = "3235"
    addToTail(changedinputValue)
    cy.get(`[data-cy="index_5"]`).should('contain', changedinputValue).should('not.contain', inputValue )
  }),
  it('элемент добавляется по индексу', () =>{
    visitList()
    const inputValue = "1235"
    const indexValue = '3'
    typeInput(inputValue)
    typeIndex(indexValue)
    cy.get(`[data-cy="add-by-index-button"]`).should('not.be.disabled').click();
    cy.get(`[data-cy="index_${indexValue}"]`).should('contain', inputValue)
    const changedInputValue = "3235"
    typeInput(changedInputValue)
    typeIndex(indexValue)
    cy.get(`[data-cy="add-by-index-button"]`).should('not.be.disabled').click();
    cy.get(`[data-cy="index_${indexValue}"]`).should('contain', changedInputValue).should('not.contain', inputValue )
  }),
  it('элемент удаляется из head', () =>{
    visitList()
    cy.get(`[data-cy="list"]`).should("contain", "0").should("contain", "34").should("contain", "8").should("contain", "1")
    cy.get(`[data-cy="list-delete-head-button"]`).should('not.be.disabled').click();
    cy.get(`[data-cy="index_0"]`).should('contain', "34")
  }),

  it('элемент удаляется из tail', () =>{
    visitList()
    const inputValue = "1235"
    addToTail(inputValue)
    cy.get(`[data-cy="index_4"]`).should('contain', inputValue)
    cy.get(`[data-cy="list-delete-tail-button"]`).should('not.be.disabled').click();
    cy.wait(500);
    cy.get(`[data-cy="index_4"]`).should('not.exist') 
  }),
  it('элемент удаляется по индексу', () =>{
    visitList()
    const inputValue = "1235"
    const indexValue = '3'
    typeInput(inputValue)
    typeIndex(indexValue)
    cy.get(`[data-cy="add-by-index-button"]`).should('not.be.disabled').click();
    cy.get(`[data-cy="index_${indexValue}"]`).should('contain', inputValue)
    typeIndex(indexValue)
    cy.get(`[data-cy="delete-by-index-button"]`).should('not.be.disabled').click();
    cy.get(`[data-cy="index_${indexValue}"]`).should('not.contain', inputValue)
  })
})