/* eslint-disable react/jsx-filename-extension */
import {
  Html, Head, Main, NextScript,
} from 'next/document';
import NavBar from '../components/NavBar';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <header>
        <NavBar />
      </header>
      <body className="container-fluid">
        <Main />
        <NextScript />
      </body>
      <footer>
        <small className="ml-2"><a href="https://www.freepik.com/free-vector/three-old-style-photo-frame_2543453.htm">Logo via Freepik</a></small>
      </footer>
    </Html>
  );
}
