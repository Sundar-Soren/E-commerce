import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper'

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ECC71" }
    } else {
        return { color: "#2C3E50" }
    }
}

const Navbar = ({ history }) =>

(
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid nav-tabs">
                <Link className="navbar-brand" to="#">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" style={currentTab(history, '/')} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={currentTab(history, '/cart')} to="/cart">Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={currentTab(history, '/buy')} to="/buy">Buy</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={currentTab(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                        </li>
                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <li className="nav-item">
                                <Link className="nav-link" style={currentTab(history, '/admin/dashboard')} to="/admin/dashboard">Admin Dashboard</Link>
                            </li>
                        )}
                        {!isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link" style={currentTab(history, '/signup')} to="/signup">Sign up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" style={currentTab(history, '/signin')} to="/signin" >Sign in</Link>
                                </li>
                            </Fragment>
                        )}
                        {isAuthenticated() && (
                            <li className="nav-item">
                                <span
                                    className="nav-link text-success"
                                    onClick={() => {
                                        signout(() => {
                                            history.push("/")
                                        })
                                    }}
                                >
                                    Sign out
                                </span>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    </div>
)


export default withRouter(Navbar)
