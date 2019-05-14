const path = require('path')
const shellJs = require('shelljs')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
let resolve = (dir) => path.resolve(process.cwd(), './', dir)

let AiArr = [
  resolve('node_modules/ai-act-ui/'),
  resolve('node_modules/ai-ui/'),
  resolve('node_modules/ai-i/')
]
let exec = shellJs.exec('npm root -g')
let globalModulePath = exec.stdout.replace('\n', '')
let hcliMoudlePath = `${globalModulePath}/hcli/node_modules`

module.exports = {
  // mode: 'production',
  mode: 'development',
  // devtool: false,
  entry: '',
  resolveLoader: {
    modules: [hcliMoudlePath, 'node_modules']
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
          output: {
            comments: false
          }
        }
      })
    ]
  },
  output: {
    // path: resolve(`static/aop/`),
    // filename: `js/app.[chunkhash].js`
  },
  resolve: {
    modules: [hcliMoudlePath, 'node_modules'],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.js/,
        include: AiArr,
        use: {
          loader: 'babel-loader',
          options: {
            root: `${globalModulePath}/hcli`
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: '/assets/images/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/assets/videos/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/assets/fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].css'
    })
  ]
}
