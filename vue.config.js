const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const name = "vue Music";
const port = 8088;
const Version = new Date()
  .getTime()
  .toString()
  .match(/.*(.{8})/)[1]; // 截取时间戳后八位
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
     //反向代理
    // proxy: {
    //   '/mock-api/': {
    //     target: 'https://vue-typescript-admin-mock-server-armour.vercel.app/mock-api',
    //     ws: true,
    //     pathRewrite: {
    //       '^/mock-api/': ''
    //     },
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    output: {
      filename: `js/[name].${Version}.js`,
      chunkFilename: `js/[name].${Version}.js`,
    },
  },
  chainWebpack(config) {
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
