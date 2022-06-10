import React from "react";
import { useNavigate } from "react-router-dom";
import SalesTable from "./SalesTable";
import "./style.scss";



function SalesLeads() {
  const navigate = useNavigate();

  const onAddSalesPage = () => {
    navigate('/add')

  };



  return (
    <div className="sales-table-wrapper">

      <div className="salesbtn-table-container">

        <button type="button" onClick={onAddSalesPage} className="sales-btn">
          Add Sales
        </button>
        <SalesTable />
      </div>

    </div>
  );
}

export default SalesLeads;

