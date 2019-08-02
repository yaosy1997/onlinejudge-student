import HttpRequest from '@/lib/axios'
const baseUrl = '/cloudApi'
const localUrl = '/api'

const axios = new HttpRequest(baseUrl)
export default axios
