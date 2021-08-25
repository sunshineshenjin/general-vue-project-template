const path = require('path')
const fs = require('fs')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const VUE_APP_BASE_ENV = process.env.VUE_APP_BASE_ENV
const baseUrlMap = {
  dev: '/view/',
  test: 'xxx',
  uat: 'xxxxx',
  prod: 'xxxxxx'
}
console.info(VUE_APP_BASE_ENV)
const BASE_URL = baseUrlMap[VUE_APP_BASE_ENV]

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'dist',
  filenameHashing: true,
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
  }
}
