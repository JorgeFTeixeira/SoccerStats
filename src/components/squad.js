import _ from 'lodash';
import React, { Component } from 'react'

import axios from 'axios';
const ROOT_URL = "https://soccer.sportmonks.com/api/v2.0";
const API_KEY = "?api_token=HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC";
/* const API_KEY = "?api_token=tZsS8mf8Rk6v9HSWJEPPqNqxXCdcWdpJiFAxhMYhwATBfhAipdGLMWzPCPPq"; */

export class Squad extends Component {
    constructor(props) {
        super(props)
        this.state = { players: [] };
        this.props.team.data.map(p => {
            this.buildArray(p, p.player_id)
        })
        /* this.buildArray(this.props.team.data[0], "107") */
    }

    buildArray(p, id) {
        const request = axios.get(`${ROOT_URL}/players/${id}${API_KEY}`).then((res) => {

            var player = [p, res.data.data];
            console.log(player);

            this.setState(() => {
                return {
                    players: [...this.state.players, player]
                }
            })
        });
    }

    renderTable() {
        return _.map(this.state.players, player => {
            return (
                <tr>
                    <td><img src={player[1].image_path} alt={player[1].fullname} height="45" width="45" /></td>
                    <td>{player[0].number}</td>
                    <td>{player[1].fullname}</td>
                    <td>{player[1].nationality}</td>
                    <td>{player[0].appearences}</td>
                    <td>{player[0].yellowcards}</td>
                    <td>{player[0].redcards}</td>
                    <td>{player[0].minutes}</td>
                    <td>{player[0].goals}</td>
                    <td>{player[0].assists}</td>
                </tr>
            );
        });
    }

    render() {
        if (this.props.team.data.length != this.state.players.length)
            return <div>Loading...</div>
        console.log(this.state);

        return (
            <div className="squad-tbl">
                <table className="table table-sm table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Nationality</th>
                            <th scope="col">M. Played</th>
                            <th scope="col">Yellow</th>
                            <th scope="col">Red</th>
                            <th scope="col">Min</th>
                            <th scope="col">G</th>
                            <th scope="col">A</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Squad;
