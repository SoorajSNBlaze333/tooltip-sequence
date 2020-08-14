import { terser } from "rollup-plugin-terser";

export default {
  input: "./index.js",
  output: [
    { file: "./dist/index.js", format: "iife", name: "bundle" },
    { file: "./dist/index.min.js", format: "iife", name: "bundle", plugins: [terser()] },
  ],
};
