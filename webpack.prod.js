// const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");

// const { version } = require("./package.json");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: "nosources-source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
      options: {},
    }),
  ],
  stats: "minimal",
});
