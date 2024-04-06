import { ElementStates } from "../../types/element-states";
import { bubbleSortSteps, selectionSortSteps} from "./utils";

const testSorting = (sortType:'bubble'|'selection', initialArr:{ value: number; state: ElementStates }[], result:number[],  direction: 'ascending' | 'descending') => {
  let steps
  if (sortType ==='bubble') {
    steps = bubbleSortSteps(initialArr, direction)
  }
  else {
    steps = selectionSortSteps(initialArr, direction)
  }
  const lastStep= steps[steps.length -1]
  let arr:number[] = [];
  lastStep.forEach((item) => { arr.push(item.value)})

  expect(arr).toEqual(result) 
}

describe('bubble sort', () => {
  test('correctly sorts empty array', () => {
    testSorting('bubble',[],[], 'ascending')
    testSorting('bubble',[],[], 'descending')
  });
  test('correctly sorts array of one element', () => {
    testSorting('bubble',[{value: 1, state:ElementStates.Default}],[1], 'ascending')
    testSorting('bubble',[{value: 1, state:ElementStates.Default}],[1], 'descending')
  });
  test('correctly sorts array of many elements', () => {
    testSorting('bubble',[{value: 1, state:ElementStates.Default},{value: 4, state:ElementStates.Default}, {value: 99, state:ElementStates.Default}, {value:43, state:ElementStates.Default}, {value:43, state:ElementStates.Default}, {value:2, state:ElementStates.Default}],[1,2,4,43,43,99]
, 'ascending')
    testSorting('bubble',[{value: 1, state:ElementStates.Default},{value: 4, state:ElementStates.Default}, {value: 99, state:ElementStates.Default}, {value:43, state:ElementStates.Default}, {value:43, state:ElementStates.Default}, {value:2, state:ElementStates.Default}],[99,43,43,4,2,1], 'descending')
  });
});

describe('selection sort', () => {
  test('correctly sorts empty array', () => {
    testSorting('selection',[],[], 'ascending')
    testSorting('selection',[],[], 'descending')
  });
  test('correctly sorts array of one element', () => {
    testSorting('selection',[{value: 1, state:ElementStates.Default}],[1], 'ascending')
    testSorting('selection',[{value: 1, state:ElementStates.Default}],[1], 'descending')
  });
  test('correctly sorts array of many elements', () => {
    testSorting('selection',[{value: 1, state:ElementStates.Default},{value: 4, state:ElementStates.Default}, {value: 99, state:ElementStates.Default}, {value:43, state:ElementStates.Default}, {value:43, state:ElementStates.Default}, {value:2, state:ElementStates.Default}],[1,2,4,43,43,99]
, 'ascending')
    testSorting('selection',[{value: 1, state:ElementStates.Default},{value: 4, state:ElementStates.Default}, {value: 99, state:ElementStates.Default}, {value:43, state:ElementStates.Default}, {value:43, state:ElementStates.Default}, {value:2, state:ElementStates.Default}],[99,43,43,4,2,1], 'descending')
  });
});
