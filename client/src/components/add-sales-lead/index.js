import React from "react";
import "./style.scss";
import Input from "../input";

const inputFields = ["Name", "Owner Name", "Client Name", "Date", "Value"];

const AddSales = () => {
  console.log("entered sales");
  return (
    <div className="add-sales-pagewrapper">
      <h3>Add Sales Lead</h3>
      <p>Enter Sales Lead Information below</p>
      {inputFields.map((field) => (
        <Input label={field} />
      ))}
    </div>
  );
};

export default AddSales;
