import pMap from 'p-map'
import { chunk, flatten } from 'lodash'
import RockData from '../../../data/all-rocks.json'
import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";

const chunked = chunk(RockData, 200)

const fetchRockPage = async (ids) => {
  const networkInfo = {
    network: ZDKNetwork.Ethereum,
    chain: ZDKChain.Mainnet,
  }

  const API_ENDPOINT = "https://api.zora.co/graphql";
  const args = { 
    endPoint:API_ENDPOINT, 
    networks:[networkInfo], 
    apiKey: process.env.ZORA_API_KEY 
  }
  const zdk = new ZDK(args);

  let url;
  let rockIdList = [];
  let rockIds = Object.keys(RockData[0]);
  let rockNames = Object.values(RockData[0]);

  for (let i = 0; i < rockIds.length; i++) {
    url = `https://opensea.io/assets/ethereum/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/${rockIds[i]}`;
    let token = {
      token: {
        address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
        tokenId: rockIds[i]
      },
      includeFullDetails: false // Optional, provides more data on the NFT such as all historical events
    }
    let response = await zdk.token(token)
    rockIdList.push({ url: url, name: rockNames[i].name, id: rockIds[i], token: response.token });
  }

  return rockIdList;
}

export const fetchRocks = async () => {
  const data = await pMap(chunked, fetchRockPage, { concurrency: 2 })
  const mapped = flatten(data)
  return mapped;
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
