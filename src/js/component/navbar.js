import React from "react";
import { Link } from "react-router-dom";
//asdjla
export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1" style={{marginLeft: "20px"}}>Juan Cruz Contact List</span>
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-success" style={{marginRight:"20px"}}>Check the Context in action</button>
				</Link>
			</div>
		</nav>
	);
};
