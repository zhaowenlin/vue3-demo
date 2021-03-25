/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const loadEnv = require('@kitten-team/env-inject').loadEnv
const VueLoaderPlugin = require('vue-loader/dist/plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

loadEnv({
  mode: process.env.npm_config_env,
  dir: path.resolve(__dirname, './env'),
  extname: 'yaml',
})
const { PORT, HOST } = process.env

function authMiddleware(ast, authKey, method) {
  if (!ast.attrs) return
  const attrObj = ast.attrs.find((attr) => attr.name === authKey)
  if (!attrObj) return
  let attrExp = attrObj.value
  if (!attrExp) return ast

  const isBinding = attrObj.hasOwnProperty('dynamic')

  const deleteIndex = ast.attrs.findIndex(attr => attr.name === authKey)
  if (deleteIndex > -1) ast.attrs.splice(deleteIndex, 1)

  attrExp = isBinding ? `${method}(${attrExp})` : `${method}('${attrExp}')`
  if (!ast.if) {
    ast.ifConditions = [{
      exp: attrExp,
      block: ast
    }]
    console.log(attrExp, '=======')
    ast.if = attrExp
    return ast
  }

  const originIfExp = ast.ifConditions[0].exp
  ast.ifConditions[0].exp = originIfExp + `&& (${attrExp})`
  return ast
}
module.exports = {
  publicPath: '/',
  devServer: {
    port: PORT,
    host: HOST || '0.0.0.0',
    disableHostCheck: true,
    open: true,
  },
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    config.optimization.runtimeChunk({
      name: 'runtime',
    })

    // preload和.map不放进预渲染中，会导致预渲染过多
    config.plugin('preload').tap((options) => {
      options[0].fileBlacklist = options[0].fileBlacklist || [/\.map$/]
      options[0].fileBlacklist.push(/runtime(\.[^.]+)?\.js/)
      return options
    })



    // const SkeletonWebpackPluginn = require('vue-skeleton-webpack-plugin')
    // api.chainWebpack((config) => {
    //   config.plugin('skeleton').use(SkeletonWebpackPluginn, [skeleton])
    // })
    //{
    //   nodeTransforms: (ast) => {
    //     console.log('*****************')
    //     authMiddleware(ast, 'n-auth', '$auth')
    //     authMiddleware(ast, 'n-page-auth', '$pageAuth')
    //     return ast
    //   }
    // }

    // config.module
    //   .rule('vue')
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .tap(options => {
    //     return {
    //       ...options,
    //       compilerOptions: {
    //         directiveTransforms: {

    //         }
    //       }
    //     }
    //   })
  },
  pwa: {
    workboxOptions: {
      clientsClaim: true,
      skipWaiting: true,
    },
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: '<%= namespace%>',
    resolve: {
      alias: {
        '/@': resolve('src'),
      }
    }
  },

  pluginOptions: {
    scaffold: {
      // 用于引入svg图标到.vue文件
      // https://github.com/nguyenvanduocit/vue-cli-plugin-style-resources-loader
      svg: {
        dir: resolve('src/assets/svg'), // 只有这个目录下的svg图片才会被转成组件
        svgo: {
          plugins: [
            {
              removeDoctype: true,
            },
            {
              removeComments: true,
            },
            {
              removeUselessStrokeAndFill: true,
            },
          ],
        },
      },
    },
    // 用于把css预处理器的公共模块自动引入到每个文件中
    // https://github.com/nguyenvanduocit/vue-cli-plugin-style-resources-loader
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/index.scss'),
        path.resolve(__dirname, 'src/assets/styles/mixins.scss'),
      ],
    },
  },
}
