import type { Config } from "prismic-ts-codegen";

const config: Config = {
  repositoryName: "blog-website-prismic", 
  output: "./prismicio-types.d.ts",
  models: ["./customtypes/**/*.json", "./slices/**/*.json"],
};

export default config;