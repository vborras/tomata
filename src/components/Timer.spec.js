import React from 'react';
import Timer from './Timer';
import {act, render} from '@testing-library/react';

describe('Timer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  test('loads 25:00 as the initial value', () => {
    const {getByTestId} = render(<Timer/>);
    const timer = getByTestId('timer');
    expect(timer).toHaveTextContent('25:00');
  });

  test('discounts one second at a time when activated', () => {
    const {getByTestId} = render(<Timer/>);
    const timer = getByTestId('timer');

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timer).toHaveTextContent('24:59');
  });

  test('stops when it gets to 0', () => {
    const {getByTestId} = render(<Timer/>);
    const timer = getByTestId('timer');

    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000);
    });
    expect(timer).toHaveTextContent('00:00');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timer).toHaveTextContent('00:00');
  });
});
