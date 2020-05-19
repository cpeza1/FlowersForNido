import React, { Component } from "react";
import ReactDOM from "react-dom";

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correct: null
        };
    }

    render(){

        let createGrid = () => {
            let grid = [];
            for (let i = 0; i < 4; i++) {
              let columns = [];
              for (let j = 0; j < 11; j++) {
                columns.push(
                  // Every individual element needs its own consistent key so React can track changes.  We just construct one as row-column.
                  <td key={i + "-" + j}>
                    <div className="droppable gridElement" id={i + " " + j}>
                    </div>
                  </td>);
              }
              // The rows need keys, too.
              grid.push(<tr key={i}>{columns}</tr>);
            }
            return (<table><tbody>{grid}</tbody></table>);
        }
        return createGrid();
    }
} 

const wrapper = document.getElementById("grid");
wrapper ? ReactDOM.render(<Grid />, wrapper) : false;
