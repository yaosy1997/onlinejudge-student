module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8081',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/cloudApi': {
                target: 'http://47.95.1.117:8081',
                changeOrigin: true,
                pathRewrite: {
                    '^/cloudApi': ''
                }
            },
            '/imageApi': {
                target: 'http://47.95.1.117:80',
                changeOrigin: true,
                pathRewrite: {
                    '^/imageApi': ''
                }
            }
        }
    },
}