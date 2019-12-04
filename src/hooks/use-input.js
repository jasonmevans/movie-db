import React, { useState } from 'react';

/**
 * Adapted from https://stackoverflow.com/questions/55757761/handle-an-input-with-react-hooks
 */
export default function useInput(initial = '', { onChange, ...inputProps }) {
  const [value, setValue] = useState(initial);
  const input = <input
    value={value}
    type="text"
    onChange={
      (event) => {
        const { target: { value } } = event;
        onChange && onChange(event);
        setValue(value);
      }
    }
    {...inputProps}
  />
  return [value, input];
}
