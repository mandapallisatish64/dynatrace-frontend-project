import React, { useCallback, useState } from "react";
import { getSalesLeadsData } from "./data";
import Table from "./table";
import SalesTable from "./SalesTable";
import "./style.scss";
import AddSales from "../add-sales-lead/index";

const salesLeadsData = getSalesLeadsData(50);

function SalesLeads() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [showAddpage, setShowAddpage] = React.useState(false);
  const fetchIdRef = React.useRef(0);
  const sortIdRef = React.useRef(0);

  const columns = React.useMemo(
    () => [
      {
        Header: "Lead Name",
        accessor: "leadName",
      },
      {
        Header: "Sales Rep",
        accessor: "salesRep",
      },
      {
        Header: "Clients",
        accessor: "clients",
      },
      {
        Header: "Value",
        accessor: "amount",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(salesLeadsData.slice(startRow, endRow));
        setPageCount(Math.ceil(salesLeadsData.length / pageSize));
        setLoading(false);
      }
    }, 1000);
  }, []);

  const handleSort = useCallback(({ sortBy, pageIndex, pageSize }) => {
    const sortId = ++sortIdRef.current;
    setLoading(true);
    setTimeout(() => {
      if (sortId === sortIdRef.current) {
        let sorted = salesLeadsData.slice();
        sorted.sort((a, b) => {
          for (let i = 0; i < sortBy.length; ++i) {
            if (a[sortBy[i].id] > b[sortBy[i].id])
              return sortBy[i].desc ? -1 : 1;
            if (a[sortBy[i].id] < b[sortBy[i].id])
              return sortBy[i].desc ? 1 : -1;
          }
          return 0;
        });
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(sorted.slice(startRow, endRow));
        console.log(sorted.slice(0, 10));
        setLoading(false);
      }
    }, 200);
  }, []);

  const onAddSalesPage = () => {
    console.log("enttedc");
    setShowAddpage(true);
  };

  return (
    <div className="sales-table-wrapper">
      <button type="button" onClick={onAddSalesPage} className="sales-btn">
        Add Sales
      </button>
      {showAddpage ? <AddSales /> : <SalesTable />}
    </div>
  );
}

export default SalesLeads;

{
  /* <Table
        columns={columns}
        data={data}
        onSort={handleSort}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      /> */
}
