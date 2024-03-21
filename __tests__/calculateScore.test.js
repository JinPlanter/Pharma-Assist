// tests the function used in the search bar component: calculateScore

import { calculateScore } from '../app/Students/components/search-bar';



// 1. Returns the correct score when the search input is included in the name
test('should return the correct score when the search input is included in the name', () => {
    const val = { id: 1, name: 'John Doe', class: 'Math' };
    const searchInput = 'john';

    const result = calculateScore(val, searchInput);

    expect(result).toBe(3);
  });


// 2. Returns the correct score when the search input is included in the class
test('should return the correct score when the search input is included in the class', () => {
    const val = { id: 1, name: 'John Doe', class: 'Math' };
    const searchInput = 'math';

    const result = calculateScore(val, searchInput);

    expect(result).toBe(1);
  });


// 3. Returns the correct score when the search input is included in the id
test('should return the correct score when the search input is included in the id', () => {
    const val = { id: 1, name: 'John Doe', class: 'Math' };
    const searchInput = '1';

    const result = calculateScore(val, searchInput);

    expect(result).toBe(3);
  });


// 4. Returns the correct score when the search input is not included in the name, class, or id
test('should return the correct score when the search input is not included in the name, class, or id', () => {
    const val = { id: 1, name: 'John Doe', class: 'Math' };
    const searchInput = 'jane';

    const result = calculateScore(val, searchInput);

    expect(result).toBe(0);
  });


// 5. Returns the correct score when the search input is included in the first part of the name
test('should return the correct score when the search input is included in the first part of the name', () => {
    const val = { id: 1, name: 'John Doe', class: 'Math' };
    const searchInput = 'john d';

    const result = calculateScore(val, searchInput);

    expect(result).toBe(3);
  });



