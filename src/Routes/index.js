import React from "react";
import { Route, Router } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import history from '../Core/history';

const routes = () => (
    <Router history={history}>
        <div>
            <Route path="/" component={Dashboard} />
        </div>
    </Router>
);


export default routes;
