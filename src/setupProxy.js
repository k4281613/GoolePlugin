const proxy = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        proxy.createProxyMiddleware('/juhe', { //`api`是需要转发的请求
            target: 'http://v.juhe.cn/', // 这里是接口服务器地址
            changeOrigin: true,
            pathRewrite: {
                "^/juhe": "/"
            },
        }),
        proxy.createProxyMiddleware('/bi', { //`api`是需要转发的请求
            target: 'http://bi.camelwifi.cn/', // 这里是接口服务器地址
            changeOrigin: true,
            pathRewrite: {
                "^/bi": "/"
            },
        })
    )
}
