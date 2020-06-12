const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  entry: {
    promo: ['./promo/promo.js'],
    app: ['./app/app.js'],
  },
  output: {
    filename: './[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './promo/index.html',
      filename: './index.html'
    }),
    new HTMLWebpackPlugin({
      template: './main/index.html',
      filename: './app.html'
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      //{ from: './assets/img', to: './assets/img' },
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
            outputPath: 'fonts',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          },
        },
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