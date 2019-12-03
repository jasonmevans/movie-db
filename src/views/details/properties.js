import React from 'react';

function Properties({ data = {}, fields = [] }) {
  return (
    <div className="movie-details--properties">
      {
        fields.map(([key, label, transform]) => (
          (key in data && data[key] && (
            <div className="movie-details--properties-row" key={key}>
              <div>{label}</div>
              <div>{transform ? transform(data[key]) : data[key]}</div>
            </div>
          ))
        ))
      }
    </div>
  );
}

export default Properties;
