import React from 'react';

import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ loginedUser, component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => (loginedUser && loginedUser?.data?.token ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            ))
            }
        />
    );
};

export const PublicRoute = ({ loginedUser, component: Component, ...rest }) => {

    if (loginedUser && loginedUser?.data?.token) {
        return <Redirect to="/dashboard" />;
    }

    return <Route {...rest} component={Component} />;
};