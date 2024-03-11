"use client";

import React, { useState } from 'react';

function MyForm() {
  const [formValues, setFormValues] = useState({ toggle: false, comment: '' });

  const handleToggle = () => {
    setFormValues(prevState => ({ ...prevState, toggle: !prevState.toggle }));
  };

  const handleCommentChange = (e) => {
    setFormValues({
      ...formValues,
      comment: e.target.value
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <label>
          True/False:
          <button onClick={handleToggle}>
            {formValues.toggle ? 'True' : 'False'}
          </button>
        </label>
      </div>
      <div>
        <label>
          Comment:
          <textarea value={formValues.comment} onChange={handleCommentChange} />
        </label>
      </div>
    </div>
  );
}

export default MyForm;