require("dotenv").config();

const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const { version } = require("./package.json");

const homeDir =
  process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
const cacheDir = path.join(
  homeDir,
  // ".config/yarn/global/node_modules/.cache/vroong-tms-manager-mobile-web",
);

module.exports = {
  entry: {
    main: ["whatwg-fetch", "./src/index"],
  },
  cache: {
    type: "filesystem",
    cacheDirectory: cacheDir,
    buildDependencies: {
      config: [__filename],
    },
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[hash:8].js",
    chunkFilename: "[name].[hash:8].js",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  resolve: {
    modules: ["node_modules", path.join(__dirname, "./src")],
    alias: {
      apiClients: path.resolve(__dirname, "./src/apiClients"),
      assets: path.resolve(__dirname, "./src/assets"),
      components: path.resolve(__dirname, "./src/components"),
      lib: path.resolve(__dirname, "./src/lib"),
      pages: path.resolve(__dirname, "./src/pages"),
      states: path.resolve(__dirname, "./src/states"),
      // config: path.resolve(__dirname, "./src/config"),
      // theme: path.resolve(__dirname, "./src/theme"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  optimization: {
    runtimeChunk: true,
    providedExports: true,
    sideEffects: true,
    splitChunks: {
      chunks: "all",
      minChunks: 3,
      automaticNameDelimiter: "-",
      cacheGroups: {
        commons: {
          minChunks: 3,
          priority: -20,
          reuseExistingChunk: true,
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
          chunks: "all",
        },
      },
    },
    minimizer: [
      (compiler) => {
        new TerserPlugin({
          parallel: 2,
          terserOptions: {
            compress: {},
            sourceMap: {
              includeSources: true,
            },
          },
        }).apply(compiler);
      },
    ],
    moduleIds: "named",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: path.join(__dirname, "src"),
        use: [
          {
            loader: "swc-loader",
            options: {
              cacheDirectory: true,
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                  dynamicImport: true,
                  decorators: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    refresh: process.env.stage === "local",
                  },
                },
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
        use: [
          {
            loader: "swc-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg|xlsx)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4KB
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "PR Status Page",
      description: "PR Status Page",
      url: "https://pr-status-page.com",
      themeColor: "#fff",
      backgroundThemeColor: "#00bf96",
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version),
    }),
    new Dotenv({
      path: `./env/${process.env.stage || "local"}.env`,
      safe: true,
      systemvars: true,
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
