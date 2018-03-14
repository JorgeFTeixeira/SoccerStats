import _ from 'lodash';
import React, { Component } from 'react'
import { ROOT_URL } from '../actions';
import { API_KEY } from '../actions';
import axios from 'axios';

export class Squad extends Component {
    constructor(props) {
        super(props)
        this.state = { players: [] };
        this.props.team.data.map(p => {
            this.buildArray(p, p.player_id)
        })
    }

    buildArray(p, id) {
        const request = axios.get(`${ROOT_URL}/players/${id}${API_KEY}`).then((res) => {
            var player = [p, res.data.data];
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
                    <td>{player[0].goals}</td>
                    <td>{player[0].assists}</td>
                </tr>
            );
        });
    }

    render() {
        if (this.props.team.data.length != this.state.players.length)
            return <div>Loading...</div>
        return (
            <div className="squad-tbl">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Nationality</th>
                            <th scope="col">Played</th>
                            <th scope="col">Yellow</th>
                            <th scope="col">Red</th>
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
