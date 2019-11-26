import React from 'react';

function Properties(props = {}) {
  console.log(Object.entries(props.data));

  const { data, fields } = props;

  return (
    <>
      {
        fields.map(([key, label]) => (
          <div key={key}>
            <div>{label}</div>
            <div>{data[key]}</div>
          </div>
        ))
      }
    </>
  );
}

export default Properties;
