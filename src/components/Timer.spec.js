import React from 'react';
import Timer from './timer';
import {render} from '@testing-library/react';

test('loads 00:00 as the initial value', () => {
  const {getByTestId} = render(<Timer/>);
  const timer = getByTestId('timer');
  expect(timer).toHaveTextContent('00:00')
});
