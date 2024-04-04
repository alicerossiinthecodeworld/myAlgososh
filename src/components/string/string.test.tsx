import { reverseStringSteps } from "./utils";

const testStringReverse = (initialString:string, result:string) => {
  const steps = reverseStringSteps(initialString)
  const lastStep= steps[steps.length -1]
  let str = ''
  for (let i = 0; i < lastStep.length; i++) {
    str = str + lastStep[i].letter
  }
  expect(str).toEqual(result)
}

describe('string Component', () => {
  test('correctly reverses even string', () => {
    testStringReverse('fsdfad', 'dafdsf')
  });
  test('correctly reverses uneven string', () => {
    testStringReverse('Hello', 'olleH')
  });
  test('correctly reverses single character string', () => {
    testStringReverse('1', '1')
  });
  test('correctly reverses void string', () => {
    testStringReverse('', '')
  });
});
