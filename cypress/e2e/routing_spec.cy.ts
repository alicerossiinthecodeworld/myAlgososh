import cypress from "cypress"
const visitMain = () => {
  cy.visit('/')
}
const testRoute = (route:string, contains:string) => {
  visitMain()
  cy.get(`[data-cy="${route}-link"]`).click();
  cy.url().should('include', `/${route}`) 
  cy.contains(contains) 
}

describe('Сервис загружен', ()=>{
  it('доступен по localhost:3000', ()=>{
      visitMain()
      cy.contains('МБОУ АЛГОСОШ')     
  })
})

describe('Роутинг работает', ()=>{
  it(`Пользователь может перейти к развороту строки`, () => {
    testRoute("recursion", "Строка")
  }),
  it(`Пользователь может перейти к Фибоначчи`, () => {
    testRoute("fibonacci", "Последовательность Фибоначчи")
  }),
  it(`Пользователь может перейти к cортировке массива`, () => {
    testRoute("sorting", "Сортировка массива")
  }),
  it(`Пользователь может перейти к стеку`, () => {
    testRoute("stack", "Стек")
  }),
  it(`Пользователь может перейти к очереди`, () => {
    testRoute("queue", "Очередь")
  })
  it(`Пользователь может перейти к очереди`, () => {
    testRoute("list", "Связный список")
  })
})