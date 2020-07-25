import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';
import { getListOfTeams, adminConnect } from './networking';


class TeamList extends Component {
    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this)
        this.state = {
            teams: []
        };
    }

    componentDidMount() {
        Promise.all([
            adminConnect(this.handleData),
          ]).then(() => {
            getListOfTeams();
          }).catch(console.error);
      }

    handleData(teamList) {
        // console.log(teamList);
        this.setState({teams: teamList})
    }

    render(){

        let createGrid = () => {
            var teamNum = this.state.teams.length;

            if (teamNum == 0) {
                return <td>No teams have been created yet</td>
            }

              let grid = [];
              var root = location.protocol + '//' + location.host;
              root += "/?team=";
              for (var i = 0; i < teamNum; i++)
              {
                var link = root + this.state.teams[i][0];
                grid.push(
                    <tr key={i}>
                        <td>
                            <div>
                                {this.state.teams[i][0]}
                            </div>
                        </td>
                        <td>
                            <div>
                                {this.state.teams[i][1]}
                            </div>
                        </td>
                        <td>
                            <div>
                                <a href={link}>link</a>
                            </div>
                        </td>
                    </tr>
                    );

              }
              return (
              <table className="Teams">
                <thead>
                    <th>Team ID</th>
                    <th>Number of players</th>
                    <th></th>
                </thead>
                <tbody>{grid}</tbody>
              </table>
              );
            }
    return createGrid();
    }
} 

const wrapper = document.getElementById("teamList");
wrapper ? ReactDOM.render(<TeamList />, wrapper) : false;
