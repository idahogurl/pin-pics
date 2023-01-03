import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

function NavBarLink(props) {
  const { to, children } = props;
  const router = useRouter();

  return (
    <div className={cn('nav-item', { active: router.asPath === to })}>
      <Link href={to} className="nav-link pl-2">
        {children}
      </Link>
    </div>
  );
}

NavBarLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavBarLink;
