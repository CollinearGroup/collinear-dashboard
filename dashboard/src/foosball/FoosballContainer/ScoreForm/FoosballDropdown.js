import React from "react";

export function FoosballDropdown({
  list,
  listKey,
  value,
  labelText,
  defaultText,
  updateForm,
  formKey,
  alreadySelected = []
}) {
  function renderOption(option) {
    let value = option;
    if (listKey) {
      value = option[listKey];
    }
    return (
      <option
        key={value}
        value={value}
        disabled={alreadySelected.includes(value)}
      >
        {value}
      </option>
    );
  }

  function onChange(e) {
    updateForm({ [formKey]: e.target.value });
  }

  return (
    <div>
      <div style={{ fontSize: "14px" }}>{labelText}</div>
      <select key={formKey} value={value} onChange={onChange}>
        <option default disabled value="">
          {defaultText}
        </option>
        {list.map(renderOption)}
      </select>
    </div>
  );
}
