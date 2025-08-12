const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts と .tsx 両方OK
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/', // ルートパスに配信
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 既存の index.html を利用
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    devMiddleware: {
      publicPath: '/', // /dist/ ではなく /
    },
    hot: true,
    open: true,
    client: {
      overlay: {
        errors: true,        // コンパイルエラーは表示
        warnings: false,
        runtimeErrors: false // ★ これでランタイムの赤画面を止める
      }
    }
  },
};
