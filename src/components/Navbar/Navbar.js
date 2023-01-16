import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


export default function Navbar() {
  let user = JSON.parse(localStorage.getItem("user"));
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   let userData = localStorage.getItem("user");
  //   console.log(userData, "1");
  //   if (userData) {
  //     setUser(JSON.parse(userData));
  //   }
  //   console.log(userData);
  // }, [user]);

  const logout = () => {
    window.localStorage.removeItem("user");
  };
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid" style={{ margin: "0 5% 0 5%" }}>
        <a className="navbar-brand" href="/">
          Hotel Rooms
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/home">
                Home
              </a>
            </li>
          </ul>
          {user ? (
            <Dropdown style={{ marginLeft: "auto" }}>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <FontAwesomeIcon icon={faUser} />&nbsp;
                              {user.name}
              </Dropdown.Toggle>

              <Dropdown.Menu  variant="dark">
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                <Dropdown.Item href="#/action-2">{user.email}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <ul className="navbar-nav" style={{ marginLeft: "auto" }}>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/login"
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
