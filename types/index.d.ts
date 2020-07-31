import type {TransformOptions} from '@babel/core'
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
