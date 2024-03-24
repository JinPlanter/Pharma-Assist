// tests the student page

// Import dependencies and the StudentPage component
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For additional matchers like .toBeInTheDocument()
import StudentPage from '../../../app/Students/[id]/page'; // Adjust the import path as per your project structure


// global mock fetch
global.fetch = jest.fn();


describe('StudentPage component', () => {
  // Define a mock student data object
  const mockStudentData = [{
    id: 1,
    name: 'John Doe',
    class: 'Class 1'
  }];

  // Mock the getStudentData function
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockStudentData)
  });

  test('renders student page with student data', async () => {
    
    // mock params with the id
    const mockParams = { id: '1' };
    
    // Render the StudentPage component with mock params
    render(<StudentPage params={mockParams} />);

    // Wait for the component to render
    await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument(); // Check if the loading text is displayed
    });


    // after loading, wait for data to be displayed
    // then assertions
    await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument(); // Check if the loading text is removed
        expect(screen.getByText('John Doe')).toBeInTheDocument(); // Check if the student name is displayed
        expect(screen.getByText('Class: Class 1')).toBeInTheDocument(); // Check if the student class is displayed
        expect(screen.getByText('Id: 1')).toBeInTheDocument(); // Check if the student id is displayed
    });

  }); // end of test 1



});
