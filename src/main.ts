// 引入windi css
import '@/plugins/windi.css'

// 导入全局的svg图标
import '@/plugins/svgIcon'

// 初始化多语言
import { setupI18n } from '@/plugins/vueI18n'

// 引入状态管理
import { setupStore } from '@/store'

// 全局组件
import { setupGlobCom } from '@/components'

// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 引入全局样式
import '@/styles/index.less'

// 引入动画
import '@/plugins/animate.css'

// 路由
import { setupRouter } from './router'

// 权限
import { setupPermission } from './directives'

import { createApp } from 'vue'

import App from './App.vue'

import './permission'

//引入element-plus库
import ElementPlus from 'element-plus'
//引入element-plus样式
import 'element-plus/dist/index.css'

import VForm3 from '@/../lib/vform/designer.umd.js'
import '../lib/vform/designer.style.css'

import VForm3Render from '@/../lib/vform/render.umd.js'
import '../lib/vform/render.style.css'

// 创建实例
const setupAll = async () => {
  const app = createApp(App)
  await setupI18n(app)
  setupStore(app)
  setupGlobCom(app)
  setupElementPlus(app)
  setupRouter(app)
  setupPermission(app)
  //全局注册element-plus
  app.use(ElementPlus)
  //全局注册VForm3，同时注册了v-form-designer、v-form-render等组件
  app.use(VForm3)
  //注册v-form-render等组件
  app.use(VForm3Render)
  app.mount('#app')
}

setupAll()
