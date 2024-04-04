import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/utils-functions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { calculateFibonacci } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidInput, setIsValidInput] = useState<boolean>(false);

 
  const fibonacciAsync = async (n: number) => {
    if (n <= 19){
      setIsLoading(true);
      setSequence([]);
      let fibSequence: number[] = [1];
      setSequence(fibSequence.slice());
      for (let i = 2; i <= n + 1; i++) {
        await sleep(SHORT_DELAY_IN_MS);
        fibSequence = [...fibSequence, calculateFibonacci(i)];
        setSequence(fibSequence);
      }
      setIsLoading(false);
    }
  };

  const handleFibonacciCalculation = () => {
    const inputVal = parseInt((document.querySelector('input') as HTMLInputElement).value);
    if (!isNaN(inputVal) && inputVal >= 1 && inputVal <= 19) {
      fibonacciAsync(inputVal);
    }
    else{
      alert("введите число от 0 до 19")
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.inputZone}>
        <Input data-cy={"fibonacci-input"} isLimitText={true} maxLength={2} type={'number'} min={1} max={19}   onChange={(e) => {
      const target = e.target as HTMLInputElement; 
      setIsValidInput(!isNaN(parseInt(target.value)) && parseInt(target.value) >= 1 && parseInt(target.value) <= 19);
  }} />
        <Button
          text={"Рассчитать"}
          type="button"
          onClick={handleFibonacciCalculation}
          isLoader={isLoading}
          disabled={isLoading||!isValidInput}
          data-cy={'fibonacci-button'}
        />
      </div>
      <div className={styles.sequence} data-cy={"fibonacci-numbers"}>
        {sequence.map((num, index) => (
          <Circle
            key={index}
            letter={num.toString()}
            state={ElementStates.Default}
            isSmall={false}
            index={index}
            extraClass={styles.circleMargin}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};