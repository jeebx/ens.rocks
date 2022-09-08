import { RockInfo, fetchRocks } from './api/rocks'
import { format as ts } from 'timeago.js'

export async function getStaticProps() {
  const data = await fetchRocks()
  return {
    props: {
      robes: data.robes,
      lastUpdate: data.lastUpdate,
    },
    revalidate: 300,
  }
}

const Rock = ({ rock }) => {
  return (
    <a href={rock.url} target="_blank">
      <div className="m-auto pb-4 mb-8 flex flex-col justify-center items-center gap-2 p-4 md:m-4 border border-white transform hover:scale-105 transition-all bg-black w-full md:w-96">
        <img src={rock.svg} alt="" width="350" height="350" />
        <div className="text-center">
          <p className="text-lg">#{rock.id}</p>
          <p>{rock.price} ETH</p>
        </div>
      </div>
    </a>
  )
}

const IndexPage = ({ rocks, lastUpdate }) => {
  return (
    <div className="py-3 md:pb-0 font-mono flex flex-col justify-center items-center gap-4 pt-10 md:w-screen">
      <h1 className="text-lg md:text-3xl">Divine Robes</h1>
      <div className="text-center max-w-screen-md md:leading-loose">
        <p className="md:text-xl">
          There are {rocks.length} bags for sale with Divine Robes. The floor
          price is {rocks[0].price} ETH.
        </p>
        <p className="md:text-lg pt-2">
          Site by{' '}
          <a
            target="_blank"
            href="https://twitter.com/worm_emoji"
            className="underline"
          >
            worm_emoji
          </a>
          . Join the{' '}
          <a
            target="_blank"
            className="underline"
            href="https://divineroles.vercel.app"
          >
            Discord
          </a>
          .
        </p>
        <p className="text-sm mv-4">Last updated {ts(lastUpdate)}</p>
      </div>
      <div className="grid md:grid-cols-2 pt-5">
        {rocks.map((rock) => {
          return <Rock rock={rock} key={rock.id} />
        })}
      </div>
    </div>
  )
}

export default IndexPage
