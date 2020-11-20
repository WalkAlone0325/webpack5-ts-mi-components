const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  entry: './src/main.ts',
  output: {
    path: resolve('./dist'),
    filename: '[name].bundle.js',
  },
  mode: 'development',
  devServer: {
    contentBase: resolve('./dist'),
    open: false,
    hot: true,
    port: 8080,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      // css
      {
        test: /\.(scss|sass|css)$/,
        // style-loader 提取 css 到 style 标签
        // css-loader 解析 css 文件
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: [resolve('src/components')],
      },
      {
        test: /\.(scss|sass|css)$/,
        // style-loader 提取 css 到 style 标签
        // css-loader 解析 css 文件
        use: [
          'style-loader',
          // components 下使用 模块化 css 文件
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]_[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
        include: [resolve('src/components')],
      },
      // font svg
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline',
      },
      // img
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        // 注意此处是type
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      title: 'mi-project',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    // 抽取 css 到单独文件
    // new MiniCssExtractPlugin(),
  ],
}
