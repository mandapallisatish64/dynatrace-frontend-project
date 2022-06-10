import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../FormElements/ConfirmModal";
import Datepicker from "../FormElements/Datepicker";
import Input from "../FormElements/Input";
import "./style.scss";

const inputFields = ["Name", "Owner Name", "Client Name", "Value"];
const inputFieldKeys = ["name", "ownerName", "clientName", "value"];


const AddSales = () => {
  const navigate = useNavigate(); 
  const [payload, setPayload] = useState();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowErrorModal, setIsShowErrorModal] = useState(false);

  const onAddSalesHandler = (value, key) => {
    setPayload((prevState) => {
      const newState = { ...prevState };
      newState[key] = key === "value" ? parseInt(value) : value;
      const mergedObj = { ...prevState, ...newState };
      return mergedObj;
    });
  };

  const onSaveSalesHandler = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(async (value)=>{
    let response = await value.json()
    setIsShowModal(true);
   })
   .catch((err)=>{
    setIsShowErrorModal(true)
   })
   
    
  };

  const onOkClickHandler = () =>{
    setIsShowModal(false);
    setIsShowErrorModal(false)
    navigate('/')
    
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
              onClick={()=> navigate('/')}
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
      {isShowErrorModal && (
        <ConfirmModal title="Error Modal" content="Something Went Wrong" onOkClickHandler={onOkClickHandler}/>
      )}
    </div>
  );
};

export default AddSales;
