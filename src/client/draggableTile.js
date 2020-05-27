import React, { Component } from "react";
import ReactDOM from "react-dom";

class DraggableTile extends Component {

    handleClick(e, data)  {

        console.log(e.target.id);
      }

    render(){
        const id = this.props.id;
        return (
            <div id={"tile"+id}  
            className="draggable tile inToolbox"
            //onClick={((e) => this.handleClick(e, this))}
            ></div>)
    }
} 

export default DraggableTile;