import { ElementStates } from "../../types/element-states";
export const bubbleSortSteps = (
  initialArray: { value: number; state: ElementStates }[],
  direction: 'ascending' | 'descending'
): { value: number; state: ElementStates }[][] => {

  let steps = [];
  let arr = [...initialArray];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      steps.push([...arr.map(item => ({ ...item }))]);
      const shouldSwap = direction === 'ascending' ? arr[j].value > arr[j + 1].value : arr[j].value < arr[j + 1].value;
      if (shouldSwap) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
      arr[j].state = ElementStates.Default;
      arr[j + 1].state = ElementStates.Default;
    }
    arr[arr.length - 1 - i].state= ElementStates.Modified;
    steps.push([...arr.map(item => ({ ...item }))]); 
  }
  steps.push([...arr]);
  console.log(steps)
  return steps;
};
export const selectionSortSteps = (
  initialArray: { value: number; state: ElementStates }[],
  direction: 'ascending' | 'descending'
): { value: number; state: ElementStates }[][] => {
  let steps = [];
  let arr = initialArray.map(item => ({ ...item }));
  steps.push([...arr.map(item => ({ ...item }))]);

  for (let i = 0; i < arr.length; i++) {
    let minOrMaxIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].state = ElementStates.Changing;
      steps.push([...arr.map(item => ({ ...item }))]); 
      arr[j].state = ElementStates.Default;
      
      const shouldSwap = direction === 'ascending' ? arr[j].value < arr[minOrMaxIndex].value : arr[j].value > arr[minOrMaxIndex].value;
      if (shouldSwap) {
        minOrMaxIndex = j;
      }
    }
    
    if (minOrMaxIndex !== i) {
      arr[minOrMaxIndex].state = ElementStates.Changing;
      arr[i].state = ElementStates.Changing;
      steps.push([...arr.map(item => ({ ...item }))]); 
      
      [arr[i], arr[minOrMaxIndex]] = [arr[minOrMaxIndex], arr[i]];
      arr[minOrMaxIndex].state = ElementStates.Default;
    }
    arr[i].state = ElementStates.Modified;
    steps.push([...arr.map(item => ({ ...item }))]); 
  }

  return steps;
};
