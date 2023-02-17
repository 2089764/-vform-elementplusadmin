
# 整合后的代码在master上

# 最终效果
<img width="2541" alt="image" src="https://user-images.githubusercontent.com/1099115/219689275-68813305-cc29-46a6-ad55-26853926ed86.png">

# 说明 本仓库是学习使用 
整合Variant Form vue3 和 vue-element-plus-admin 最新版

- vue-element-plus-admin 
> https://github.com/kailong321200875/vue-element-plus-admin 

- vform666 
> https://www.vform666.com/

# 依赖环境 
```
❯ node -v
v16.19.0
❯ npm -v
8.19.3
```

# 操作步骤
```
mkdir vform-elementplusadmin
cd vform-elementplusadmin
git clone https://github.com/kailong321200875/vue-element-plus-admin.git .
```
<img width="1188" alt="image" src="https://user-images.githubusercontent.com/1099115/219654526-6d40645b-b1ca-49fc-87cb-b4b4c4ac077c.png">

- 拉取variant-form3-vite
```
git clone https://github.com/vform666/variant-form3-vite.git
cd variant-form3-vite
```
- 安装依赖
> 一定要注意安装node 16 
```
nvm use 16
npm install --registry=https://registry.npm.taobao.org
```

- 编译打包设计器
```
npm run lib
```
<img width="213" alt="image" src="https://user-images.githubusercontent.com/1099115/219677175-37414b6e-e580-46e6-a0d1-763b2a3adb7b.png">

- 遇到问题Cannot find module 'autoprefixer'
> Loading PostCSS Plugin failed: Cannot find module 'autoprefixer'
```
 npm install autoprefixer --save-dev
```
- 表单渲染器打包
```
npm run lib-render
```
<img width="212" alt="image" src="https://user-images.githubusercontent.com/1099115/219676961-7b425243-72e3-4cc0-998b-5c3695906968.png">

# 将上面编译后的文件 放到vue-element-plus-admin项目根目录下的lib/vform里面
```
mkdir lib/vform
cp dist/* lib/vform/
```
<img width="234" alt="image" src="https://user-images.githubusercontent.com/1099115/219677672-dce90e55-0960-4f82-a8ae-1d8fb60fa133.png">


# 修改src/main.ts
<img width="888" alt="image" src="https://user-images.githubusercontent.com/1099115/219679565-4b4fa227-1761-487e-8b17-c5ffb3985124.png">

```
//引入element-plus库
import ElementPlus from 'element-plus'
//引入element-plus样式
import 'element-plus/dist/index.css'

import VForm3 from '@/../lib/vform/designer.umd.js'
import '../lib/vform/designer.style.css'

import VForm3Render from '@/../lib/vform/render.umd.js'
import '../lib/vform/render.style.css'

  //全局注册element-plus
  app.use(ElementPlus)
  //全局注册VForm3，同时注册了v-form-designer、v-form-render等组件
  app.use(VForm3)
  //注册v-form-render等组件
  app.use(VForm3Render)
```
# 修改 vite.config.ts
<img width="1132" alt="image" src="https://user-images.githubusercontent.com/1099115/219680422-e7c95970-c5aa-4ad2-b9ac-7b98911c8dd6.png">

# 增加路由 
```
 {
        path: 'vformDemo',
        component: () => import('@/views/Vformdemo/index.vue'),
        name: 'vformDemo',
        meta: {
          title: t('router.vformDemo'),
          noCache: true
        }
      }
```

<img width="960" alt="image" src="https://user-images.githubusercontent.com/1099115/219680835-16a3520c-a55a-4342-92d5-59091ecdb2c8.png">

# 新增文件 src/views/Vformdemo/index.vue
新建目录 Vformdemo ，新建文件 index.vue

```vue
<template>
    <div id="app">
      <v-form-designer
        ref="vfDesigner"
        :field-list-api="fieldListApi"
        :banned-widgets="testBanned"
        :designer-config="designerConfig"
      >
        <!-- 自定义按钮插槽演示 -->
        <template #customToolButtons>
          <el-button type="text" @click="saveFormJson">保存</el-button>
        </template>
      </v-form-designer>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  
  const vfDesigner = ref(null)
  const fieldListApi = reactive({
    URL: 'https://www.fastmock.site/mock/2de212e0dc4b8e0885fea44ab9f2e1d0/vform/listField',
    labelKey: 'fieldLabel',
    nameKey: 'fieldName'
  })
  const testBanned = ref([
    //'sub-form',
    //'alert',
  ])
  const designerConfig = reactive({
    languageMenu: true
    //externalLink: false,
    //formTemplates: false,
    //eventCollapse: false,
    //clearDesignerButton: false,
    //previewFormButton: false,
  
    //presetCssCode: '.abc { font-size: 16px; }',
  })
  
  const saveFormJson = () => {
    let formJson = vfDesigner.value.getFormJson()
    //TODO: 将formJson提交给后端保存接口，需自行实现！！
    ElMessage.success('表单已保存！')
  }
  </script>
  
  <style lang="scss">
  #app {
    height: 100%;
  }
  #app svg {
    display: inline-block;
  }
  </style>
  
```

# 多语言 配置 修改 src/locales/en.ts  zh-CN.ts +148
    sticky: '黏性',
    vformDemo: '表单设计'
<img width="798" alt="image" src="https://user-images.githubusercontent.com/1099115/219681723-c9cf79ee-d426-4c3d-ba44-ea08649eeadb.png"><img width="889" alt="image" src="https://user-images.githubusercontent.com/1099115/219681810-e8d4f5f8-8741-4ae0-b2e3-1158e7ab9bd5.png">

<img width="798" alt="image" src="https://user-images.githubusercontent.com/1099115/219681723-c9cf79ee-d426-4c3d-ba44-ea08649eeadb.png">

# 安装依赖 element-plus-admin 
pnpm install 
# 运行
pnpm run dev 

#  ERROR  Preprocessor dependency "sass" not found. Did you install it?  
pnpm i --save-dev sass 

# 遇到样式错乱 
<img width="1512" alt="image" src="https://user-images.githubusercontent.com/1099115/219689026-34f60d45-9a07-4233-8d98-98e55f97de16.png">

```
#app svg {
   display: inline-block;
}
```
