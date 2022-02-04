import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="input-group has-validation">
        <textarea
          className="form-control"
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          rows="3"
        ></textarea>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string
};

export default TextAreaField;
