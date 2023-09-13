const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = process.cwd();

module.exports = {
  entry: {
    ok: './src/index.tsx',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'static'),
    },
    compress: true,
    port: 8080,
    proxy: {
      '/b2b': {
        target: 'http://109.14.20.45:6636/ux',
        changeOrigin: true,
      },
      '/lxz': {
        target: 'http://109.14.6.243:7777',
        pathRewrite: { '^/lxz': '' },
        changeOrigin: true,
      },
    },
  },
  output: {
    filename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name][ext]',
    publicPath: '/cusys/react/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'online tools',
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['ok'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[chunkhash].css',
    }),
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': [path.join(rootDir, 'src')],
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        //use: ["style-loader", "css-loader"],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.jsx?/i,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.png/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024, // 4kb
          },
        },
      },
    ],
  },
};
