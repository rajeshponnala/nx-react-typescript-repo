import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Counter from './index';

describe('Counter', () => {
  afterEach(() => {
    window.localStorage.removeItem('count')
  }) 
 it('should render successfully', () => {
    const { container } = render(<Counter />);
    const button = container.firstChild
    expect(button.textContent).toBe('0')
  });

  it('counter increments the count', () => {
    const { container } = render(<Counter />);
    const button = container.firstChild
    fireEvent.click(button)
    expect(button.textContent).toBe('1')
  });

  it('reads and writes to local storage', () => {
    window.localStorage.setItem('count','3')
    const { container } = render(<Counter />);
    const button = container.firstChild
    expect(button.textContent).toBe('3')
    fireEvent.click(button)
    expect(window.localStorage.getItem('count')).toBe('4')
    expect(button.textContent).toBe('4')
});

});
