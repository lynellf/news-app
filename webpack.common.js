const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const nodeModules = path.resolve(__dirname, '/node_modules')
console.log({ nodeModules })

const server = {
    target: 'node',
    externals: [nodeExternals()],
    entry: path.join(__dirname, '/server/app'),
    output: {
      path: path.join(__dirname, '/server/main'),
      publicPath: '/',
      filename: "__main__.js",
      chunkFilename: '[name].js'
    },
    module: {
      rules: [{
        test: /\.(ts|tsx)?$/,
        exclude: [
          path.resolve(__dirname, '/node_modules')
        ],
        loader: 'babel-loader',
        query: {
          presets: [[
            "@babel/preset-env", {
              "targets": {
                "node": "10"
              }
            }
          ], "@babel/typescript"],
          plugins: ["@babel/proposal-class-properties", "@babel/proposal-object-rest-spread"]
        }
      }]
    },
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx']
    }
  }

  const client = {
    entry: path.join(__dirname, '/server/src/index'),
    output: {
      path: path.resolve(__dirname, 'server/public'),
      publicPath: '/server/public',
      filename: 'bundle.[hash].js',
      chunkFilename: '[name].js'
    },
    module: {
      rules: [{
        test: /\.(ts|tsx)?$/,
        exclude: [
          path.resolve(__dirname, '/node_modules')
        ],
        loader: 'babel-loader',
      }]
    },
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx']
    },
    plugins: [ new CleanWebpackPlugin() ],
  }

  module.exports = [server, client]