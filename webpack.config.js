const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  // Mobile Test Configurtion 
  name: 'tyscript-playground',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', 'json', '.jsx', '.scss', '.css', '.js'],
    alias: {
      "@customCSS": path.resolve(__dirname, 'src/css/customCSS')
    }
  },
  entry: {
    index: ['./src/index.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: [
          'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: require('html-webpack-template'),
      inject: false,
      appMountId: 'app',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  output: {
    path: path.join(__dirname, './dist/src'),
    filename: '[name].js'
  },

}

module.exports = config;
