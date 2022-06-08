import React from "react";

const Input = (props) => {
  console.log("props", props);
  return (
    <div className="Input-filed-wrapper">
      <label for="html">{props.label}</label>
      <input type="text" />
    </div>
  );
};

export default Input;
