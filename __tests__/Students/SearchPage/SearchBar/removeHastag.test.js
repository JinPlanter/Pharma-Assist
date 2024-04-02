
import { removeHashtag } from '../../../../app/Students/components/search-bar';

describe('Tests for the removeHashtag function', () => {

    // Test Case 1: Removes a hashtag from a username string containing a single hashtag
    test('should remove the hashtag when the username contains a single hashtag', () => {
      const username = "john#";
      const result = removeHashtag(username);
      expect(result).toBe("john");
    });


    // Test case 2: Should return an empty string if the input is an empty string
    test('should return an empty string when the input is an empty string', () => {
      const username = "";
      const result = removeHashtag(username);
      expect(result).toBe("");
    });
    
});
