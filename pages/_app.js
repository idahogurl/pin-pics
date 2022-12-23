/* eslint-disable react/jsx-filename-extension, react/prop-types */
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}
