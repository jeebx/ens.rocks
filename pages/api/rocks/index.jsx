import { NextApiRequest, NextApiResponse } from 'next'
import pMap from 'p-map'
import { chunk, flatten, orderBy } from 'lodash'
import { utils as etherUtils, BigNumber } from 'ethers'
import RockIDs from '../../../data/rock-ids.json'

const chunked = chunk(RobeIDs, 20)
const apiKey = process.env.OPENSEA_API_KEY

const fetchRockPage = async (ids) => {
  let url = 'https://api.opensea.io/api/v1/assets?collection=lootproject&'
  url += ids.map((id) => `token_ids=${id}`).join('&')

  const res = await fetch(url, {
    headers: {
      'X-API-KEY': apiKey,
    },
  })
  const json = await res.json()

  return Promise.all(
    json.assets.map(async (asset) => {
      return {
        ...asset,
        image_url: await rarityImage(asset.token_metadata, {
          colorFn: ({ itemName }) =>
            itemName.toLowerCase().includes('divine robe') && 'cyan',
        }),
      }
    }),
  )
}

export const fetchRocks = async () => {
  const data = await pMap(chunked, fetchRockPage, { concurrency: 2 })
  const mapped = flatten(data)
    .filter(
      (a) =>
        a?.sell_orders?.[0]?.payment_token_contract.symbol === 'ETH',
    )
    .map((a) => {
      return {
        id: a.token_id,
        price: Number(
          etherUtils.formatUnits(
            BigNumber.from(a.sell_orders[0]?.current_price.split('.')[0]),
          ),
        ),
        svg: a.image_url,
      }
    })

  return {
    rocks: orderBy(mapped, ['price', 'id'], ['asc', 'asc']),
    lastUpdate: new Date().toISOString(),
  }
}

const handler = async (_req, res) => {
  try {
    const data = await fetchRocks()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler