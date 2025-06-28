import React from "react";

function DataList({ data }) {
  return (
    <div>
      <h2>Submitted Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.name} - {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataList;
