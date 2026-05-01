// src/Table.jsx
import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Completed</th>
        <th>Name</th>
        <th>Date</th>
        <th>Repeating</th>
      </tr>
    </thead>
  );
}

/* TO DO:
- removeCharacter -> removeTask (+ corresponding functions)
- same w/ edit button*/

function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.completed}</td>
        <td>{row.name}</td>
        <td>{row.date}</td>
        <td>{row.repeating}</td>
        <td>
            <button onClick={() => props.removeCharacter(index)}>
                Delete
            </button>
        </td>
        <td>
            <button onClick={() => props.removeCharacter(index)}>
              Edit
            </button>
        </td>
      </tr>
    );
   }
  );

  return (
      <tbody>
        {rows}
       </tbody>
   );
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}

export default Table;