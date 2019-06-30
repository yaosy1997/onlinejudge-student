import HttpRequest from '@/lib/axios'
const baseUrl = '/cloudApi'

const axios = new HttpRequest(baseUrl)
export default axios
