import React from 'react';
import Timer from './Timer';
import {act, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const activateCountdown = function (getByTestId) {
    const activationButton = getByTestId('activation-button');
    userEvent.click(activationButton)
}

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
    const timer = getByTestId('countdown');
    expect(timer).toHaveTextContent('25:00');
  });

  test('countdown is initially stopped', () => {
    const {getByTestId} = render(<Timer/>);
    const timer = getByTestId('countdown');

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timer).toHaveTextContent('25:00');
  });

  test('discounts one second at a time when activated', () => {
    const {getByTestId} = render(<Timer/>);
    const timer = getByTestId('countdown');
    activateCountdown(getByTestId)

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timer).toHaveTextContent('24:59');
  });

  test('stops when it gets to 0', () => {
    const {getByTestId} = render(<Timer/>);
    const timer = getByTestId('countdown');
    activateCountdown(getByTestId)

    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000);
    });
    const timerText = timer.textContent
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timer).toHaveTextContent(timerText);
  });

  test('activation button is shown by default', () => {
    const {queryByTestId} = render(<Timer/>);
    expect(queryByTestId('activation-button')).toBeTruthy()
  })

  test('activation button is hidden when the countdown is active', () => {
    const {queryByTestId, getByTestId} = render(<Timer/>);
    activateCountdown(getByTestId)
    expect(queryByTestId('activation-button')).toBeNull()
  })

  test('pause button is hidden by default', () => {
    const {queryByTestId} = render(<Timer/>);
    expect(queryByTestId('pause-button')).toBeNull()
  })

  test('pause button is shown when the countdown is active', () => {
    const {queryByTestId, getByTestId} = render(<Timer/>);
    activateCountdown(getByTestId)
    expect(queryByTestId('pause-button')).toBeTruthy()
  })

  test('pause button stops the countdown', () => {
    const {getByTestId} = render(<Timer/>);
    const timer = getByTestId('countdown');

    activateCountdown(getByTestId)
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timer).toHaveTextContent('24:59');

    const pauseButton = getByTestId('pause-button')
    userEvent.click(pauseButton)
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(timer).toHaveTextContent('24:59');
  })

  test('timer is paused to 5 min after a 25 min countdown', () => {
    const {getByTestId} = render(<Timer/>);
    const timer = getByTestId('countdown');
    activateCountdown(getByTestId)

    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000);
    });
    expect(timer).toHaveTextContent('05:00');
  })

  test('timer is paused to 25 min after a 5 min countdown', () => {
    const {getByTestId} = render(<Timer/>);
    const timer = getByTestId('countdown');
    activateCountdown(getByTestId)

    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000);
    });

    activateCountdown(getByTestId)
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });
    expect(timer).toHaveTextContent('25:00');
  })

  test('skips to next work time when skip button is pressed', () => {
    const { getByTestId } = render(<Timer />);
    const timer = getByTestId('countdown');
    activateCountdown(getByTestId)
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });
    expect(timer).toHaveTextContent('20:00');

    const skipButton = getByTestId('skip-button');
    userEvent.click(skipButton)

    expect(timer).toHaveTextContent('25:00');
  })

  test('timer is paused after pressing the skip button', () => {
    const { getByTestId } = render(<Timer />);
    const timer = getByTestId('countdown');
    activateCountdown(getByTestId)
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });

    const skipButton = getByTestId('skip-button');
    userEvent.click(skipButton)
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });
    expect(timer).toHaveTextContent('25:00');
  })
});
