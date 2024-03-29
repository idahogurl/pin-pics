import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const style = {
  backgroundColor: 'black',
  color: 'white',
};

function GitHubButton(props) {
  const { children, onClick } = props;
  return (
    <div className="mr-3 flex-grow-1">
      <button type="button" className="btn" style={style} onClick={onClick}>
        <FontAwesomeIcon icon={faGithub} size="1x" />
        {' '}
        {children}
        {' '}
        GitHub
      </button>
    </div>
  );
}

GitHubButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default GitHubButton;
