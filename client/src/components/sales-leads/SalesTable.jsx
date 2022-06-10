import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../form-elements/ConfirmModal";

const columns = [
  { title: "Name", type: "string", dataIndex: "name" },
  { title: "Value", type: "number", dataIndex: "value" },
  { title: "Date", type: "date", dataIndex: "date" },
  { title: "Owner Name", type: "string", dataIndex: "ownerName" },
  { title: "Client Name", type: "string", dataIndex: "clientName" },
  { title: "Delete" },
];


const SalesTable = () => {
  const [tableData, setTableData] = useState([]);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [seletectedSale, setSeletectedSale] = useState();

  useEffect(() => {
    getSalesData()

  }, [])
  const getSalesData = async () => {
    const response = await fetch('http://localhost:3000/api/leads')
    let data = await response.json()
    console.log(data)
    setTableData([...data])
  }
  const handleSorting = (header) => {
    setTableData((prevState) => {
      const newState = [...prevState];
      newState.sort((a, b) =>
        a[header.dataIndex].localeCompare(b[header.dataIndex])
      );
      console.log(newState);
      return newState;
    });

  };

  const onDeleteCLickHandler = (rowId) => {
    console.log("deleteee", rowId)
    setSeletectedSale(rowId);
    setIsShowConfirmModal(true);
  };

  const onOkDeleteSalesHandler = async () => {
    const response = fetch(`http://localhost:3000/api/leads/${seletectedSale}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(async (value) => {
      console.log("enteredd")
      console.log(value)
      const data = await value.json()
      setTableData([...data])
    })

    setIsShowConfirmModal(false);
  };
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {columns.map((header) => (
              <th scope="col">
                {
                  <div onClick={() => handleSorting(header)}>
                    <span>{header.title}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                      />
                    </svg>
                  </div>
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length !== 0 && tableData.map((salesData) => {
            return (
              <tr key={salesData.id}>
                <td colSpan="1">{salesData.name}</td>
                <td>{salesData.value}</td>
                <td>{salesData.date}</td>
                <td>{salesData.ownerName}</td>
                <td>{salesData.clientName}</td>
                <td>
                  <div onClick={() => onDeleteCLickHandler(salesData.id)}>
                    X
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isShowConfirmModal && (
        <ConfirmModal
          title="Confirmation Modal"
          content="Are you sure you want to delete?"
          onOkClickHandler={onOkDeleteSalesHandler}
          onCancelClickhandler={() => setIsShowConfirmModal(false)}
        />
      )}
    </>
  );
};

export default SalesTable;
