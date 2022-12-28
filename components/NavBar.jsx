import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

import { signIn, signOut } from 'next-auth/react';
import NavBarLink from './NavBarLink';
import GitHubButton from './GitHubButton';

export default function NavBar({ session }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom">
      <Link href="/" className="navbar-brand">
        <Image src="/logo.png" alt="Pin Pics" height={119} width={100} priority />
      </Link>
      {session ? <GitHubButton onClick={() => signOut('github')}>Sign Out of</GitHubButton> : <GitHubButton onClick={() => signIn('github')}>Sign In with</GitHubButton>}
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
          {session ? (
            <NavBarLink
              to={`/pins/${session.user.id}`}
            >
              My Pins
            </NavBarLink>
          ) : null}
        </ul>
      </div>
    </nav>
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
