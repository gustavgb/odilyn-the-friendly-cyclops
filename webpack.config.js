const path = require('path')
const babelConfig = require('./babel.config.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = (env, argv) => {
  const mode = argv.mode || 'development'

  const plugins = [
    new CleanWebpackPlugin([
      'dist'
    ], {
      root: __dirname,
      allowExternal: true
    }),
    new CopyWebpackPlugin([
      path.join(__dirname, 'public')
    ])
  ]

  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': mode
    })
  )

  return {
    entry: {
      app: path.join(__dirname, 'src/index.js'),
      editor: path.join(__dirname, 'src/editor.js')
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    mode,
    devtool: mode === 'development' ? 'source-map' : 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.join(__dirname, 'src'),
          exclude: /(node_modules|dist)/,
          use: {
            loader: 'babel-loader',
            options: babelConfig
          }
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images/',
                publicPath: '/images/'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')]
    },
    plugins
  }
}
