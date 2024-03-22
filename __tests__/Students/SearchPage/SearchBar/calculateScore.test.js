// tests the function used in the search bar component: calculateScore

import { calculateScore } from '../../../../app/Students/components/search-bar';

describe('Tests for the calculateScore function', () => {

  // Test case 1. Returns the correct score when the search input is included in the name
  test('should return the correct score when the search input is included in the name', () => {
    const val = { id: 1, name: 'John Doe', class: 'Math' };
    const searchInput = 'john';

    const result = calculateScore(val, searchInput);
    // nameScore = 2  if the search input is included in the name
    // nameScore2 = nameScore + 1 if the search input is included in the first part of the name
    // else nameScore2 = nameScore
    expect(result).toBe(3);
  });

  // Test case 2. Returns the correct score when the search input is included in the class
  test('should return the correct score when the search input is included in the class', () => {
    const val = { id: 1, name: 'John Doe', class: 'Math' };
    const searchInput = 'math';

    const result = calculateScore(val, searchInput);

    // classScore = 1 if the search input is included in the class
    expect(result).toBe(1);
  });

  // Test case 3. Returns the correct score when the search input is included in the id
  test('should return the correct score when the search input is included in the id', () => {
    const val = { id: 1, name: 'John Doe', class: 'Math' };
    const searchInput = '1';

    // idScore = 3 if the search input is included in the id
    const result = calculateScore(val, searchInput);

    expect(result).toBe(3);
  });

  // Test case 4. Returns the correct score when the search input is not included in the name, class, or id
  test('should return the correct score when the search input is not included in the name, class, or id', () => {
    const val = { id: 1, name: 'John Doe', class: 'Math' };
    const searchInput = 'jane';

    const result = calculateScore(val, searchInput);

    expect(result).toBe(0);
  });

  // Test case 5. Returns the correct score when the search input is included in the first part of the name
  test('should return the correct score when the search input is included in the first part of the name', () => {
    const val = { id: 1, name: 'John Doe', class: 'Math' };
    const searchInput = 'john d';

    const result = calculateScore(val, searchInput);

    expect(result).toBe(3);
  });
});




