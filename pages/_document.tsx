import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        ></link>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
          async
        ></script>
        <script src="https://example.com/fontawesome/v6.4.2/js/all.js" data-auto-replace-svg="nest"></script>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
