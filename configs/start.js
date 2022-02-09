const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js')
const webpack = require('webpack')
const { joinPath } = require('./utils')
const PORT = 8080;
const HOST = '127.0.0.1'

const compiler = webpack(config)

const options = Object.assign({}, {
  contentBase: joinPath('/dist'),
  inline: true,
}, config.devServer)

const server = new WebpackDevServer(compiler, options)

server.listen(PORT, () => {
  console.log(`Starting server on http://localhost:${PORT}`);
});
