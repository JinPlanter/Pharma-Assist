
// tests the function used in the search bar component: filterInitialData

import { filterInitialData } from '../../../../app/Students/components/search-bar';


describe('Tests for the filterInitialData function', () => {
    // 1. Returns an empty array if theData is empty (Edge case)
    test('should return an empty array when theData is empty', () => {
        const theData = [];
  
        const result = filterInitialData(theData);
  
        expect(result).toEqual([]);
      });

    

    // 2. Filters out objects without id, name, or class properties
    test('should filter out objects without firstName, lastName, or username', () => {
        const theData = [
            { username: '#233', firstName: 'John', lastName: 'Doe'},
            { id: '#234', fName: 'Jane', lName: 'Does'},
            { id: '#235', firName: 'Josh', latName: 'Doess'},
            { id: '#236', firtName: 'Jordan', lasName: 'Doesss'},
            { id: '#237', fistName: 'Jamie', lstName: 'Doessss'}
        ];
    
        const result = filterInitialData(theData);
    
        expect(result).toEqual([{ username: '#233', firstName: 'John', lastName: 'Doe'}]);
        });
    
    });
    