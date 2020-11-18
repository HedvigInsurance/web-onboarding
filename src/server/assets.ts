import fs from 'fs'
import path from 'path'

const PUBLIC_PATH = '/new-member-assets/'

export const getClientScripts = (): ReadonlyArray<string> => {
  if (process.env.NODE_ENV !== 'production') {
    return [PUBLIC_PATH + 'app.js']
  }

  const assets = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../../build/new-member-assets/stats.json'),
      'utf-8',
    ),
  ).assetsByChunkName
  const mainScript = PUBLIC_PATH + assets.app[0]
  const commonsScript = PUBLIC_PATH + assets.common[0]

  return [mainScript, commonsScript]
}
