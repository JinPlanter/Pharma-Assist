

function EditableField({ isEditing, name, placeholder, value, onChange }) {
    return (
        <div className="flex flex-row justify-between">
            {isEditing ? (
                <input
                    className='text-lg bg-transparent rounded-md border border-white px-4 py-3'
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={value || ""}
                    onChange={onChange}
                />
            ) : (
                <div className="text-lg">{placeholder}</div>
            )}
        </div>
    );
};

export default EditableField;