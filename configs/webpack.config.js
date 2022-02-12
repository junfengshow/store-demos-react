const webpack = require('webpack');
const { joinPath } = require('./utils')

const __DEV__ = process.env.NODE_ENV === 'development'

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const config = {
  mode: __DEV__ ? 'development' : 'production',
  devtool: 'none',
  entry: {
    main: joinPath('/src/main.js'),
    // react: ['react', 'react-dom', 'redux']
  },
  output: {
    path: joinPath('/dist'),
    filename: '[name].js'
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
        },
      }
    },
    runtimeChunk: true
  },
  module: {
    rules: []
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'cmp': joinPath('/src/components'),
      'js': joinPath('/src/scripts'),
      '@': joinPath('/src')
    }
  },
  devServer: {
    contentBase: joinPath('/dist'),
    inline: true
  }
}

config.plugins.push(
  new webpack.DefinePlugin({
    'NODE_ENV': "'development'"
  })
)

// javascript
config.module.rules.push({
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        'react',
        'env'
      ],
      plugins: [
        'transform-runtime',
        'transform-object-rest-spread',
        'transform-decorators-legacy',
        'transform-class-properties',
      ]
    }
  }
})

// html
const HtmlWebpackPlugin = require('html-webpack-plugin')
config.plugins.push(new HtmlWebpackPlugin({
  template: joinPath('/src/index.html')
}))

// css
// extract-text-webpack-plugin 在webpack 4+中失效
// 所以使用mini-css-extract-plugin
// 详见: https://github.com/webpack-contrib/extract-text-webpack-plugin

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
config.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  })
)
config.module.rules.push({
  test: /\.scss/,
  use: [
    {
      loader: __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'sass-loader'
    }
  ]
})
config.module.rules.push({
  test: /\.css/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      // loader: __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'sass-loader'
    }
  ]
})
config.module.rules.push({
  test: /\.less/,
  use: [
    {
      loader: __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'less-loader'
    }
  ]
})

// 图片
config.module.rules.push({
  test: /\.(jpe?g|png|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: '[hash].[ext]'
      }
    }
  ]
})

// 字体
const fontLoader = [
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml']
];
fontLoader.forEach((font) => {
  let extension = font[0]
  let mimetype = font[1]
  config.module.rules.push({
    test: new RegExp(`\\.${extension}$`),
    loader: 'url-loader',
    options: {
      name: 'fonts/[name].[ext]',
      limit: 10000,
      mimetype,
    },
  });
});

module.exports = config
