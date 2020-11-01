import React from 'react';
import { queryByText, render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from './index';


describe('Counter', () => {

   afterEach(() => {
      jest.useRealTimers();
   })
 
it('should render successfully', () => {
    const { container, getByLabelText } = render(<StopWatch />);
    expect(getByLabelText('0 ms')).toBeInTheDocument();
 });

it('Start Button should display `Start` on intial', () => {
   const { container, getByText } = render(<StopWatch />);
   expect(getByText('Start', { selector: 'button' })).toBeInTheDocument();
   expect(queryByText(container,'Stop')).toBeNull()
});

it('StopWatch Start and Stop buttons should work as expected', () => {
   const { container, getByText, getByLabelText } = render(<StopWatch />);
   const startButton = getByText('Start', { selector: 'button' }); 
   expect(getByLabelText('0 ms')).toBeInTheDocument();
   expect(startButton).toBeInTheDocument();
   expect(queryByText(container,'Stop')).toBeNull();
   jest.useFakeTimers();
   // start stop watch
   fireEvent.click(startButton)
   const stopButton = getByText('Stop', { selector: 'button' });
   expect(stopButton).toBeInTheDocument()
   expect(queryByText(container,'Start')).toBeNull();
   act(() => { jest.runOnlyPendingTimers() } )
   expect(queryByText(container,'0 ms')).toBeNull();
  
   // stop stop watch
   fireEvent.click(stopButton)
   expect(startButton).toBeInTheDocument();
   expect(queryByText(container,'Stop')).toBeNull();
});

it('StopWatch Start and Clear buttons should work as expected', () => {
   const { container, getByText, getByLabelText } = render(<StopWatch />);
   const startButton = getByText('Start', { selector: 'button' }); 
   const clearButton = getByText('Clear', { selector: 'button' });
   expect(getByLabelText('0 ms')).toBeInTheDocument();
   expect(startButton).toBeInTheDocument();
   expect(queryByText(container,'Stop')).toBeNull();
   jest.useFakeTimers();
   // start stop watch
   fireEvent.click(startButton)
   const stopButton = getByText('Stop', { selector: 'button' });
   expect(stopButton).toBeInTheDocument()
   expect(queryByText(container,'Start')).toBeNull();
   act(() => { jest.runOnlyPendingTimers() } )
   expect(queryByText(container,'0 ms')).toBeNull();
   // clear stop watch
   fireEvent.click(clearButton)
   expect(startButton).toBeInTheDocument();
   expect(queryByText(container,'Stop')).toBeNull();
   expect(getByLabelText('0 ms')).toBeInTheDocument();
   
});
});
