import React from "react";
import { useState } from "react";

const arrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-arrow-down"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
    />
  </svg>
);

const arrowUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-arrow-up"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
    />
  </svg>
);
const columns = [
  { title: "Name", type: "string", dataIndex: "name" },
  { title: "Value", type: "number", dataIndex: "value" },
  { title: "Date", type: "date", dataIndex: "date" },
  { title: "Owner Name", type: "string", dataIndex: "ownerName" },
  { title: "Client Name", type: "string", dataIndex: "clientName" },
  { title: "Delete" },
];
const data = [
  {
    name: "leadname1",
    ownerName: "Jack",
    clientName: "Amazon",
    value: "125678",
    date: "10/20/2022",
    delete: "X",
  },
  {
    name: "leadname2",
    ownerName: "Johnson",
    clientName: "Pandora",
    value: "5432",
    date: "11/20/2022",
    delete: "X",
  },

  {
    name: "leadnam3",
    ownerName: "Rick",
    clientName: "Shein",
    value: "2345",
    date: "15/20/2022",
    delete: "X",
  },
];


const SalesTable = () => {

    const [tableData,setTableData] = useState(data)
    const handleSorting = (header) => {
        if (header.type === "string") {
          data.sort((a, b) => {
            return a[header.dataIndex].localeCompare(b[header.dataIndex]);
          });
        }

        setTableData(data)
      };
  return (
    <table class="table">
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
                    class="bi bi-arrow-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
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
        {tableData.map((salesData) => {
          return (
            <tr>
              <td colSpan="1">{salesData.name}</td>
              <td>{salesData.value}</td>
              <td>{salesData.date}</td>
              <td>{salesData.ownerName}</td>
              <td>{salesData.clientName}</td>
              <td>{salesData.delete}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SalesTable;
