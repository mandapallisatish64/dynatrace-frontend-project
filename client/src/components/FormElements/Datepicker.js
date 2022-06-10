import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

const Datepicker = ({ onAddSalesHandler, label }) => {
  const [selectedDate, setSelectedDate] = React.useState();

  const onDateChangeHandler = (date) => {
    setSelectedDate(date);
    onAddSalesHandler(date.toISOString(), 'date');
  };
  return (
    <div className="col mt-2 custom-datepicker-wrapper">
      <div className="row">{label}</div>
      <div className="row">
        <DatePicker
          className="addsales-date-react-datepicker"
          selected={selectedDate}
          onChange={(date) => onDateChangeHandler(date)}
          placeholderText="Select Date"
        />
      </div>
    </div>
  );
};

export default Datepicker;
