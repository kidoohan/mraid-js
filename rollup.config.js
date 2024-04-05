const babel = require("@rollup/plugin-babel");
const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser");
const bundleSize = require("rollup-plugin-bundle-size");

const onwarn = (message) => {
  if (message.code === "CIRCULAR_DEPENDENCY") {
    console.error(message);
    process.exit(-1);
  }
};

module.exports = (options) => {
  const dev = !!options.dev;
  return {
    input: "src/index.ts",
    output: {
      file: "lib/mraid.js",
      format: "iife",
      sourcemap: dev,
    },
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: "runtime",
        extensions: [...require("@babel/core").DEFAULT_EXTENSIONS, "ts"],
        exclude: /^(.+\/)?node_modules\/.+$/,
      }),
      dev ? {} : terser(),
      bundleSize(),
    ],
    onwarn,
  };
};
