import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

import { signIn, signOut } from 'next-auth/react';
import NavBarLink from './NavBarLink';
import GitHubButton from './GitHubButton';

export default function NavBar({ session }) {
  const onClick = function onClick() {
    if (!session) {
      const options = {
        position: 'top-right',
      };

      // const notifier = new AWN(options);
      // notifier.alert('Log in to view your pins');
    }
  };
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
          <NavBarLink
            to="/pins"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={onClick}
          >
            My Pins
          </NavBarLink>
        </ul>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  session: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      image: PropTypes.string,
    }),
    expires: PropTypes.string,
  }),
};

NavBar.defaultProps = {
  session: undefined,
};
