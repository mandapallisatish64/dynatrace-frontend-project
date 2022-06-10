import React from "react";
import { useNavigate } from "react-router-dom";
import AddSales from "../add-sales-lead/index";
import SalesTable from "./SalesTable";
import "./style.scss";



function SalesLeads() {
  const navigate = useNavigate();
  const [showAddpage, setShowAddpage] = React.useState(false);
  const onAddSalesPage = () => {
    navigate('/add')

  };

  const onCancelClickHandler = () => {
    setShowAddpage(false);
  };

  return (
    <div className="sales-table-wrapper">
      {showAddpage ? (
        <AddSales onCancelClickHandler={onCancelClickHandler} />
      ) : (
        <div className="salesbtn-table-container">

          <button type="button" onClick={onAddSalesPage} className="sales-btn">
            Add Sales
          </button>
          <SalesTable />
        </div>
      )}
    </div>
  );
}

export default SalesLeads;

