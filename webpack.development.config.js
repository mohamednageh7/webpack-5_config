const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry:{
    'hello-world':'./src/helloWorld.js',
    'image':'./src/image.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    // publicPath:'http://the-most-awesome-website.com/'
  },
  mode: 'development',
  devServer:{
    contentBase:path.resolve(__dirname, './dist'),
    index: 'index.html',
    port:5000,
    writeToDisk:true
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: ['file-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['transform-class-properties'],
          },
        },
      },
      {
          test:/\.hbs$/,
          use:[
              'handlebars-loader'
          ]
      }
    ],
  },
  plugins:[
      // new TerserPlugin(), not needed in dev
      // new MiniCssExtractPlugin({
      //     filename:'style.css'
      // }), not needed in dev
      new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns:[
              '**/*',
              path.join(process.cwd(),'build/**/*')
          ]
      }),
      new HtmlWebpackPlugin({
        filename:'hello-world.html',
        chunks:['hello-world'],
          title:'Hello World',
          template:'src/page-template.hbs',
          description:'Hello world'
        //   filename:'subfolder/custome_filename.html',    
      }),
      new HtmlWebpackPlugin({
        filename:'image.html',
        chunks:['image'],
          title:'Hello World',
          template:'src/page-template.hbs',
          description:'image'
        //   filename:'subfolder/custome_filename.html',    
      })
  ]
};
