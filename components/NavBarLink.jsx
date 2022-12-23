import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';

function NavBarLink(props) {
  const { to, children, onClick } = props;
  // const currentPage = window.location.pathname;

  return (
  // <div className={cn('nav-item', { active: currentPage === to })}>
    <Link href={to} className="nav-link pl-2" onClick={onClick}>
      {children}
    </Link>
  // </div>
  );
}

NavBarLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

NavBarLink.defaultProps = {
  onClick: () => {},
};

export default NavBarLink;
