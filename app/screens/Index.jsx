import React, { memo } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import PinList from '../components/PinList';

const IndexScreen = memo(props => {
  return (
    <div className="container-fluid">
      <header>
        <NavBar />
      </header>
      <main>
        <PinList userId={props.userId} />
      </main>
      <footer>
        <small className="ml-2"><a href="https://www.freepik.com/free-vector/three-old-style-photo-frame_2543453.htm">Logo via Freepik</a></small>
      </footer>
    </div>
  );
});

IndexScreen.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default IndexScreen;
