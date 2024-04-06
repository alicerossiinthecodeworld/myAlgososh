import React, { useEffect, useState } from 'react';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { LinkedList } from './linked-list';
import { sleep } from '../../utils/utils-functions';

import styles from './list-page.module.css';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const ListPage = () => {
  const [linkedList, setLinkedList] = useState(new LinkedList<string>());
  const [listArray, setListArray] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    const initialValues = ['0', '34', '8', '1'];
    const newList = new LinkedList<string>();
    initialValues.forEach(value => newList.addToTail(value));
    setLinkedList(newList);
  }, []);

  useEffect(() => {
    const items: string[] = [];
    let current = linkedList.getHead();
    while (current !== null) {
      items.push(current.value);
      current = current.next;
    }
    setListArray(items);
  }, [linkedList]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(e.target.value);
  };

  const handleAddToHead = () => {
    linkedList.addToHead(value);
    setLinkedList(Object.assign(new LinkedList<string>(), linkedList));
    setValue('');
  };

  const handleAddToTail = () => {
    linkedList.addToTail(value);
    setLinkedList(Object.assign(new LinkedList<string>(), linkedList));
    setValue('');
  };

  const handleDeleteFromHead = () => {
    linkedList.deleteFromHead();
    setLinkedList(Object.assign(new LinkedList<string>(), linkedList));
  };

  const handleDeleteFromTail = () => {
    linkedList.deleteFromTail();
    setLinkedList(Object.assign(new LinkedList<string>(), linkedList));
  };

  const animateOperation = async (operation: () => void, index: number) => {
    for (let i = 0; i <= index; i++) {
      setHighlightedIndex(i);
      await sleep(SHORT_DELAY_IN_MS);
    }
  
    operation();
  
    setLinkedList(linkedList.clone());
    setValue('');
    setIndex('');
    setHighlightedIndex(null);
  };
  
  const handleAddAtIndex = () => {
    if (index.trim() !== '') {
      animateOperation(() => linkedList.insertAtIndex(parseInt(index, 10), value), parseInt(index, 10));
      setValue('');
      setIndex('');
    }
  };

  const handleDeleteAtIndex = () => {
    if (index.trim() !== '') {
      animateOperation(() => linkedList.deleteAtIndex(parseInt(index, 10)), parseInt(index, 10));
      setIndex('');
    }
  };

  const renderList = () => listArray.map((item, idx) => (
    <Circle
      key={idx}
      letter={item}
      state={idx === highlightedIndex ? ElementStates.Changing : ElementStates.Default}
      index={idx}
      head={idx === 0 ? 'head' : undefined}
      tail={idx === listArray.length - 1 ? 'tail' : undefined}
    />
  ));

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.inputZone}>
        <Input
          type="text"
          maxLength={4}
          value={value}
          onChange={handleValueChange}
          extraClass={styles.input}
          isLimitText={true}
          placeholder="Введите значение"
          data-cy={"list-value-input"}
        />
        <Button text="Добавить в head" onClick={handleAddToHead} extraClass={styles.listButton} 
        data-cy={'list-add-head-button'}
        disabled={value==''}/>
        <Button text="Добавить в tail" 
        onClick={handleAddToTail} extraClass={styles.listButton}
        data-cy={'list-add-tail-button'}
        disabled={value==''}/>
        <Button 
        data-cy={'list-delete-head-button'}
        text="Удалить из head"
        onClick={handleDeleteFromHead} 
        extraClass={styles.listButton} 
        disabled={listArray.length===0}/>
        <Button 
        data-cy={'list-delete-tail-button'}
        text="Удалить из tail" onClick={handleDeleteFromTail} extraClass={styles.listButton} 
        disabled={listArray.length===0}/>
      </div>
      <div className={styles.inputZone}>
        <Input
          type="number"
          placeholder="Введите индекс"
          value={index}
          onChange={handleIndexChange}
          extraClass={styles.input}
          data-cy={"list-index-input"}
        />
        <Button 
        data-cy={'add-by-index-button'}
        text="Добавить по индексу" onClick={handleAddAtIndex} extraClass={styles.indexButton} disabled={linkedList.getLength() < Number(index)||index==''||value==''} />
        <Button
         data-cy={'delete-by-index-button'} text="Удалить по индексу" onClick={handleDeleteAtIndex} extraClass={styles.indexButton} disabled={linkedList.getLength() < Number(index)||index==''} />
      </div>
      <div className={styles.sequence} data-cy={"list"}>
        {renderList()}
      </div>
    </SolutionLayout>
  );
};
