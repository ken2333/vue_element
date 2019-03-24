module.exports = {
    devServer: {
        open: false,
/*        proxy: {
            '/article': {
                target: "http://127.0.0.1:8081/article/",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/article': ''
                }
            }
        }*/
                 proxy: {
                    '/api': {
                        target: "http://127.0.0.1:8081",
                        ws: true,
                        changeOrigin: true,
                        pathRewrite: {
                            '^/api': ''
                        }
                    }
                }
    }
}
