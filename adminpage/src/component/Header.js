import React from "react";

export default function Header() {
  return (
    <React.Fragment>
      <header id="header">
        <nav
          id="PPNavbar"
          className="navbar navbar-expand-md navbar-light bg-white"
        >
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img
                src={require("../images/logo.png").default}
                height="27"
                alt="BSCPad"
                className="me-2"
              />
              BSCPad
            </a>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}
