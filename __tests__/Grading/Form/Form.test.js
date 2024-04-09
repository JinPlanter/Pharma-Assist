


import Form from '../../../app/components/gradingForm4';
import { render, waitFor, findAllByDisplayValue } from '@testing-library/react';
import  FormValuesProvider from '../../../app/contexts/gradeform-context'


describe('Tests for the Form component', () => {

    // Test case 1. Check if the form fields are fetched from the server
    test('should fetch form fields from the server', async () => {
        const formFields = [{ criteria: [{ label: "Criteria 1", type: "string", comment: false }] }];
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(formFields),
            })
        );

        const stud = { username: '#123', firstName: "John", lastName: "Doe" };

        const { findByText } = render(
        <>
            <FormValuesProvider>
                <Form student={stud}/>
            </FormValuesProvider>
        </>
        );
        const criteriaLabel = await findByText('Criteria 1');

        expect(criteriaLabel).toBeInTheDocument();
    });


});