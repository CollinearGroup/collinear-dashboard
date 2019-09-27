import React, { Fragment } from 'react';

export function FoosBallDropdown({
  list,
  listKey,
  value,
  labelText,
  defaultText,
  updateForm,
  formKey
}) {
  function renderOption(option) {
    let value = option;
    if (listKey) {
      value = option[listKey];
    }
    return (
      <option key={value} value={value}>
        {value}
      </option>
    );
  }

  function onChange(e) {
    console.log(e.target.value, formKey);
    updateForm({ [formKey]: e.target.value });
  }

  return (
    <Fragment>
      <label htmlFor={formKey}>{labelText}</label>
      <select key={formKey} value={value} onChange={onChange}>
        <option default value="">
          {defaultText}
        </option>
        {list.map(renderOption)}
      </select>
    </Fragment>
  );
}
