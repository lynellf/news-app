const merge = require('webpack-merge')
const common = require('./webpack.common')

const server = {
    mode: 'production',
    watch: false,
  };

const client = {
    mode: 'production',
    watch: false
}

module.exports = [merge(common[0], server), merge(common[1], client)]