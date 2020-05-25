import React, { Component } from "react";
import ReactDOM from "react-dom";
import Grid from './grid'

class GridContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            correct: null
        };
    }

    render(){

        let createGrid = () => {
              let divs = [];
              for (var i = 0; i < 3; i++)
              {
                divs.push(
                    <Grid key={i} id={i}/>
                );
              }
              return divs;
            }
    return createGrid();
    }
} 

const wrapper = document.getElementById("gridcontainer");
wrapper ? ReactDOM.render(<GridContainer />, wrapper) : false;
