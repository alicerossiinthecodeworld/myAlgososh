import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css';

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<{ value: string, state: ElementStates }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const clear = () => setStack([]);

  const deleteStack = () => {
    if (stack.length > 0) {
      const newStack = stack.slice(0, stack.length - 1);
      setStack(newStack.map((item, index) => ({
        ...item,
        state: index === newStack.length - 1 ? ElementStates.Changing : ElementStates.Default
      })));
    }
  };

  const addStack = () => {
    if (inputValue.trim()) {
      const newElement = { value: inputValue, state: ElementStates.Changing };
      const newStack = [...stack, newElement].map((item, index, arr) => ({
        ...item,
        state: index === arr.length - 1 ? ElementStates.Changing : ElementStates.Default
      }));
      setStack(newStack);
      setInputValue('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  return (
    <SolutionLayout title="Стек">
      <div className={styles.inputZone}>
        <Input
          type="text"
          maxLength={4}
          value={inputValue}
          onChange={handleChange}
          isLimitText={true}
          disabled={isProcessing}
          data-cy={"stack-input"}
        />
        <Button
          type="submit"
          text="Добавить"
          onClick={addStack}
          isLoader={isProcessing}
          disabled={!inputValue || isProcessing} 
          data-cy={"stack-add-button"}
        />
        <Button
          type="button"
          text="Удалить"
          onClick={deleteStack}
          disabled={isProcessing || stack.length === 0}
          data-cy={"stack-delete-button"}
        />
        <Button
          type="button"
          text="Очистить"
          extraClass={styles.clearButton}
          onClick={clear}
          disabled={isProcessing || stack.length === 0}
          data-cy={"stack-clear-button"}
        />
      </div>
      <div className={styles.sequence} data-cy={"stack-element"}>
        {stack.map((item, index) => (
          <Circle
            key={index}
            letter={item.value}
            state={item.state}
            index={index}
            head={index === stack.length - 1 ? 'top' : undefined}
            extraClass={styles.circleMargin}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};