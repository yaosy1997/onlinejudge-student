const local = {
    api: 'http://127.0.0.1:8081',
    cloudApi: 'http://47.95.1.117:8081',
    imageApi: 'http://47.95.1.117:80'
}

module.exports = proxy = {
    /**
     * @description 代理设置
     */
    '/api': {
        target: local.api,
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    },
    '/cloudApi': {
        target: local.cloudApi,
        changeOrigin: true,
        pathRewrite: {
            '^/cloudApi': ''
        }
    },
    '/imageApi': {
        target: local.imageApi,
        changeOrigin: true,
        pathRewrite: {
            '^/imageApi': ''
        }
    }
}