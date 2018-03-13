import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import Leagues from "./components/leagues";
import Standings from "./components/standings";
import Teams from "./components/teams";
import Squad from "./components/squad";
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    {/* <Route path="/team/:id" component={Teams} /> */}
                    <Route path="/league/:id" component={Standings} />
                    <Route path="/" component={Leagues} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container'));
