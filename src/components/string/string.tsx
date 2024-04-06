import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/utils-functions";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css'
import { reverseStringSteps } from "./utils";

export const StringComponent: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [lettersState, setLettersState] = useState<{ letter: string, state: ElementStates }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

const reverseString = async () => {
  setIsLoading(true);

  const steps = reverseStringSteps(word);
  console.log(steps)
  await (async () => {
    for (let i = 0; i < steps.length; i++) {
      setLettersState([...steps[i]]);
      await sleep(SHORT_DELAY_IN_MS);
    }
  })();

  setIsLoading(false);
};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWord = e.target.value;
    setWord(newWord);
  };

  return (
    <SolutionLayout title="Строка"> 
     <div className={styles.inputZone}>
        <Input 
          type="text" 
          maxLength={11} 
          isLimitText={true} 
          onChange={handleChange}
          data-cy = 'string_input'
        />
        <Button 
          type="button" 
          text="развернуть" 
          disabled={word.length === 0 || isLoading} 
          onClick={reverseString} 
          isLoader={isLoading}
          data-cy = 'string_button'
        />
     </div>
     <div className={styles.sequence} data-cy = {'letters'}>

       {lettersState.map((item, index) => (
          <Circle
            key={index}
            letter={item.letter}
            state={item.state}
            isSmall={false}
            extraClass={styles.circleMargin}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
