const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463
   */
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  /*
  pages: {
    index: {
      entry: 'src/',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */
  configureWebpack: {},

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */


          'primary-color': '#CC0000',
          'link-color': '#CC0000',
          'border-radius-base': '4px',
          'font-size-base':'16px',
          'text-color':'#000',
          'border-color-split':'#FBD2D2',
          'table-header-bg':'#CC0000',
          'table-header-color':'#fff',
          'table-border-color-base':'#CC0000',

        },
        javascriptEnabled: true,
      }
    }
  },

  devServer: {
    port: 3000,
    proxy: {// 10.21.1.8:8080超
     '/api*': {
        //target: 'http://10.21.3.34:8080',
        //target: 'http://218.26.86.115:8082',
        //target: 'http://10.21.2.145:8080',
				target: 'http://10.21.1.91:8080',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '': ''  //默认所有请求都加了jeecg-boot前缀，需要去掉
        }
      },
    }
  },

  lintOnSave: undefined
}
