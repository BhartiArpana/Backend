import React from "react";


export const FormGroup = ({label,placeholder,value,onChange}) => {
  return (
    <div className="form-group">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
      value={value}
      onChange={onChange}
        autoComplete='false'
        type={label.toLowerCase() === "password" ? "password" : "text"}
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormGroup;
