const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    promo: ['./components/promo/promo.app.js'],
    app: ['./app.js'], 
  },
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: false,
      template: './components/promo/promo.index.html',
      filename: './index.html'
    }),
    new HTMLWebpackPlugin({
      inject: false,
      template: './components/main/main.index.html',
      filename: './main.index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: './assets/favicon/',
        to: './assets/favicon/',
      },
    ]), 
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(mp3|wav)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './assets/audio/',
          },
        }],
      },  
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets/img/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                processive: true,
                quality: 98,
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|wooff2|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: './assets/fonts',
          },
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    stats: 'errors-only',
    clientLogLevel: 'none'
  }
};
