import HttpRequest from '@/lib/axios'
import config from '@/config'
const {baseUrl , localUrl} = config

const axios = new HttpRequest(baseUrl)
export default axios
