import cypress from 'cypress';
import { ElementStates } from "../../src/types/element-states";

const visitList= () => {
  cy.visit('/list');
};

const typeIndex =(indexValue:string) => {
  cy.get('@index-input').type(indexValue);
}
const typeInput =(inputValue:string) => {
  cy.get('@value-input').type(inputValue);
}
const addToHead=(inputValue:string) =>{
  typeInput(inputValue)
  cy.get('@add-head').should('not.be.disabled').click();
}
const addToTail=(inputValue:string) =>{
  typeInput(inputValue)
  cy.get('@add-tail').should('not.be.disabled').click();
}

describe('Список работает', () => {
  beforeEach (()=>{
    visitList()
    cy.get(`[data-cy="list-value-input"]`).as('value-input')
    cy.get(`[data-cy="list-index-input"]`).as('index-input')
    cy.get(`[data-cy="list-add-head-button"]`).as('add-head')
    cy.get(`[data-cy="list-add-tail-button"]`).as('add-tail')
    cy.get(`[data-cy="add-by-index-button"]`).as('add-by-index')
    cy.get(`[data-cy="delete-by-index-button"]`).as('delete-by-index')
    cy.get(`[data-cy="list"]`).as('list')
  })
  it('если в инпуте пусто, кнопки добавления недоступны', () => {
    cy.get('@value-input').clear();
    cy.get('@add-head').should('be.disabled');
    cy.get('@add-tail').should('be.disabled');
    cy.get('@add-by-index').should('be.disabled');
  })
  it('если в индексе пусто, кнопки добавления и удаления по индексу недоступны', () => {
    cy.get('@index-input').clear();
    cy.get('@add-by-index').should('be.disabled');
    cy.get('@delete-by-index').should('be.disabled');
  }),
  it('дефолтный список отрисован', () => {
    cy.get('@list').should("contain", "0").should("contain", "34").should("contain", "8").should("contain", "1")
  }),
  it('элемент добавляется в head', () =>{
    const inputValue = "1235"
    addToHead(inputValue)
    cy.get(`[data-cy="index_0"]`).should('contain', inputValue)
    const changedinputValue = "3235"
    addToHead(changedinputValue)
    cy.get(`[data-cy="index_0"]`).should('contain', changedinputValue).should('not.contain', inputValue )
  }),
  it('элемент добавляется в tail', () =>{
    const inputValue = "1235"
    addToTail(inputValue)
    cy.get(`[data-cy="index_4"]`).should('contain', inputValue)
    const changedinputValue = "3235"
    addToTail(changedinputValue)
    cy.get(`[data-cy="index_5"]`).should('contain', changedinputValue).should('not.contain', inputValue )
  }),
  it('элемент добавляется по индексу', () =>{
    const inputValue = "1235"
    const indexValue = '3'
    typeInput(inputValue)
    typeIndex(indexValue)
    cy.get('@add-by-index').should('not.be.disabled').click();
    cy.get(`[data-cy="index_${indexValue}"]`).should('contain', inputValue)
    const changedInputValue = "3235"
    typeInput(changedInputValue)
    typeIndex(indexValue)
    cy.get('@add-by-index').should('not.be.disabled').click();
    cy.get(`[data-cy="index_${indexValue}"]`).should('contain', changedInputValue).should('not.contain', inputValue )
  }),
  it('элемент удаляется из head', () =>{
    cy.get('@list').should("contain", "0").should("contain", "34").should("contain", "8").should("contain", "1")
    cy.get(`[data-cy="list-delete-head-button"]`).should('not.be.disabled').click();
    cy.get(`[data-cy="index_0"]`).should('contain', "34")
  }),
  it('элемент удаляется из tail', () =>{
    const inputValue = "1235"
    addToTail(inputValue)
    cy.get(`[data-cy="index_4"]`).should('contain', inputValue)
    cy.get(`[data-cy="list-delete-tail-button"]`).should('not.be.disabled').click();
    cy.wait(500);
    cy.get(`[data-cy="index_4"]`).should('not.exist') 
  }),
  it('элемент удаляется по индексу', () =>{
    const inputValue = "1235"
    const indexValue = '3'
    typeInput(inputValue)
    typeIndex(indexValue)
    cy.get('@add-by-index').should('not.be.disabled').click();
    cy.get(`[data-cy="index_${indexValue}"]`).should('contain', inputValue)
    typeIndex(indexValue)
    cy.get('@delete-by-index').should('not.be.disabled').click();
    cy.get(`[data-cy="index_${indexValue}"]`).should('not.contain', inputValue)
  })
})