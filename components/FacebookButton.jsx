import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent } from 'react-fela';
import classNames from 'classnames';

const style = {
  backgroundColor: '#3B5998',
  color: 'white',
};

function FacebookButton(props) {
  const { children, onClick } = props;
  return (
    <FelaComponent
      style={style}
    >
      {({ className }) => (
        <div className="mr-3 flex-grow-1">
          <button className={classNames('btn', className)} onClick={onClick}>
            <img src="images/facebook-app-logo.svg" className="fb-icon align-middle mr-2" alt="" aria-hidden="true" />
            <span className="align-middle">
              {children}
            </span>
          </button>
        </div>
      )}
    </FelaComponent>
  );
}

FacebookButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default FacebookButton;
