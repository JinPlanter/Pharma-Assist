
import { getCurrentDate } from '../../../app/components/gradingForm4';


describe('Tests for the getCurrentDate function', () => {

    
    // Mock Date
    let realDateNow;

    beforeEach(() => {
        // Store the real Date.now
        realDateNow = Date.now.bind(global.Date);

        // Mock Date.now to return a fixed date in local timezone
        const DATE_TO_USE = new Date();
        const utcToLoc = DATE_TO_USE.getTime() + (DATE_TO_USE.getTimezoneOffset() * 60 * 1000);
        const dateNowStub = jest.fn(() => utcToLoc);
        global.Date.now = dateNowStub;
    });

    afterEach(() => {
        // Restore the real Date.now after each test
        global.Date.now = realDateNow;
    });
    
    // Test case 1. Returns the correct date
    test('getCurrentDate returns the current date', () => {
        const currentDate = new Date().toISOString().slice(0, 10);
        expect(getCurrentDate()).toBe(currentDate);
    });

});