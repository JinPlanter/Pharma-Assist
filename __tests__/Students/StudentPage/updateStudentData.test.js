import { updateStudentData } from '../../../app/Students/[username]/page'
import fetchMock from 'fetch-mock';

afterEach(() => {
    fetchMock.restore();
});

describe('updateStudentData', () => {

    // Test case 1 - should update the student data successfully
    test('should update the student data successfully', async () => {
        const student = { firstName: 'John', lastName: 'Doe' };
        const username = 'johndoe';

        fetchMock.put(`/api/Students/${username}`, {
            status: 200,
            body: student
        });

        const response = await updateStudentData(username, student);

        expect(response).toEqual(student);
        expect(fetchMock.called(`/api/Students/${username}`)).toBe(true);
    });

    // Test case 2 - should throw an error when the server responds with a non-200 status code
    test('should throw an error when the server responds with a non-200 status code', async () => {
        const student = { firstName: 'John', lastName: 'Doe' };
        const username = '#1234';

        fetchMock.put(`/api/Students/${username}`, {
            status: 500
        });

        await expect(updateStudentData(username, student)).rejects.toThrow();
        expect(fetchMock.called(`/api/Students/${username}`)).toBe(true);
    });
});