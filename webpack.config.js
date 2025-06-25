const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");

// add paths for subdomains here
const paths = ["projekte", "skills", "kontakt", "impressum", "privat", "blog"];

let multipleHtmlPlugins = paths.map((name) => {
  return new HtmlWebPackPlugin({
    template: "./static/index.html",
    filename: `../docs/${name}/index.html`,
    chunks: ["bundle"],
  });
});

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: require.resolve("file-loader") + "?name=../[path][name].[ext]",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ttf)$/,
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  entry: {
    bundle: "./src/Classic/index.js",
    arcade: "./src/Game/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "docs"),
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./static/index.html",
      filename: "../docs/404.html",
      chunks: ["bundle"],
    }),
    new HtmlWebPackPlugin({
      template: "./static/index.html",
      filename: "../docs/arcade/index.html",
      chunks: ["arcade"],
    }),
    new HtmlWebPackPlugin({
      template: "./static/index-blog.html",
      filename: `../docs/blog/reisebericht-4-wochen-in-aveiro/index.html`,
      chunks: ["bundle"],
    }),
    new HtmlWebPackPlugin({
      template: "./static/index-blog.html",
      filename: `../docs/blog/rustyrook/index.html`,
      chunks: ["bundle"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].style.css",
      path: path.resolve(__dirname, "docs"),
    }),
    new HtmlWebPackPlugin({
      template: "./static/index.html",
      filename: "../docs/index.html",
      chunks: ["bundle"],
    }),
  ].concat(multipleHtmlPlugins),
};
