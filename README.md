<hr/>

# snowpack-plugin-svgr

> Use [svgr](https://github.com/gregberge/svgr) to transform your SVGs into React components with Snowpack

```sh
npm i -D snowpack-plugin-svgr
```

<p>
  <a aria-label="Types" href="https://www.npmjs.com/package/snowpack-plugin-svgr">
    <img alt="Types" src="https://img.shields.io/npm/types/snowpack-plugin-svgr?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/jaredLunde/snowpack-plugin-svgr">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/jaredLunde/snowpack-plugin-svgr?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/snowpack-plugin-svgr">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/snowpack-plugin-svgr?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/snowpack-plugin-svgr">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/snowpack-plugin-svgr?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/snowpack-plugin-svgr?style=for-the-badge&labelColor=24292e">
  </a>
</p>

---

## Quick start

```js
// snowpack.config.json
{
  "plugins": [["snowpack-plugin-svgr", { /* see "Plugin Options" below */ }]]
}
```

#### Plugin Options

```typescript
interface SnowpackPluginSvgrOptions {
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
```

## LICENSE

MIT
