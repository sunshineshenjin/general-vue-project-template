const path = require('path')
const fs = require('fs')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const env = process.env.NODE_ENV || 'production'
const baseEnv = process.env.BASE_ENV || 'develop'
let daApiUrl = 'http://localhost:8092/'
let BASE_URL = '/'
if (baseEnv === 'production') {
  BASE_URL = 'https://assets.dxycdn.com/gitrepo/da-admin-web/dist'
  daApiUrl = 'https://da.k8s.uc.host.dxy/'
} else if (baseEnv === 'develop') {
  BASE_URL = 'http://assets.dxycdn.com/gitrepo/da-admin-web_dynamic/dist'
  daApiUrl = 'http://localhost:8092/'
}

fs.writeFileSync(path.join(__dirname, './config/env.js'), `export const env = '${env}'\n`)
fs.writeFileSync(path.join(__dirname, './config/env.js'), `export const apiUrl = '${daApiUrl}'\n`, {flag: 'a'})
fs.writeFileSync(path.join(__dirname, './config/env.js'), `export const baseEnv = '${baseEnv}'\n`, {flag: 'a'})

module.exports = {
  baseUrl: BASE_URL,
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
