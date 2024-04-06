import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting-page.module.css';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { sleep } from '../../utils/utils-functions';
import { bubbleSortSteps, selectionSortSteps } from './utils';

export const SortingPage = () => {
  const [selectedSortingMethod, setSelectedSortingMethod] = useState<'selection' | 'bubble'>('selection');
  const [currArr, setCurrArr] = useState<{ value: number; state: ElementStates }[]>([]);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSortingMethod(event.target.value as 'selection' | 'bubble');
  };

  const generateRandomArray = () => {
    const length = Math.floor(Math.random() * (15 - 5 + 1)) + 5; 
    const arr = Array.from({ length }, () => ({
      value: Math.floor(Math.random() * 100),
      state: ElementStates.Default,
    }));
    setCurrArr([...arr]);
  };

  const visualizeSteps = async (steps: { value: number; state: ElementStates }[][]) => {
    for (let step of steps) {
      setCurrArr(step);
      await sleep(SHORT_DELAY_IN_MS);
    }
  };

  const sortArray = async (direction: 'ascending' | 'descending') => {
    setIsSorting(true);
    let steps = [] as { value: number; state: ElementStates}[][];
    currArr.forEach(item => item.state = ElementStates.Default); 
    if (selectedSortingMethod === 'selection') {
      steps = selectionSortSteps(currArr, direction);
    } else if (selectedSortingMethod === 'bubble') {
      steps = bubbleSortSteps(currArr, direction);
    }
    await visualizeSteps(steps);
    setIsSorting(false);
  };

  const startSorting = (direction: 'ascending' | 'descending') => {
    sortArray(direction);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.inputZone}>
        <div className={styles.radioInputs}>
          <RadioInput name="sortingMethod" label="Выбор" value="selection" checked={selectedSortingMethod === 'selection'} onChange={handleRadioChange} disabled={isSorting} />
          <RadioInput name="sortingMethod" label="Пузырек" value="bubble" checked={selectedSortingMethod === 'bubble'} onChange={handleRadioChange} disabled={isSorting} />
        </div>
        <div className={styles.buttonList}>
          <Button text={'По возрастанию'} onClick={() => startSorting('ascending')} disabled={isSorting} />
          <Button text={'По убыванию'} onClick={() => startSorting('descending')} disabled={isSorting} />
          <Button text={'Новый массив'} onClick={generateRandomArray} disabled={isSorting} />
        </div>
      </div>
      <div className={styles.arrayDisplay}>
        {currArr.map((item, index) => (
         <Column key={index} index={item.value} state={item.state} />))}
      </div>
    </SolutionLayout>
  );
};
