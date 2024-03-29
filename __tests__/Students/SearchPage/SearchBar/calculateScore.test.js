// tests the function used in the search bar component: calculateScore

import { calculateScore } from '../../../../app/Students/components/search-bar';

describe('Tests for the calculateScore function', () => {

  // Test case 1. Returns the correct score when the search input is included in the first name
  test('should return the correct score when the search input is included in the name', () => {
    const val = { username: '#233', firstName: 'John', lastName: 'Doe'};
    const searchInput = 'John';

    const result = calculateScore(val, searchInput);
    // score += 2 if the search input is included in the first name
    // score += 1 if the first name starts with the search input
    expect(result).toBe(3);
  });

  // Test case 2. Returns the correct score when the search input is included in the last name
  test('should return the correct score when the search input is included in the class', () => {
    const val = { username: '#233', firstName: 'John', lastName: 'Doe'};
    const searchInput = 'Doe';

    const result = calculateScore(val, searchInput);

    expect(result).toBe(3);
  });

  // Test case 3. Returns the correct score when the search input is included in the username
  test('should return the correct score when the search input is included in the id', () => {
    const val = { username: '#233', firstName: 'John', lastName: 'Doe'};
    const searchInput = '#233';

    // idScore = 3 if the search input is included in the id
    const result = calculateScore(val, searchInput);
    // score += 3 if the search input is included in the username
    // score += 1 if the username starts with the search input

    expect(result).toBe(4);
  });

  // Test case 4. Returns the correct score when the search input is not included in the name, class, or id
  test('should return the correct score when the search input is not included in the name, class, or id', () => {
    const val = { username: '#233', firstName: 'John', lastName: 'Doe'};
    const searchInput = 'jane';

    const result = calculateScore(val, searchInput);

    expect(result).toBe(0);
  });

  



});
