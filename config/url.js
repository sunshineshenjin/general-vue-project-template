import {env, apiUrl} from './env'

// 从环境变量读取接口URL
const DEV_URL = apiUrl || window.API_SERVER_URL
const PRO_URL = apiUrl || DEV_URL

export default env === 'development' ? DEV_URL : PRO_URL
