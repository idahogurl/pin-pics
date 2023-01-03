import PropTypes from 'prop-types';
import Image from 'next/image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { signIn, signOut } from 'next-auth/react';

import GitHubButton from './GitHubButton';

function NavBar({ session }) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <Image src="/logo.png" alt="Pin Pics" height={119} width={100} priority />
      </Navbar.Brand>
      {session ? <GitHubButton onClick={() => signOut('github')}>Sign Out of</GitHubButton> : <GitHubButton onClick={() => signIn('github')}>Sign In with</GitHubButton>}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {session && <Nav.Link href={`/pins/${session.user.id}`}>My Pins</Nav.Link>}
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}

NavBar.propTypes = {
  session: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

NavBar.defaultProps = {
  session: undefined,
};

export default NavBar;
