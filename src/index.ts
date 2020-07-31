import {promises as fs} from 'fs'
import * as babel from '@babel/core'
import type {TransformOptions} from '@babel/core'
// @ts-expect-error
import svgo from '@svgr/plugin-svgo'
// @ts-expect-error
import jsx from '@svgr/plugin-jsx'
// @ts-expect-error
import convert from '@svgr/core'
// @ts-expect-error
import presetReact from '@babel/preset-react'
// @ts-expect-error
import presetEnv from '@babel/preset-env'
// @ts-expect-error
import pluginTransformReactConstantElements from '@babel/plugin-transform-react-constant-elements'
import {createFilter} from '@rollup/pluginutils'

const babelOptions = {
  babelrc: false,
  configFile: false,
  presets: [
    babel.createConfigItem(presetReact, {type: 'preset'}),
    babel.createConfigItem([presetEnv, {modules: false}], {type: 'preset'}),
  ],
  plugins: [babel.createConfigItem(pluginTransformReactConstantElements)],
}

module.exports = function createPlugin(
  _: any,
  pluginOptions: SnowpackPluginSvgrOptions = {}
) {
  const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

  return {
    name: 'snowpack-plugin-svgr',
    resolve: {
      input: ['.svg'],
      output: ['.js'],
    },
    async load({filePath}: {filePath: string}) {
      if (!filter(filePath)) return null

      const contents = await fs.readFile(filePath, 'utf-8')
      const code = (
        await convert(contents, pluginOptions.svgrOptions, {
          caller: {
            name: 'snowpack-plugin-svgr',
            defaultPlugins: [svgo, jsx],
          },
          filePath,
        })
      )
        // Snowpack doesn't like these imports for React
        .replace('import * as React', 'import React')

      const config = babel.loadPartialConfig({
        filename: filePath,
        ...babelOptions,
        ...pluginOptions.babelOptions,
      })
      const transformOptions = config?.options
      const {code: result} =
        (await babel.transformAsync(code, transformOptions)) || {}

      return {
        '.js': result,
      }
    },
  }
}

export interface SnowpackPluginSvgrOptions {
  /**
   * Includes only the  specified paths
   */
  include?: string[]
  /**
   * Excludes the specified paths
   */
  exclude?: string[]
  /**
   * These options are passed directly to babel.transformAsync()
   */
  babelOptions?: TransformOptions
  /**
   * These options are passed directly to `@svgr/core`'s `convert()` function
   */
  svgrOptions?: any
}
