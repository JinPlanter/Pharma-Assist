// test search page

import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../../../app/Students/page';


jest.setTimeout(10000);


// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: 'John Doe' }, 
    { id: 2, name: 'Alice' }]),
    })
);


//custom matcher to handle table format
const customMatcher = (table, searchText) => {
    const rows = table.querySelectorAll('tr');
    const columns = table.querySelectorAll('td');
    for ( let i = 0; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll('td');
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent === searchText) {
                return true;
            }
        }
    }
    return false;
};


//setup the test
describe('Page component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });


    //0. test that the page renders the heading: Student Search Page
    test('renders Student Search Page', async() => {
        render(<Page />);
        const heading = screen.getByText(/Student Search Page/i);
        expect(heading).toBeInTheDocument();

        
    });



    // 1. test that the page renders the search bar component
    test('renders the search bar component', async() => {
        const { getByPlaceholderText, getByTestId } = render(<Page />);
        // Wait for the "Loading..." text to disappear
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });
        expect(getByPlaceholderText("Search by name, class or student ID")).toBeInTheDocument();
        expect(getByTestId("search-bar")).toBeInTheDocument();
    });



    // 2. test that the search bar allows input
    test('allows input in the search bar', async() => {
        let component;
        await act(async () => {
            component = render(<Page />);
        });

        const searchBar = component.getByPlaceholderText("Search by name, class or student ID");
        fireEvent.change(searchBar, { target: { value: 'John' } });
        expect(searchBar.value).toBe('John');
    });



    //3. test that the page handles fetch error as expected
    test('handles fetch error', async() => {
        //mock console error
        console.error = jest.fn(); // this suppresses console.error from printing to the console as it is what we want to test

        global.fetch.mockImplementationOnce(() => Promise.reject("Fetch error"));
       
        // spy on console.error
        const errorSpy = jest.spyOn(console,'error');

        // render the page
        render(<Page />);

        await waitFor(() => {
            expect(errorSpy).toHaveBeenCalledWith('Error fetching data:', 'Fetch error');
        });

        expect(errorSpy).toHaveBeenCalledWith('Error fetching data:', 'Fetch error');
    });

});
