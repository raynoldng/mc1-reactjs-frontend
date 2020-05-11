import React from 'react';
import {Link, withRouter} from 'react-router-dom';

function NavBar(props) {

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Q&App
      </Link>
    </nav>
  );
}

export default withRouter(NavBar);
