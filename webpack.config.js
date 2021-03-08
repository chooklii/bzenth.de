  
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

// add paths for subdomains here
const paths = [
  "projekte/offentlich",
  "projekte/privat",
  "skills",
  "kontakt",
  "impressum",
  "privat",
]

let multipleHtmlPlugins = paths.map(name => {
  return new HtmlWebPackPlugin({
    template: "./static/index.html",
    filename: `../docs/${name}/index.html`,
    chunks: ["bundle"]
  })
});

module.exports = {
    devServer: {
      contentBase: path.join(__dirname, 'docs'),
      compress: true,
      port: 9000
    },
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
          test: /\.(ttf)$/,
          use: {
            loader: "url-loader"
          }
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ]
    },
    entry: {
      bundle: "./src/Classic/index.js",
      arcade: "./src/Game/index.js"
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, "docs")
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./static/index.html",
          filename: "../docs/index.html",
          chunks: ["bundle"]
        }),
        new HtmlWebPackPlugin({
          template: "./static/index.html",
          filename: "../docs/404.html",
          chunks: ["bundle"]
        }),
        new HtmlWebPackPlugin({
          template: "./static/index.html",
          filename: "../docs/arcade/index.html",
          chunks: ["arcade"]
        }),
        new MiniCssExtractPlugin({
          filename: '[name].style.css',
          path: path.resolve(__dirname, "docs")
        })
      ].concat(multipleHtmlPlugins),
  };
