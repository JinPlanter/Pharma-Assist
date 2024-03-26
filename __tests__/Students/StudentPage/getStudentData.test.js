

// tests the getStudentData function used in the student page
import { getStudentData } from '../../../app/Students/[username]/page';


describe('Tests for getStudentData function', () => {

    // mock the fetch function before each test
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 1, name: 'John Doe', class: 'Class 1' }])
            })
        );
    });


    // clear the mock after each test
    afterEach(() => {
        global.fetch.mockClear();
    });
    

    // Test case 1. Fetch should be called with the correct url
    test('should call fetch with the correct url', async () => {
        const id = 1;
        await getStudentData(id);

        //assert that fetch was called with the correct url
        expect(global.fetch).toHaveBeenCalledWith(`/api/Students/${id}`);
    });


    // Test case 2. Return value should be the student object for the given id
    test('should return data for a given id', async () => {
        const id =1;

        const student = await getStudentData(id);

        //assert that the student object is returned
        expect(student).toEqual([{ id: 1, name: 'John Doe', class: 'Class 1' }]);
    });

    
});