

import { generateFormKey} from '../../../app/components/gradingForm4';


describe('Tests for the generateFormKey function', () => {

    // Test case 1. Returns the correct form key
    test('should return the correct form key', () => {

        const result = generateFormKey('username');
        const currentDate = new Date().toISOString().slice(0, 10);
        const expected = `username-${currentDate}`;

        expect(result).toBe(expected);
       
    });

});