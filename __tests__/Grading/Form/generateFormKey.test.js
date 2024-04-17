

import { generateFormKey} from '../../../app/components/gradingForm4';


describe('Tests for the generateFormKey function', () => {

    let realDateNow;

    // Mock Date
    beforeEach(() => {
        // Store the real Date.now
        realDateNow = Date.now.bind(global.Date);

        // Mock Date.now to return a fixed date in local timezone
        const DATE_TO_USE = new Date('2024-04-12T00:00:00Z');
        const utcToLoc = DATE_TO_USE.getTime() + (DATE_TO_USE.getTimezoneOffset() * 60 * 1000);
        const dateNowStub = jest.fn(() => utcToLoc);
        global.Date.now = dateNowStub;
    });

    afterEach(() => {
        // Restore the real Date.now after each test
        global.Date.now = realDateNow;
    });

    // Test case 1. Returns the correct form key
    test('should return the correct form key', () => {

        const result = generateFormKey('username');
        const currentDate = new Date('2024-04-12T00:00:00Z').toISOString().slice(0, 10);
        const expected = `username-${currentDate}`;

        expect(result).toBe(expected);
       
    });

});