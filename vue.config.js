const proxy = require('./src/config/proxy.js') ? require('./src/config/proxy.js') : {}
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: proxy
    },
    configureWebpack: config => {
        if (isProduction){
            const plugins = [];
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
            config.externals = {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'vuex': 'Vuex',
                'axios': 'axios',
                'iview': 'iview',
            }
        } 

    },
}