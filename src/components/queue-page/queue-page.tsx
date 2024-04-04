import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<{ value: string, state: ElementStates }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const clear = () => setQueue([]);

  const deleteQueue = () => {
    if (queue.length > 0 && !isProcessing) {
      setIsProcessing(true);
      setQueue(queue.map((item, index) => ({
        ...item,
        state: index === 0 ? ElementStates.Changing : item.state
      })));

      setTimeout(() => {
        const newQueue = queue.slice(1).map((item) => ({
          ...item,
          state: ElementStates.Default
        }));
        setQueue(newQueue);
        setIsProcessing(false);
      }, SHORT_DELAY_IN_MS); 
    }
  };

  const addQueue = () => {
    if (inputValue.trim() && !isProcessing && queue.length < 7) {
      setIsProcessing(true);
      const newElement = { value: inputValue, state: ElementStates.Default };
      const newQueue = [...queue, newElement];
      setQueue(newQueue);
      setInputValue('');
      setTimeout(() => {
        setIsProcessing(false);
      }, SHORT_DELAY_IN_MS);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const renderQueue = () => {
    const elements = queue.concat(Array(7 - queue.length).fill({ value: '', state: ElementStates.Default }));
    return elements.map((item, index) => (
      <Circle
        key={index}
        letter={item.value}
        state={item.state}
        index={index}
        head={index === 0 ? 'head' : undefined}
        tail={queue.length > 0 && index === queue.length - 1 ? 'tail' : undefined}
        extraClass={styles.circleMargin}
      />
    ));
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.inputZone}>
        <Input
          type="text"
          maxLength={4}
          value={inputValue}
          onChange={handleChange}
          isLimitText={true}
          disabled={isProcessing}
          data-cy={"queue-input"}
        />
        <Button
          type="submit"
          text="Добавить"
          onClick={addQueue}
          isLoader={isProcessing}
          disabled={!inputValue || isProcessing || queue.length >= 7}
          data-cy = {"queue-add-button"}
        />
        <Button
          type="button"
          text="Удалить"
          onClick={deleteQueue}
          disabled={isProcessing || queue.length === 0}
          data-cy = {"queue-delete-button"}
        />
        <Button
          type="button"
          text="Очистить"
          extraClass={styles.clearButton}
          onClick={clear}
          disabled={isProcessing || queue.length === 0}
          data-cy = {"queue-clear-button"}
        />
      </div>
      <div className={styles.sequence} data-cy={'queue-element'}>
        {renderQueue()}
      </div>
    </SolutionLayout>
  );
};
