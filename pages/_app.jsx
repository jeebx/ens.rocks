import 'tailwindcss/tailwind.css'
import Head from 'next/head'

function Rocks({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            background: #000000e0;
            color: white;
            overflow-x: hidden;
          }
        `}
      </style>
      <Head>
        <title>ens.rocks</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@swftbb" />
        <meta property="og:url" content="https://ens-rocks.vercel.app/" />
        <meta property="og:title" content="ens.rocks" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta
          property="og:description"
          content="All the rock ENS names a part of the rock DAO."
        />
      </Head>
    </>
  )
}

export default Rocks
