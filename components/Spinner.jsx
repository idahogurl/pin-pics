import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// TODO: switch to font-awesome component
const Spinner = React.memo(function Spinner(props) {
  (
    <i className={cn('mt-2 fa fa-spinner fa-spin', { [`fa-${props.size}x`]: props.size })} />
  );
});

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 0,
};

export default Spinner;
