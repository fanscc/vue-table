// Explanation of each configuration item You can find it in https://cli.vuejs.org/config/

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, "./", dir);
}
function proxyObj(goMock, url, Rewrite) {
  if (goMock) {
    return {
      target: "http://localhost:3002",
      host: "localhost:3002",
      // pathRewrite: {"^/api" : ""} //请求 /api/home/index  就会变成 localhost:3000/home/index
      pathRewrite() {
        return Rewrite;
      }
    };
  } else {
    return {
      target: url,
      changeOrigin: true
    };
  }
}

const url = "http://192.168.16.120:8080"; // 柯涛
// 是否开启mock
let goMock = true;

if (goMock) {
  require("./mock");
}

module.exports = {
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#baseurl
   */
  publicPath: "",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 9001,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/queryLuckyDrawData": proxyObj(goMock, url, "/login"),
      "/account": proxyObj(goMock, url, "/ckytestData"),
      "/order_code": proxyObj(goMock, url, "/delete"),
      "/getSuppliersMap": proxyObj(goMock, url, "/suppliersMap")
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "button-primary-background-color": "#f8b62c",
          "button-primary-color": "#1D1C1C",
          "button-primary-border-color": "#f8b62c"
        }
      }
    }
  },

  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: "逐道H5",
    resolve: {
      alias: {
        "@": resolve("src"),
        Utils: resolve("src/utils"),
        Mixins: resolve("src/mixins"),
        Api: resolve("src/api"),
        Store: resolve("src/store"),
        Style: resolve("src/style"),
        Image: resolve("src/assets/image")
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.plugin("define").tap(options => {
      const pluginOptions = options[0];
      pluginOptions["process.env"].ONLINE = JSON.stringify(
        process.env.npm_config_env
      );
      return options;
    });
    config.when(process.env.NODE_ENV === "development", config =>
      config.devtool("cheap-source-map")
    );

    config.when(process.env.NODE_ENV !== "development", config => {
      // config.plugin("ScriptExtHtmlWebpackPlugin").use("script-ext-html-webpack-plugin", [
      //   {
      //     // `runtime` must same as runtimeChunk name. default is `runtime`
      //     inline: /runtime\..*\.js$/
      //   }
      // ]);
      //     config.optimization.splitChunks({
      //       chunks: "all",
      //       cacheGroups: {
      //         libs: {
      //           name: "chunk-libs",
      //           test: /[\\/]node_modules[\\/]/,
      //           priority: 10,
      //           chunks: "initial" // 只打包初始时依赖的第三方
      //         },
      //     });
      config.optimization.runtimeChunk("single");
    });
  }
};
