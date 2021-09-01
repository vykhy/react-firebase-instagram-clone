import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router'

export default function isLoggedIn({ user, loggedInPath, children, ...rest }){
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if(!user){
                    return children
                }

                if(user){
                    return(
                        <Redirect
                            to={{
                                pathname: loggedInPath,
                                state: { from: location }
                            }}
                        />
                    )
                }
                return null
            }}
        />
    )
}

isLoggedIn.propTypes = {
    user: PropTypes.object,
    loggedInPath: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
}
