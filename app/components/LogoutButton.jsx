import React from 'react';
import FacebookButton from './FacebookButton';

const onLogout = function onLogout() {
  sessionStorage.clear();
  window.location = '/';
};

export default function LogoutButton() {
  return <FacebookButton onClick={onLogout}>Log Out</FacebookButton>;
};
