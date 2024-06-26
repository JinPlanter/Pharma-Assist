// tests the student page

// Import dependencies and the StudentPage component
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For additional matchers like .toBeInTheDocument()
import StudentPage from '../../../app/Students/[username]/page'; // Adjust the import path as per your project structure


// global mock fetch
global.fetch = jest.fn();


describe('StudentPage component', () => {
  // Define a mock student data object
  const mockStudentData = [{
    username: "233",
    firstName: 'John',
    lastName: 'Doe'
  }];

  // Mock the getStudentData function
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockStudentData)
  });

  
  // Test Case 1: Renders loading text while fetching student data
    test('renders loading text while fetching student data', async () => {
        // mock params with the id
        const mockParams = { username: '233' };
        
        // Render the StudentPage component with mock params
        render(<StudentPage params={mockParams} />);

        // Wait for the component to render
        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument(); // Check if the loading text is displayed
        });

    }); // end of test 1

    // Test Case 2: Renders the student page with student data
    test('renders student page with student data', async () => {
        
        // mock params with the id
        const mockParams = { username: '233' };
        
        // Render the StudentPage component with mock params
        render(<StudentPage params={mockParams} />);

        // Wait for the component to render
        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument(); // Check if the loading text is displayed
        });


        // after loading, wait for data to be displayed
        // then assertions
        await waitFor(() => {
            expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument(); // Check if the loading text is removed
        }, { timeout: 5000 });

        const nameCell = screen.getByTestId('name');
        expect(nameCell).toBeInTheDocument();

        const usernameCell = screen.getByTestId('username');
        expect(usernameCell).toBeInTheDocument();

    }); // end of test 2



    // Test Case 3: Renders error message for error handling
    test('renders error message on fetch error', async () => {
        // Mock the fetch function to throw an error
        global.fetch.mockRejectedValue(new Error('Failed to fetch student data'));
    
        // mock params with the id
        const mockParams = { username: '233' };
    
        // Render the StudentPage component with mock params
        render(<StudentPage params={mockParams} />);
    
        // Wait for the component to render
        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument(); // Check if the loading text is displayed
        });
    
        // after loading, wait for error message to be displayed
        // then assertions
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument(); // Check if the loading text is removed
            expect(screen.getByText('Error: Failed to fetch student data')).toBeInTheDocument(); // Check if the error message is displayed
        });
    
    }); // end of test 3

});
