

import { render, fireEvent } from '@testing-library/react';
import ClassList from '../../app/components/classList';

describe('ClassList', () => {
    const mockOnStudentClick = jest.fn();

    const students = [
        { firstName: 'John', lastName: 'Doe', username: '#012345' },
        { firstName: 'Jane', lastName: 'Doe', username: '#234567' },
        { firstName: 'Alice', lastName: 'Smith', username: '#123456' },
    ];

    // Test case 1
    test('renders correctly', () => {
        const { getByText } = render(<ClassList classlist={students} onStudentClick={mockOnStudentClick} />);

        students.forEach(student => {
            const name = `${student.firstName} ${student.lastName}`;
            expect(getByText(name)).toBeInTheDocument();
        });
    });

    // Test case 2
    test('sorts students correctly', () => {
        const { getAllByRole } = render(<ClassList classlist={students} onStudentClick={mockOnStudentClick} />);

        const sortedStudents = [...students].sort((a, b) => {
            const firstNameComparison = a.firstName.localeCompare(b.firstName);
            if (firstNameComparison === 0) {
                return a.lastName.localeCompare(b.lastName);
            }
            return firstNameComparison;
        });

        const renderedStudents = getAllByRole('listitem').map(li => li.textContent);
        const expectedStudents = sortedStudents.map(student => `${student.firstName} ${student.lastName}`);

        expect(renderedStudents).toEqual(expectedStudents);
    });

    // Test case 3
    test('calls onStudentClick when a student is clicked', () => {
        const { getByText } = render(<ClassList classlist={students} onStudentClick={mockOnStudentClick} />);

        const studentElement = getByText(`${students[0].firstName} ${students[0].lastName}`);
        fireEvent.click(studentElement);

        expect(mockOnStudentClick).toHaveBeenCalledWith(students[0]);
    });
});