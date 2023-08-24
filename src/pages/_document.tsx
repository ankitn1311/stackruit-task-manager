/* eslint-disable react/no-danger */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" href="/icon.png" />
        {/* <!-- this sets logo in Apple smatphones. --> */}
        <link rel="apple-touch-icon" href="/logo-96x96.png" />
        {/* <!-- this sets the color of url bar in Apple smatphones --> */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="apple-mobile-web-app-status-bar" content="#EAD3AB" />
        <meta name="theme-color" content="#ccc" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
