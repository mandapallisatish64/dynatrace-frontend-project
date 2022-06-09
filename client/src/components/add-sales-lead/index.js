import React, { useState } from "react";
import ConfirmModal from "../form-elements/ConfirmModal";
import Datepicker from "../form-elements/Datepicker";
import Input from "../form-elements/Input";
import "./style.scss";

const inputFields = ["Name", "Owner Name", "Client Name", "Value"];
const inputFieldKeys = ["name", "ownerName", "clientName", "value"];


const AddSales = (props) => {
  const [payload, setPayload] = useState();
  const [isShowModal, setIsShowModal] = useState(false);

  const onAddSalesHandler = (value, key) => {
    setPayload((prevState) => {
      const newState = { ...prevState };
      newState[key] = key === "value" ? parseInt(value) : value;
      const mergedObj = { ...prevState, ...newState };
      return mergedObj;
    });
  };

  const onSaveSalesHandler = (event) => {
    console.log("payload", payload);
    fetch('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(async (value)=>{
    let response = await value.json()
    console.log("cominggg")
    console.log(response)
    })
    setIsShowModal(true);
    event.preventDefault();
  };

  const onOkClickHandler = () =>{
    setIsShowModal(false);

  }

  return (
    <div className="add-sales-pagewrapper">
      <h3>Add Sales Lead</h3>
      <p>Enter Sales Lead Information below</p>

      <form method="post" onSubmit={onSaveSalesHandler}>
        {inputFields.map((field,index) => (
          <Input label={field} onAddSalesHandler={onAddSalesHandler} name={inputFieldKeys[index]}/>
        ))}

        <Datepicker onAddSalesHandler={onAddSalesHandler} label="Date" />

        <div className="button-wrapper row mt-4">
          <div className="cancel-sales col">
            <button
              className="cancel-sales-btn"
              onClick={props.onCancelClickHandler}
            >
              Cancel
            </button>
          </div>
          <div className="save-sales col">
            <button
              type="submit"
              className="save-sales-btn"
              data-toggle="modal"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      {isShowModal && (
        <ConfirmModal title="Sales added" content="Sales added successfully" onOkClickHandler={onOkClickHandler}/>
      )}
    </div>
  );
};

export default AddSales;
