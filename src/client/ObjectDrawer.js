import React, { Component } from "react";
import ReactDOM from "react-dom";
import  DraggableTile  from "./draggableTile"

class ObjectDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correct: null
        };
    }

    render(){
        let tiles = [];
        for (var i = 0; i <40; i++)
        {
            let tile = (<DraggableTile id={i}/>);
            tiles.push(tile);
        }

        return (
            <div>
                { tiles}
            </div>
        )
    }
} 

const wrapper = document.getElementById("drawerArea");
wrapper ? ReactDOM.render(<ObjectDrawer />, wrapper) : false;
