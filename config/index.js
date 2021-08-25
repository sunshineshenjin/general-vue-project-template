let environment = process.env.VUE_APP_BASE_ENV

const apiUrlMap = {
  dev: 'https://f2e.dxy.net/mock-api/client/60ab5fd5c7e4001af9f75e47/',
  test: 'xxxxxxxxx',
  uat: 'xxxxxx',
  prod: 'xxxxxx'
}

export default {
  apiUrl: apiUrlMap[environment]
}
