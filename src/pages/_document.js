import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />        <link 
          href="https://fonts.googleapis.com/css2?family=Zen+Dots&family=Zen+Loop&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&family=Zen+Kurenaido&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <style jsx global>{`
          * {
            font-family: 'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                         'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif;
          }
          
          /* Ensure proper icon rendering */
          svg {
            display: inline-block;
          }
          
          .chakra-icon {
            vertical-align: middle;
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
