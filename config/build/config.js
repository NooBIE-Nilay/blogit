import { createRequire } from "module";
import path from "path";

import { absolutePath } from "./constants.js";

const require = createRequire(import.meta.url);

const alias = {
  neetoui: "@bigbinary/neetoui",
  neetoIcons: "@bigbinary/neeto-icons",
  neetoCist: "@bigbinary/neeto-cist",
  apis: absolutePath("src/apis"),
  channels: absolutePath("src/channels"),
  common: absolutePath("src/common"),
  components: absolutePath("src/components"),
  constants: absolutePath("src/constants"),
  hooks: absolutePath("src/hooks"),
  stores: absolutePath("src/stores"),
  translations: absolutePath("src/translations"),
  utils: absolutePath("src/utils"),
  assets: absolutePath("../assets"),
  buffer: require.resolve("buffer"),
  crypto: require.resolve("crypto-browserify"),
  images: path.resolve(process.cwd(), "app/assets/images"),
  path: require.resolve("path-browserify"),
  stream: require.resolve("stream-browserify"),
};

export { alias };
