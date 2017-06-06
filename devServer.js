const Webpack = require("webpack")
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')
const port = 8888
const opn = require('opn')

const compiler = Webpack(webpackConfig)
const server = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,/*?*/
	stats: {
		colors: true
	}
});

server.listen(port, "127.0.0.1", function(err) {
  err && console.log(err)
  // opn(`http://localhost:${port}`)
	console.log(`Starting server on http://localhost:${port}`);
});