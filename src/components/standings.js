import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './modal';
import { fetchStandings, fetchTeams } from '../actions';

export class Standings extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        this.props.fetchStandings(id);
    }

    closeModal = () => {
        this.setState({
            isOpen: false
        });
    }

    getTeam(stand) {
        this.props.fetchTeams(stand.team_id).then(
            res => this.setState({ teams: res.payload.data.data, isOpen: true })
        )
    }

    renderStandings() {
        return _.map(this.props.standings, stand => {
            return (
                <tr key={stand.team_id} onClick={this.getTeam.bind(this, stand)}>
                    <th>{stand.position}</th>
                    <th>{stand.team_name}</th>
                    <th>{stand.overall.games_played}</th>
                    <th>{stand.overall.won}</th>
                    <th>{stand.overall.draw}</th>
                    <th>{stand.overall.lost}</th>
                    <th>{stand.overall.goals_scored} - {stand.overall.goals_against}</th>
                    <th>{stand.points}</th>
                </tr>
            );
        });
    }

    render() {
        console.log(this.state);

        return (
            <div>
                <Link className="btn btn-primary" to="/">Back</Link>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th>MP</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>G</th>
                            <th>Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderStandings()}
                    </tbody>
                </table>
                {this.state.isOpen && this.state.teams && (
                    <Modal
                        show={this.state.isOpen}
                        onClose={this.closeModal}>
                        <nav className="navbar navbar-light bg-light">
                            <p>{this.state.teams.name}</p>
                            <a onClick={this.closeModal}>x</a>
                        </nav>
                        <img src={this.state.teams.logo_path} alt={this.state.teams.name} />
                    </Modal>)
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { standings: state.standings };
}

export default connect(mapStateToProps, { fetchStandings, fetchTeams })(Standings);
