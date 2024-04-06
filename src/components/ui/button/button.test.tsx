import { render, screen, fireEvent } from '@testing-library/react';
import {Button} from './button'
import { Direction } from '../../../types/direction';


const test_on_click =(isLoader:boolean,isDisabled:boolean, testid:string, callTimes:number)=> {
  const onClickMock = jest.fn();
  render(
    <Button
      data-testid="loading-button"
      text="Click me!"
      onClick={onClickMock}
      isLoader={isLoader}
      disabled={isDisabled}
      sorting={Direction.Ascending}
    />
  );
  fireEvent.click(screen.getByTestId('loading-button'));
  expect(onClickMock).toHaveBeenCalledTimes(callTimes);
}

describe('Button Component', () => {
  test('renders button with text', () => {
    const { asFragment } = render(<Button>'Click me!'</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders button without text', () => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders disabled button', () => {
    const { asFragment } = render(<Button disabled={true}>Disabled</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders loading button', () => {
    const { asFragment } = render(<Button isLoader={true}>Loading</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('Button Component', () => {
    test('calls onClick callback when clicked and is not loading or disabled', () => {
      test_on_click(false, false, 'clickable-button', 1)
    });
  });

  describe('Button Component', () => {
    test('does not call on when loading', () => {
      test_on_click(true, false, 'loading-button', 0)
    });
    
  });
  describe('Button Component', () => {
    test('does not call on when disabled', () => {
      test_on_click(false, true, 'disabled-button', 0)
    });
  });
});
