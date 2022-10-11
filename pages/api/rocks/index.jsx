import pMap from 'p-map'
import { chunk, flatten } from 'lodash'
import RockData from '../../../data/all-rocks.json'

const chunked = chunk(RockData, 200)
// const apiKey = process.env.OPENSEA_API_KEY

const fetchRockPage = async (ids) => {
  let url = 'https://opensea.io/assets/ethereum/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/'
  let rockIdList = [];
  let rockNameList = [];
  let rockIds = Object.keys(RockData[0]);
  let rockNames = Object.values(RockData[0]);
  
  for(let i=0;i<rockIds.length;i++) {
    url += `${rockIds[i]}`;
    rockIdList.push(url);
    rockNameList.push(rockNames[i].name)
    url = 'https://opensea.io/assets/ethereum/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/';
  }

  return rockIdList;
}

export const fetchRocks = async () => {
  const data = await pMap(chunked, fetchRockPage, { concurrency: 2 })
  const mapped = flatten(data)
  // console.log(mapped);
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