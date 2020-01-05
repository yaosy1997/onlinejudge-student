const proxy = require('./src/config/proxy.js') ? require('./src/config/proxy.js') : {}
module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: proxy
    },
}