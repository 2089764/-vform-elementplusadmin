vform3的sdk的组件开发指引
# 效果
<img width="2533" alt="image" src="https://user-images.githubusercontent.com/1099115/220101999-16776ce6-ff40-49a2-8f38-852ab9ae0bf9.png">

# 初始化一个vue3 + vite的项目
```
npm create vite@latest
✔ Project name: … demo2
✔ Select a framework: › Vue
✔ Select a variant: › JavaScript

Scaffolding project in /kenfang/code/fucai/ssc/element/demo2/demo2...

Done. Now run:

  cd demo2
  npm install
  npm run dev
```
# VForm 3依赖Element Plus，需要先安装Element Plus。
npm i element-plus

# 安装 fast-glob 
npm install --save-dev fast-glob

# 安装vform 或 按下面目录创建
<img width="309" alt="image" src="https://user-images.githubusercontent.com/1099115/220094922-7e15d0bc-bb8e-4202-939e-f101ec98ab72.png">

# 修改vite.config.js
>配置端口及引入库的路径
```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import { fileURLToPath } from 'url'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirnameNew, 'src') //@路径别名
    },
    extensions: ['.js', '.vue', '.json', '.ts'] //使用路径别名时想要省略的后缀名，可以自己增减
  },
  optimizeDeps: {
    include: ['@/../lib/vform/designer.umd.js']
  },
  server: {
    port: 3001,
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true
      }
    },
    hmr: {
      overlay: false
    },
    host: '0.0.0.0'
  },
  build: {
    commonjsOptions: {
      include: /node_modules|lib/
    }
  }
})

```

# 将组件模块代码放下载解压到里面。（核心）
<img width="270" alt="image" src="https://user-images.githubusercontent.com/1099115/220099828-b348480a-2d2f-4a98-abab-ef788801710f.png">


# 修改
> src/main.js
```
import { createApp } from 'vue'
import App from './App.vue'

//引入elementplus库和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入vform
import VForm from '@/../lib/vform/designer.umd.js'
import '../lib/vform/designer.style.css'

//引入sdk开发的组件
import { loadCustomWidgets } from '@/components/vform-custom/custom-widgets-loader.js'

const app = createApp(App)
app.use(ElementPlus) //全局注册element-plus
app.use(VForm) //全局注册VForm3，同时注册了v-form-designer、v-form-render等组件
loadCustomWidgets(app) //加载自定义组件
app.mount('#app') //done


```
# 修改App.vue
```
<script setup>
</script>

<template>
  <v-form-designer></v-form-designer>
</template>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
```

# 效果
<img width="2533" alt="image" src="https://user-images.githubusercontent.com/1099115/220101975-cd99a517-9c84-4c78-934d-b0eead4ea841.png">





