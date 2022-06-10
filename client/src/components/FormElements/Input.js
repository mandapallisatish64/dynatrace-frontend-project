import React, { useState } from "react";
import "./style.scss";

const Input = ({name,label,onAddSalesHandler}) => {
  const [value, setValue] = useState("");
  const abcd = (event, key) => {
    console.log("345tfc");
    console.log(event.target.name)
    setValue(event.target.value);
    onAddSalesHandler(event.target.value, event.target.name);
  };

  return (
    <div className="Input-filed-wrapper">
      <div className="col mt-2">
        <div className="row">{label}</div>
        <div className="row">
          <div className="form-group">
            <input
              type="text"
              name={name}
              className="add-sales-input"
              placeholder={label}
              required
              value={value}
              onChange={(event) => abcd(event, label)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
