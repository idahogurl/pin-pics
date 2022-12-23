import Link from 'next/link';
import Image from 'next/image';
import NavBarLink from './NavBarLink';
// import LoginButton from '../components/LoginButton';
// import LogoutButton from '../components/LogoutButton';

const onClick = function onClick() {
  if ('currentUser' in sessionStorage === false) {
    const options = {
      position: 'top-right',
    };

    const notifier = new AWN(options);
    notifier.alert('Log in to view your pins');
  }
};

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom">
      <Link href="/" className="navbar-brand">
        <Image src="/logo.png" alt="Pin Pics" height={119} width={100} />
      </Link>
      {/* {'currentUser' in sessionStorage ? <LogoutButton /> : <LoginButton />} */}
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
            to="/"
            onClick={onClick}
          >
            My Pins
          </NavBarLink>
        </ul>
      </div>
    </nav>
  );
}
