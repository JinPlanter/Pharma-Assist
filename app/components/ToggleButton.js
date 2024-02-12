import React, { useState } from "react";

const ToggleButton = () => {
  const [toggle, setToggle] = useState(true);

  const triggerToggle = () => {
    setToggle(!toggle);
  };

  {/* TODO: Change colors so it's clearer for the end-user the current state of the button*/}
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">
          Current state: {toggle ? "true" : "false"}
        </span>
        <input
          type="checkbox"
          className="toggle"
          defaultChecked
          onChange={triggerToggle}
        />
      </label>
    </div>
  );
};

export default ToggleButton;
