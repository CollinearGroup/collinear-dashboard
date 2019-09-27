import React from 'react'

export function FoosBallDropdown({ list, value, onChange }) {

  function renderOption({ name, id }) {
    return <option value={name}>{name}</option>
  }

  return (
    <select value={value}  >
      {list.map(renderOption)}
    </select>
  )