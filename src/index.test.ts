import path from 'path'
import {promises as fs} from 'fs'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const snowpackPluginSvgr = require('./index.ts')

describe('snowpack-plugin-mdx', () => {
  it('should compile .svg files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/test.svg')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginSvgr({})
    const result = await plugin.load({contents, filePath})
    expect(result['.js']).toMatchSnapshot('.js')
  })

  it('should exclude files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/test.svg')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginSvgr(
      {},
      {
        exclude: ['**/test.svg'],
      }
    )
    const result = await plugin.load({contents, filePath})
    expect(result).toBeNull()
  })

  it('should include files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/test.svg')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginSvgr(
      {},
      {
        include: ['**/test.svg'],
      }
    )
    const result = await plugin.load({contents, filePath})
    expect(result).not.toBeNull()
  })

  it('should ignore files not explicitly included', async () => {
    const filePath = path.join(__dirname, '__fixtures__/test.svg')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginSvgr(
      {},
      {
        include: ['**/*.svgr'],
      }
    )
    const result = await plugin.load({contents, filePath})
    expect(result).toBeNull()
  })
})
