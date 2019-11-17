import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookButton from './FacebookButton';

import processResponse from '../utils/facebookResponse';

const onLogin = async function onLogin(response) {
  const { id } = response;
  if (id) {
    const currentUser = id.toString();
    sessionStorage.setItem('currentUser', currentUser);

    await processResponse(response);
    window.location = `/${currentUser}`;
  }
};

export default function LoginButton() {
  return (
    <FacebookLogin
      appId="2524623997651700"
      callback={onLogin}
      fields="name,email"
      render={({ isWorking, isLoading, onClick }) => (
        <FacebookButton onClick={onClick}>
          {isLoading || isWorking ? 'Loading ...' : 'Log In'}
        </FacebookButton>
      )}
    />
  );
}
