
import { getCurrentDate } from '../../../app/components/gradingForm4';


describe('Tests for the getCurrentDate function', () => {

    // Test case 1. Returns the correct date
    // Mock Date.now to return a fixed date
    beforeEach(() => {
        jest.spyOn(Date, 'now').mockImplementation(() => new Date('2024-04-11T00:00:00Z').getTime());
    });
    
    // Clean up the mock to make sure tests are completely isolated
    afterEach(() => {
        jest.spyOn(Date, 'now').mockRestore();
    });
    
    test('getCurrentDate returns the current date', () => {
        expect(getCurrentDate()).toBe('2024-04-11');
    });

});