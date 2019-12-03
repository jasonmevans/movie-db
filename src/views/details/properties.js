import React from 'react';

function Properties({ data = {}, fields = [] }) {
  return (
    <div className="movie-details--properties columns is-gapless is-multiline">
      {fields.map(([key, label, transform]) => (
        (key in data && data[key] && (
          <React.Fragment key={key}>
            <div className="column is-5 is-size-7 has-text-weight-bold">{label}</div>
            <div className="column is-7">
              {transform ? transform(data[key]) : data[key]}
            </div>
          </React.Fragment>
        ))
      ))}
    </div>
  );
}

export default Properties;
