module.exports = {
    // 基本路径
    // publicPath: '/h5/luohugongan/template',
    publicPath: './',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // 配置js、css等文件夹的二级目录位置，不设置则会在dist下生成4个文件夹
    assetsDir: "static",

    devServer: {
        proxy: {
            '/': {
                target: 'http://wx.ndszgb.com',
                changeOrigin: true,
                ws:false,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
/*        proxyTable: {
            '/': {
                target: 'https://wx.ndszgb.com', // 目标域名
                changeOrigin: true,
                pathRewrite: {
                    '^/': '' // 规则, 见下面说明
                },
                // headers: {
                //     'Cookie': 'SID=810q3nmoi5mfp8geb9bkm9jql0;' 这里可以设置cookies, 也可以不设置
                // }
            }
        },*/
    }

}