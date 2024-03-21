
// test functions in search bar component

import SearchBar from '../../../../app/Students/components/search-bar';
import { render, screen, fireEvent } from '@testing-library/react';



// 1. Renders the SearchBar component with label and input field
test('should render the SearchBar component with label and input field', () => {
  const data = [];
  render (<SearchBar data={data} />);

  const input = screen.getByPlaceholderText('Search by name, class or student ID');

  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('type', 'text');
  expect(input).toHaveValue('');

});


// 2. Handles empty search input and clears the search results
test('should handle empty search input and clear the search results', () => {
  const data = [];
  render (<SearchBar data={data} />);

  const input = screen.getByPlaceholderText('Search by name, class or student ID');
  expect(input).toBeInTheDocument();

  expect(screen.queryByTestId('search-results')).toBeNull();
  expect(input).toHaveValue('');

  // type in the search input
  fireEvent.change(input, { target: { value: 'john' } });
  expect(input).toHaveValue('john');

  // clear the search input
  fireEvent.change(input, { target: { value: '' } });
  expect(input).toHaveValue('');

  expect(screen.queryByTestId('search-results')).toBeNull();

});




    


    