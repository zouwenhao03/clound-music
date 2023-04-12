import Icon from "../components/common/icon.vue"

//图标自动导入
//利用webpack 的require.context自动导入
//返回的req是只去加载svg目录中的模块的函数
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req);
export default function(app) {
  app.component('SvgIcon',  Icon)
}