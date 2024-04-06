import { render, screen, fireEvent } from '@testing-library/react';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';

const testCircleState = (state:ElementStates)=>{
  const { asFragment } = render(<Circle state={state}/>);
  expect(asFragment()).toMatchSnapshot();
}

describe('Circle Component', () => {
  test('renders circle without letter', () => {
    const { asFragment } = render(<Circle/>);
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders circle with letter', () => {
    const { asFragment } = render(<Circle letter='a'/>);
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders circle with letter as head', () => {

    const { asFragment } = render(<Circle letter='a' head={'head'}/>);
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders circle with head', () => {
    const { asFragment } = render(<Circle  head={'head'}/>);
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders circle with react element as head', () => {
    const customHead = <div>Custom Head Content</div>;
    const { asFragment } = render(<Circle  head={customHead}/>);
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders circle with  tail', () => {
    const { asFragment } = render(<Circle  tail={'tail'}/>);
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders circle with react element as tail', () => {
    const customTail = <div>Custom Tail Content</div>;
    const { asFragment } = render(<Circle  head={customTail}/>);
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders circle with index', () => {
    const { asFragment } = render(<Circle index={0}/>);
    expect(asFragment()).toMatchSnapshot();
  });
  test('renders circle with isSmall', () => {
    const { asFragment } = render(<Circle isSmall={true}/>);
    expect(asFragment()).toMatchSnapshot();
  }); 
  test('renders circle default', () => {
    testCircleState(ElementStates.Default)
  }); 
  test('renders circle changing', () => {
    testCircleState(ElementStates.Changing)
  }); 
  test('renders circle modified', () => {
    testCircleState(ElementStates.Modified)
  }); 
});
