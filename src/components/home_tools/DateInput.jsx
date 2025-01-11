import DatePicker from 'react-datepicker';

const DateInput = ({ selected, onChange, required }) => (
  <DatePicker
    className="form-control"
    dateFormat="yyyy-MM-dd"
    selected={selected ? new Date(selected) : null} // Ensure the selected date is in Date format
    onChange={onChange}
    required={required}
  />
);
export default DateInput;
