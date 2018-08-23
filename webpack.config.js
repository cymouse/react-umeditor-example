var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

var APP_PATH = path.resolve(__dirname, './src/index.jsx');
var BUILD_PATH = path.resolve(__dirname, './build');
var TEM_PATH = path.resolve(__dirname, './templates/index.html');

module.exports = {
	mode: 'development',
	entry: {
		app: APP_PATH,
		vendor: ['react', 'react-dom']
	},	
	output: {
		path: BUILD_PATH,
		filename: '[name].js'
	},
	optimization: {
    minimize: true,
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: "async",
      minSize: 300000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              name: "vendor",
              chunks: 'initial'
          },
          default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
          }
      }
    }
  },
  plugins: [
		new CopyWebpackPlugin([{"from": 'src/components', "to": "demo"}]),
		new ExtractTextPlugin({
			filename: 'build.min.css',
			allChunks: true,
		}),
		new HtmlWebpackPlugin({
				title: 'Editor Demo',
				template: TEM_PATH,
				filename: 'index.html',
				inject: 'body'
			}),
		// new OpenBrowserPlugin({
		// 	url: 'http://localhost:8080'
		// 	//browser: 'chromium-browser' // mac调试时需要注释该行
		// }),
		new DashboardPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
  module: {
		rules: [
			{
				test:  /\.(js|jsx)$/,
				// exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['env', 'react'],
							plugins: ["transform-object-rest-spread", "transform-class-properties"]
						}
					}
				],
			},
			{
				test: /\.less$/,
				use: [{
					loader: 'style-loader' // creates style nodes from JS strings
				}, {
					loader: 'css-loader' // translates CSS into CommonJS
				}, {
					loader: 'less-loader' // compiles Less to CSS
				}]
			},
			{
				test: /\.css$/,
				use: [{
					loader: 'style-loader' // creates style nodes from JS strings
				}, {
					loader: 'css-loader' // translates CSS into CommonJS
				}]
			},
			{
				test: /\.(png|jpg|gif|woff2|woff|ttf|svg|eot)$/,
				use:[
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'images/[name].[ext]?[hash]'
						}
					}
				]
			}
		]
	}
}