const merge = require('webpack-merge')
const common = require('./webpack.common')

const server = {
    mode: 'development',
    watch: true,
  };

const client = {
    mode: 'development',
    watch: true,
    devtool: 'inline-source-map',
}

module.exports = [merge(common[0], server), merge(common[1], client)]