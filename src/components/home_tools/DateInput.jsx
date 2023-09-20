import React from 'react';
import PropTypes from 'prop-types';
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

DateInput.propTypes = {
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool
};

export default DateInput;
