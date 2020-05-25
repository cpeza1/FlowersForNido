import React, { Component } from "react";
import ReactDOM from "react-dom";

const Grid = (props) => {
        const {id } = props;
        let gridId = id;
        let createGrid = () => {
            let grid = [];
            for (let i = 0; i < 4; i++) {
              let columns = [];
              for (let j = 0; j < 11; j++) {
                columns.push(
                  // Every individual element needs its own consistent key so React can track changes.  We just construct one as row-column.
                  <td key={i + "-" + j}>
                    <div className="droppable gridElement" id={gridId + " " + i + " " + j}>
                    </div>
                  </td>);
              }
              // The rows need keys, too.
              grid.push(<tr key={i}>{columns}</tr>);
            }
            return (<div id="grid" className="gridView"><table><tbody>{grid}</tbody></table></div>);
        }
        return createGrid();
} 

export default Grid;

// const wrapper = document.getElementById("grid");
// wrapper ? ReactDOM.render(<Grid />, wrapper) : false;
