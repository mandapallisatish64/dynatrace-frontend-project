import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import arrow from "../../assets/arrow.svg";
import { Values } from "../../constants/index";
import ConfirmModal from "../FormElements/ConfirmModal";

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
  const [sortOrder, setSortOrder] = useState(false)

  useEffect(() => {
    getSalesData()

  }, [])
  const getSalesData = async () => {
    console.log("entered sales data")
    console.log(Values)
    const response = await fetch(`${Values.Service_Url}`)
    let data = await response.json();
    data.map((item) => item.date = item.date.substring(0, 10))
    console.log(data)
    setTableData([...data])
  }
  const handleSorting = () => {

    if (sortOrder) {

      let sortedValues = tableData.sort((a, b) => a.value - b.value)

      setTableData(sortedValues)
    }
    else {

      let sortedValues = tableData.sort((a, b) => b.value - a.value);

      setTableData(sortedValues)
    }
    setSortOrder(!sortOrder)

  };

  const onDeleteCLickHandler = (rowId) => {
    setSeletectedSale(rowId);
    setIsShowConfirmModal(true);
  };

  const onOkDeleteSalesHandler = async () => {
    fetch(`${Values.Service_Url}/${seletectedSale}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(async (value) => {
      const data = await value.json()
      setTableData([...data])
    })
      .catch((err) => {
        console.log(err)
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
                    {header.title === "Value" &&
                      <img src={arrow} alt="Arrow" className={sortOrder ? "up-arrow" : ''} />
                    }

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
                <td>{salesData.name}</td>
                <td>{salesData.value}</td>
                <td>{salesData.date}</td>
                <td>{salesData.ownerName}</td>
                <td>{salesData.clientName}</td>
                <td>
                  <div onClick={() => onDeleteCLickHandler(salesData.id)} className="delet-button">
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
