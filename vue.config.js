module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        //host: '192.168.0.2',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            "/apis": {
                //target: "http://127.0.0.1:8000/",
                target: "http://39.107.48.224:8000/",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/apis": ""
                }
            }
        },
        before: app => {}
    },
    pages: {
        index: {
            entry: "./src/views/index/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "xxxholic"
        },
        login: {
            entry: "./src/views/login/main.js",
            template: "public/login.html",
            filename: "login",
            title: "login"
        },
        user: {
            entry: "./src/views/user/main.js",
            template: "public/user.html",
            filename: "user",
            title: "user",
        },
        admin: {
            entry: "./src/views/admin/main.js",
            template: "public/admin.html",
            filename: "admin",
            title: "admin",
        },
    },
    lintOnSave: true,
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */
    publicPath : './',
    // 基本路径
    //publicPath: process.env.NODE_ENV === 'production' ?
    //    './' : '/',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    // lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    //compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    //如果想要引入babel-polyfill可以这样写
    // configureWebpack: (config) => {
    //   config.entry = ["babel-polyfill", "./src/main.js"]
    // },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    //vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    // productionSourceMap: true,
    // css相关配置
    //css: {
    // 是否使用css分离插件 ExtractTextPlugin
    //   extract: true,
    // 开启 CSS source maps?
    //   sourceMap: false,
    // css预设器配置项
    //   loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false
    // },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    //parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    //   pwa: {},
    // webpack-dev-server 相关配置

    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}