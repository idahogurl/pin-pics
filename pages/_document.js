import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="container-fluid">
          <Main />
          <NextScript />
          <footer>
            <small className="ml-2"><a href="https://www.freepik.com/free-vector/three-old-style-photo-frame_2543453.htm">Logo via Freepik</a></small>
          </footer>
        </div>
      </body>

    </Html>
  );
}
