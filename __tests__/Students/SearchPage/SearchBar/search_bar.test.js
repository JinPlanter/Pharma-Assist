
// test functions in search bar component

import SearchBar from '../../../../app/Students/components/search-bar';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';


describe('Tests for the SearchBar component', () => {

  // Test case 1. Renders the SearchBar component with label and input field
  test('should render the SearchBar component with label and input field', () => {
    const data = [];
    render (<SearchBar data={data} />);

    const input = screen.getByPlaceholderText('Search by name, class or student ID');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('');

  });


  // Test case 2. Handles empty search input and clears the search results
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


  // Test case 3: Renders the correct number of rows in the search results
  test('should render the correct number of rows in the search results', async () => {
    const data = [
      { username: '#233', firstName: 'John', lastName: 'Doe'},
      { username: '#234', firstName: 'Jane', lastName: 'Does'},
      { username: '#235', firstName: 'Josh', lastName: 'Doess'},
      { username: '#236', firstName: 'Jordan', lastName: 'Doesss'},
      { username: '#237', firstName: 'Jamie', lastName: 'Doessss'}
    ];
    
    const { getByTestId, getAllByTestId } = render(<SearchBar data={data} />);

    // simulate typing in the search input
    fireEvent.change(getByTestId('search-bar'), { target: { value: 'john' } });

    // wait for the search results to be displayed
    const rows = await waitFor(() => getAllByTestId('result-row'));
    expect(rows.length).toBe(1);
  });


}); 




    


    