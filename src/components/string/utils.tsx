import { ElementStates } from "../../types/element-states";

export const reverseStringSteps = (sourceString: string): { letter: string, state: ElementStates }[][] => {
  let steps = [];
  const letters = sourceString.split('').map(letter => ({ letter, state: ElementStates.Default }));
  steps.push(letters.map(letter => ({ ...letter })));
  let start = 0;
  let end = sourceString.length - 1;
  while (start < end) {
    letters[start].state = ElementStates.Changing;
    letters[end].state = ElementStates.Changing;
    steps.push(letters.map(letter => ({ ...letter }))); 
    [letters[start].letter, letters[end].letter] = [letters[end].letter, letters[start].letter];
    steps.push(letters.map(letter => ({ ...letter }))); 
    letters[start].state = ElementStates.Modified;
    letters[end].state = ElementStates.Modified;
    steps.push(letters.map(letter => ({ ...letter }))); 
    start++;
    end--;
  }
  if (start === end) {
    letters[start].state = ElementStates.Modified;
    steps.push(letters.map(letter => ({ ...letter }))); 
  }
  return steps;
};

