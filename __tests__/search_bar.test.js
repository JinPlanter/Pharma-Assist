
// test functions in search bar component

import { filterInitialData, calculateScore } from '../app/Students/components/search-bar';

    // 1. Returns an empty array if theData is empty (Edge case)
    test('should return an empty array when theData is empty', () => {
        const theData = [];
  
        const result = filterInitialData(theData);
  
        expect(result).toEqual([]);
      });




    // 2. Filters out objects without id, name, or class properties
    test('should filter out objects without id, name, or class properties', () => {
    const theData = [
        { id: 1, name: 'John', class: 'A' },
        { id: 2, class: 'B' },
        { name: 'Jane', class: 'C' },
        { id: 3, name: 'Doe' }
    ];

    const result = filterInitialData(theData);

    expect(result).toEqual([{ id: 1, name: 'John', class: 'A' }]);
    });


    // 3. Returns filtered data
    test('should return the filtered data when theData contains valid student objects', () => {
        const theData = [
            { id: 1, name: 'John Doe', class: 'Math' },
            { id: 2, name: 'Jane Smith', class: 'Science' },
            { id: 3, name: 'Bob Johnson', class: 'English' }
        ];
    
        const result = filterInitialData(theData);
    
        expect(result).toEqual(theData);
    });