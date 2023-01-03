import { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Spinner({ size }) {
  return (
    <FontAwesomeIcon icon={faSpinner} className={cn('mt-2 fa-spin')} size={`${size}x`} />
  );
}

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 1,
};

export default memo(Spinner);
