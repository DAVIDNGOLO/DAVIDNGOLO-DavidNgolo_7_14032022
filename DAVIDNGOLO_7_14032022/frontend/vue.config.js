const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: 'http://localhost:5000'
  }

})

/*module.exports = {
  devServer: {
      '/api': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }*/

