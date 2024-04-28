import { render, screen, fireEvent } from '@testing-library/react';
import EditableField from '../../../app/components/inputEditStudentInfo';

describe('EditableField', () => {
    const mockOnChange = jest.fn();

    // Test case 1. Renders input field when isEditing is true
    test('renders input field when isEditing is true', () => {
        render(<EditableField isEditing={true} name="test" placeholder="Test Placeholder" value="Test Value" onChange={mockOnChange} />);
        const inputElement = screen.getByPlaceholderText(/Test Placeholder/i);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement.value).toBe('Test Value');
    });

    // Test case 2. Renders text when isEditing is false
    test('renders text when isEditing is false', () => {
        render(<EditableField isEditing={false} name="test" placeholder="Test Placeholder" value="Test Value" onChange={mockOnChange} />);
        const divElement = screen.getByText(/Test Placeholder/i);
        expect(divElement).toBeInTheDocument();
    });

    // Test case 3. Calls onChange when input value changes
    test('calls onChange when input value changes', () => {
        render(<EditableField isEditing={true} name="test" placeholder="Test Placeholder" value="Test Value" onChange={mockOnChange} />);
        const inputElement = screen.getByPlaceholderText(/Test Placeholder/i);
        fireEvent.change(inputElement, { target: { value: 'New Value' } });
        expect(mockOnChange).toHaveBeenCalled();
    });

    
    // Test case 4. Renders text when value is null (i.e., makes no changes to the value prop when it is null)
    test('renders correctly with different props', () => {
        render(<EditableField isEditing={true} name="differentTest" placeholder="Different Placeholder" value="Different Value" onChange={mockOnChange} />);
        const inputElement = screen.getByPlaceholderText(/Different Placeholder/i);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement.value).toBe('Different Value');
    });

    // Test case 5. Renders correctly when value is null (is null and stays null if not changed by user input)
    test('renders correctly when value is null', () => {
        render(<EditableField isEditing={true} name="test" placeholder="Test Placeholder" value={null} onChange={mockOnChange} />);
        const inputElement = screen.getByPlaceholderText(/Test Placeholder/i);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement.value).toBe('');
    });
});