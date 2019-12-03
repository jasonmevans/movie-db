import React from 'react';

function Properties({ data = {}, fields = [] }) {
  return (
    <div className="columns is-gapless is-multiline">
      {fields.map(([key, label, transform]) => (
        (key in data && data[key] && (
          <>
            <div className="column is-5">{label}</div>
            <div className="column is-7">
              {transform ? transform(data[key]) : data[key]}
            </div>
          </>
        ))
      ))}
    </div>
  );
}

export default Properties;
