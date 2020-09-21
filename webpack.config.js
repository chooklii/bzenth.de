const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    module: {
      rules: [
        {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: require.resolve("file-loader") + "?name=../[path][name].[ext]"
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./static/index.html",
          filename: "../public/index.html",
        }),
        new HtmlWebPackPlugin({
          template: "./static/index.html",
          filename: "../public/private/index.html"
        }),
        new HtmlWebPackPlugin({
          template: "./static/index.html",
          filename: "../public/projekte/index.html"
        }),

        new MiniCssExtractPlugin({
          filename: "../public/style.css"
        })
      ],
    output: {
      filename: "../public/bundle.js"
    }
  };