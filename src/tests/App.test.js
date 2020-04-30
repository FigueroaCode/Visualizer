import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders canvas element', () => {
  render(<App />);
  const canvas = document.querySelector('canvas');
  expect(canvas).toBeInTheDocument();
});
