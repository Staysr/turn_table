module.exports = {
    publicPath: '/turntable/',
    lintOnSave: false,
    configureWebpack: {},

    chainWebpack: (config) => {
      config.plugin('html')
        .tap(args => {
          args[0].title= '满减活动'
          return args
        })
    },

    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require("postcss-px2rem")({
                        remUnit: 75
                    })
                ]
            }
        }
    },

    devServer: {
        proxy: {  //配置跨域
            '/api': {
                target: 'http://dspadmin.appletcloud.net',  //这里后台的地址模拟的;应该填写你们真实的后台接口
                changOrigin: true,  //允许跨域
                pathRewrite: {
                    /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
                      实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
                     */
                    '^/api': ''
                }
            },
            // '/yt': {
            //     target: 'http://demo.yaojiushenjiu.com',
            //     changOrigin: true,
            //     pathRewrite: {
            //         '^/yt': ''
            //     }
            // },
        }
    },
};