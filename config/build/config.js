import { createRequire } from "module";
import path from "path";

import { absolutePath } from "./constants.js";

const require = createRequire(import.meta.url);

const alias = {
  neetoui: "@bigbinary/neetoui",
  neetoIcons: "@bigbinary/neeto-icons",
  neetoCist: "@bigbinary/neeto-cist",
  apis: absolutePath("src/apis"),
  assets: absolutePath("../assets"),
  buffer: require.resolve("buffer"),
  common: absolutePath("src/common"),
  components: absolutePath("src/components"),
  constants: absolutePath("src/constants"),
  translations: absolutePath("src/translations"),
  crypto: require.resolve("crypto-browserify"),
  images: path.resolve(process.cwd(), "app/assets/images"),
  path: require.resolve("path-browserify"),
  stream: require.resolve("stream-browserify"),
  utils: absolutePath("src/utils"),
};

export { alias };
