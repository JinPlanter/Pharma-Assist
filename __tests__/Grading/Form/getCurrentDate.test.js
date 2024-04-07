
import { getCurrentDate } from '../../../app/components/gradingForm4';


describe('Tests for the getCurrentDate function', () => {

    // Test case 1. Returns the correct date
    test('should return the correct date', () => {
        const result = getCurrentDate();
        const date = new Date();
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        const expected = localDate.toISOString().slice(0, 10);
    
        expect(result).toBe(expected);
    });

});