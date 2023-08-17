import React, { useState } from "react";

const CustomNode = ({ data }) => {
  const [fileValue, setFileValue] = useState("");
  const [textInputValue, setTextInputValue] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    // Handle file input change here, e.g. upload file, process data, etc.
    // You can access the selected file using the 'file' variable.
    setFileValue(file.name); // Update state with the file name for display
  };

  const handleTextInputChange = (event) => {
    const inputValue = event.target.value;
    // Handle text input change here
    setTextInputValue(inputValue); // Update state with the input value
  };

  return (
    <div className="main_box">
      <div className="inner_box">
        <div className="img_box">
          <input type="file" onChange={handleFileInputChange} />
          {fileValue && <p>Selected File: {fileValue}</p>}
        </div>
        <input
          type="text"
          value="${nodeName}"
          onChange={handleTextInputChange}
        />
      </div>
    </div>
  );
};

export default CustomNode;
