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
        <meta name="twitter:creator" content="@worm_emoji" />
        <meta property="og:url" content="https://rocks.market" />
        <meta property="og:title" content="rocks.market" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta
          property="og:description"
          content="See the floor price of Divine rocks from the Loot project."
        />
        <meta property="og:image" content="https://rocks.market/og.png" />
        <script
          data-goatcounter="https://divinerocks.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></script>
      </Head>
    </>
  )
}

export default Rocks
