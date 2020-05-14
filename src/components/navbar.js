import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component{

    render() {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Admin and Store Manager</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/adminLogin" className="nav-link">Admin Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/smLogin" className="nav-link">Store Manager Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            );

    }

}

export default Navbar;