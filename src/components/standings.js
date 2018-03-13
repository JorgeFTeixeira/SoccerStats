import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './modal';
import Squad from './squad';
import { fetchStandings, fetchTeams } from '../actions';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import { createStore } from 'redux';

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
                            <div className="container-fluid">
                                <div className="navbar-header row modal-header">
                                    <h3 className="col-md-11">{this.state.teams.name}</h3>
                                    <button className="btn btn-primary btn-sm" onClick={this.closeModal}>x</button>
                                </div>
                            </div>
                        </nav>
                        <div className="row">
                            <div className="col-md-3">
                                <img className="team-logo" src={this.state.teams.logo_path} alt={this.state.teams.name} />
                            </div>
                            <div className="col-md-8">
                                <Provider store={createStore(reducers)}>
                                    <Squad team={this.state.teams.squad} />
                                </Provider>
                            </div>
                        </div>

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
