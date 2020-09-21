const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

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
          filename: "../docs/index.html",
        }),
        new HtmlWebPackPlugin({
          template: "./static/index.html",
          filename: "../docs/private/index.html"
        }),
        new HtmlWebPackPlugin({
          template: "./static/index.html",
          filename: "../docs/projekte/index.html"
        }),

        new MiniCssExtractPlugin({
          filename: "../docs/style.css"
        })
      ],
    output: {
      filename: "../docs/bundle.js"
    }
  };