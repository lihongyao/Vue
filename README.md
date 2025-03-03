# 前言

本教程从基础入门，逐步深入讲解 Vue.js，并结合实际开发中常见的问题进行总结，帮助你更高效地掌握 Vue 的核心概念与实战技巧。

> 提示：
>
> 1. 本教程主要基于 Vite 2 + Vue 3 + TypeScript 进行示例演示。如果你对 TypeScript 还不熟悉，建议先阅读 [学习 TypeScript >>](https://gitee.com/lihongyao/TypeScript)。
> 2. 你可以点击 [这里 >>](https://github.com/vuejs/core/releases) 了解 Vue 的最新版本更新信息。
> 3. 建议结合 [官方文档 >>](https://staging-cn.vuejs.org/) 阅读，同时你也可以参考 [互动教程 >>](https://cn.vuejs.org/tutorial/#step-1) 进行实践。

# 概述

Vue (发音 /vjuː/，类似 **view**) 是一款用于构建用户界面的渐进式 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript，提供 **声明式**、**组件化** 的编程模型，帮助开发者高效构建用户界面。无论是简单的交互组件，还是复杂的单页应用（SPA），Vue 都能胜任。

**Vue 的核心思想**

1. **声明式渲染**

   通过模板语法，将数据和 DOM 绑定，描述式地定义 UI，而无需手动操作 DOM。

2. **组件化开发**

   UI 被拆分为独立的组件，每个组件包含自己的模板、逻辑和样式，可复用、可测试、可维护。

3. **响应式数据绑定**

   Vue 内部实现了高效的响应式系统，当数据变化时，自动触发视图更新，保持数据与 UI 的同步。

4. **单向数据流**

   父组件向子组件传递数据，子组件通过事件向父组件反馈，确保数据流向清晰、可维护。

5. **渐进式框架**

   Vue 既适用于小型项目，也能扩展到大型应用，并且可以与其他库或既有项目无缝集成。

# 初体验

@See https://cn.vuejs.org/guide/essentials/application.html

## 创建项目

课程示例均通过 [Vite](https://cn.vitejs.dev/) 来构建示例，当然你也可以在 [这里](https://cn.vuejs.org/guide/quick-start.html) 查看官方推荐的其他引用方式。

Vite 是一个面向现代浏览器的开发构建工具。它的目标是提供一种快速的开发体验，特别适用于Vue.js单页面应用（SPA）的开发。

接下来，我们一起尝试使用 Vite 来创建项目（[参考 >>](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)）：

```shell
$ pnpm create vite vue-tutorials --template vue-ts && cd vue-tutorials && pnpm install && code .
```

> **提示**：\<vue-tutorials> 为项目名称，该指令从 vut-ts 模板创建项目。

**配置 resolve.alias**

配置别名，可以似的我们通过 `@` 来指向 `src` 目录：

```shell
$ pnpm add -D @types/node
```

> **`vite.config.js`**

```ts
import type { UserConfig, ConfigEnv } from 'vite';
import { defineConfig } from 'vite'
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  void mode;
  const root = process.cwd();
  const pathResolve = (path: string) => resolve(root, '.', path);
  return {
    resolve: {
      alias: {
        "@": pathResolve('src'),
      },
    },
    plugins: [vue()],
  };
});
```

> **`tsconfig.app.json`**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
  },
}
```

> 提示：您可以根据需求配置，通常来说，配置 `@/` 指向 `src/*` 目录即可。

**配置 tailwindcss**

1. 安装 Tailwind CSS

```shell
$ pnpm add tailwindcss @tailwindcss/vite
```

2. 配置 Vite 插件：在 vite.config.ts 配置文件中添加 @tailwindcss/vite 插件

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    ...
    tailwindcss(),
  ],
})
```

3. 导入 Tailwind CSS：在您的 CSS 文件（*通常是 src/style.css*）中导入 Tailwind CSS 的内容

```js
@import "tailwindcss";
```

> 🔖 **提示**：如果你使用 PostCSS，请参考 [这里 >>](https://tailwindcss.com/docs/installation/using-postcss)

> 📢 **注意**：后续示例构建项目，都将采用此方式来创建。
>
> 🏷 **工具**：推荐的 IDE 配置是  [Visual Studio Code](https://code.visualstudio.com/) + [Vue-Official 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)。

## 目录结构

通过 Vite 构建的项目为我们预生成了一些文件，如下所示：

```
vue-examples
.
├── /node_modules
├── /public                    
├── /src              # 源码文件                  
│   ├── /assets       # 静态资源               
│   ├── /components   # 公共组件
│   ├── App.vue       # 根组件		           
│   ├── main.ts       # 入口文件  
│   ├── style.css     # 公共样式 
│   └──	vite-env.d.ts # 类型定义             
├── .gitignore                
├── index.html        # 模板文件               
├── package.json      # ...
├── tsconfig.app.json # TS配置文件      
├── ...
└── vite.config.ts    # Vite配置文件 
```

由于本教程主要从基础开始讲解，所以我们需要从头开始引入Vue，接下来我们删除不必要的文件，只保留如下目录结构：

```
vue-examples
.
├── /node_modules
├── /public                    
├── /src                                 
│   ├── main.ts       # 入口文件   
│   ├── style.css     # 入口文件   
│   └──	vite-env.d.ts # 类型定义             
├── .gitignore                
├── index.html        # 模板文件               
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.app.json # TS配置文件             
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts         
```

## 根组件

在创建应用实例时，我们需要传入一个 **根组件**（App.vue）作为应用的入口，所有其他组件都会作为它的 **子组件**。

在 Vue 中，推荐使用 **单文件组件**（Single-File Components，简称 **SFC**，即 *.vue 文件）。SFC 将 **模板**、**脚本** 和 **样式** 组织在同一个文件中，使组件更易于管理和复用。

**创建 App.vue**

在 src 目录下，新建 App.vue，并填充以下代码：

```vue
<script setup lang="ts"></script>

<template>
  <div class="App">Hello, Vue.js!</div>
</template>

<style lang="less" scoped></style>
```

**说明：**

1. script setup 是 Vue 3 推荐的 **组合式 API** 语法，语法简洁，性能更优。
2. template 部分定义了组件的 HTML 结构。
3. style scoped 使该组件的样式仅作用于当前组件，不影响全局。

## 应用实例

每个 Vue 应用都是通过 [createApp](https://cn.vuejs.org/api/application.html#createapp) 函数创建的，应用的 **根组件** 作为渲染的起点（通常为 App.vue）。

要将 Vue 应用挂载到 DOM 中，例如 \<div id="app">\</div>，可以这样写：

```typescript
import { createApp } from 'vue'
import App from '@/App.vue'
import './style.css'

createApp(App).mount('#app')
```

1. `createApp(App)` 创建一个 Vue **应用实例**，并将 App.vue 作为 **根组件**。
2. `mount('#app')` 将 Vue 应用挂载到 index.html 中的 div#app 标签中。
3. mount 方法返回的是 **根组件实例**，而不是应用实例。

> ⚠️ **注意**：Vite 生成的 index.html 默认包含 `<div id="app"></div>`，所以可以直接使用 #app 进行挂载。

## 运行项目

在终端运行以下命令，启动开发服务器：

```shell
$ pnpm dev
```

后在浏览器访问：http://localhost:5173/，你将看到页面显示 **“Hello, Vue.js!”** 🎉

> 🚀 **提示**：默认情况下，Vite 的开发服务器运行在 5173 端口。如果该端口被占用，Vite 会自动选择其他端口，你可以在终端查看具体的访问地址。

# API风格

@See https://cn.vuejs.org/guide/introduction#api-styles

Vue 的组件可以按两种不同的风格书写：**选项式 API** 和 **组合式 API**。

本小节主要讲解 组合式API 和 选项式API 的区别，对于介绍中的一些概念可能你不是很了解，不过没有关系，这不是重点，后续章节会重点介绍，在这里，你只需要了解二者的区别和我们最终的取舍即可。 

## 选项式 API

选项式 API 是 Vue 早期版本的开发方式，基于配置对象 (data、methods、computed、watch 等) 组织组件逻辑。它适合 **简单组件**，逻辑分层清晰，便于初学者快速上手。如下所示：

```vue
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'component-name' /** 组件名 */,
  mixins: [] /** 混合（复用组件功能） */,
  props: {} /** 属性（父组件调用时传入） */,
  data() {  return {} }, /** 组件内响应式数据，必须是一个函数，且返回一个对象*/
  computed: {}, /** 计算属性 */
  methods: {}, /** 方法 */
  watch: {}, /** 监听器 */
  emits: [], /** 自定义事件 */
  ...
});
</script>
```

> 提示：除了上面列出的部分，还包括一些生命周期钩子函数。

它将组件的逻辑分散在不同的选项（如`data`、`methods`、`computed`、`watch`等）中，使得组件的结构相对简单易懂。

使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，选项所定义的属性都会暴露在函数内部的 `this` 上，它会指向当前的组件实例。

```vue
<script>
export default {
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 this 上
  data() {
    return {
      count: 0
    }
  },

  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件处理器绑定
  methods: {
    increment() {
      this.count++
    }
  },

  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

选项式 API 在小型、简单的组件中易于上手和理解，但当组件变得更大、更复杂时，存在以下问题：

- **代码逻辑被拆分**：实现一个功能时，其逻辑会被分散到 data、methods、computed、watch 等不同的选项中，不利于维护。
- **逻辑关注点分散**：组件复杂度增加后，同一个功能的代码分布在多个部分，使得阅读和修改变得困难。
- **降低可读性**：对于未编写该组件的开发者来说，理解组件的逻辑需要在多个选项之间来回跳转，增加了学习成本。

因此，选项式 API 更适合编写**小型、简单**的组件，而对于**大型、复杂**的组件，组合式 API 提供了更好的组织方式，使代码结构更清晰、可复用性更强。

## 组合式 API

组合式 API 是 Vue 3.0 引入的新特性，旨在 **解决大型、复杂组件的 维护难题**。相比选项式 API，组合式 API 允许使用 [\<script setup>](https://staging-cn.vuejs.org/api/sfc-script-setup.html) 将组件的逻辑**组织在一起**，并通过**自定义组合函数（Composition Function）**封装可复用的逻辑。

**组合式 API 的优势**

1. **逻辑聚合**：相关逻辑可以放在同一作用域内，避免选项式 API 中逻辑分散的问题。
2. **更高的可复用性**：可以封装成可复用的 composables，便于在多个组件间共享逻辑。
3. **更强的灵活性**：不依赖 this，可以自由地使用 JavaScript 的特性进行组织。

现在，我们将刚刚的示例以组合式API的形式来实现：

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

> **⚠️ 注意**：由于 setup 在 beforeCreate 之前执行（也就是说在实例被完全初始化之前执行），因此无法使用 this 访问组件实例的属性和方法。

## **如何选择？**  

| 选择因素          | 选项式 API 适用场景                           | 组合式 API 适用场景                  |
| ----------------- | --------------------------------------------- | ------------------------------------ |
| 项目版本          | 适用于 Vue 2.x 或已有项目，避免大规模迁移成本 | Vue 3.x 新项目，利用最新特性         |
| 组件复杂度        | 适合简单组件，逻辑分散但易读                  | 适合复杂组件，逻辑可聚合             |
| 代码复用          | 逻辑难以复用，需 `mixin` 或 `extend`          | 通过 `Composition Function` 轻松复用 |
| TypeScript 兼容性 | 类型推导有限，TypeScript 适配性一般           | 更好的类型推导，TypeScript 兼容性强  |

**结论**

1. **新项目**：优先推荐 **组合式 API**，可读性、可维护性、复用性更强。
2. **已有 Vue 2.x 项目**：若迁移成本较高，可继续使用 **选项式 API**。
3. **团队协作**：如果团队成员熟悉选项式 API，短期内无需强制迁移，但建议逐步过渡到组合式 API。

> 💡**提示**：**后续示例将默认使用 Composition API 进行讲解**，便于掌握更现代的 Vue 3 开发方式。

# Vue2.x 🆚 Vue3.x

|     对比项      | Vue 2.x                                                      | Vue 3.x                                              |
| :-------------: | :----------------------------------------------------------- | ---------------------------------------------------- |
|      性能       | 使用 `Object.defineProperty` 进行响应式数据追踪，性能相对较低 | 使用 `Proxy` 代理对象，响应式系统更高效              |
|    API 风格     | 选项式 API（Options API）                                    | 组合式 API（Composition API）                        |
| TypeScript 支持 | 限制较多，类型推导较弱                                       | 更强大的类型推导，与 TypeScript 更兼容               |
|     包体积      | 体积较大                                                     | 通过模块拆分和优化，体积更小                         |
|    逻辑复用     | 依赖 `mixin`、`extend`，容易导致命名冲突                     | 通过 `Composition Function` 轻松复用代码             |
|  Teleport 组件  | 不支持                                                       | 允许组件内容渲染到 DOM 树的不同位置                  |
|  Fragment 支持  | 需要额外的根标签                                             | 组件可返回多个根元素，无需额外标签                   |
|   响应式 API    | 依赖 `Vue.observable` 和 `data`                              | 提供 `reactive`、`ref`、`watchEffect` 等更强大的 API |

# 特别说明

为了便于演示示例，在讲解新知识点之前，建议您新建一个组件。例如，在讲解模板渲染时，您可以在 `./src/components` 目录下新建一个 `Templates.vue` 文件（文件名可自定义，但应尽量保持语义化）。该文件是一个单文件组件，尽管我们尚未深入探讨组件章节，但您可以借此机会提前了解一些组件的基础知识。

以下是组件的基本结构，通常包含三个部分：

```vue
<!-- 脚本 -->
<script setup lang="ts"></script>

<!-- 模板 -->
<template></template>

<!-- 样式 -->
<style scoped></style>
```

定义好组件后，您需要在 `App.vue` 文件中引用它：

```vue
<!-- 脚本 -->
<script setup lang="ts">
// 导入组件
import Templates from './components/Templates.vue';
</script>

<!-- 模板 -->
<template>
  <!-- 使用组件 -->
  <Templates />
</template>

<!-- 样式 -->
<style scoped></style>
```

