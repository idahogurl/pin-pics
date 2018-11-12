import React from 'react';
import AWN from 'awesome-notifications';
import NavBarLink from '../components/NavBarLink';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

const onClick = function onClick() {
  if ('currentUser' in sessionStorage === false) {
    const options = {
      position: 'top-right',
    };

    const notifier = new AWN(options);
    notifier.alert('Log in to view your pins');
  }
};

const NavBar = React.memo(() => (
  <nav className="navbar navbar-expand-lg navbar-light border-bottom">
    <a href="/" className="navbar-brand">
      <img src="images/logo.png" alt="Pin Pics" height="100" />
    </a>
    {'currentUser' in sessionStorage ? <LogoutButton /> : <LoginButton />}
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar-content"
      aria-controls="navbar-content"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbar-content">
      <ul className="navbar-nav mr-auto">
        <NavBarLink to="/">Home</NavBarLink>
        <NavBarLink
          to={'currentUser' in sessionStorage ? sessionStorage.currentUser : ''}
          onClick={onClick}
        >
            My Pins
        </NavBarLink>
      </ul>
    </div>
  </nav>
));

export default NavBar;
