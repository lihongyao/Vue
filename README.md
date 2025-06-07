# 前言

本教程从基础入门，逐步深入讲解 Vue.js，并结合实际开发中常见的问题进行总结，帮助你更高效地掌握 Vue 的核心概念与实战技巧。

> 提示：
>
> 1. 本教程主要基于 Vite6+ / Vue3+ / TypeScript 进行示例演示。如果你对 TypeScript 还不熟悉，建议先阅读 [学习 TypeScript >>](https://gitee.com/lihongyao/TypeScript)。
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

> **提示**：\<vue-tutorials> 为项目名称，该指令从 vue-ts 模板创建项目。

**配置 resolve.alias**

配置别名，可以似的我们通过 `@` 来指向 `src` 目录：

```shell
$ pnpm add -D @types/node
```

> **`vite.config.ts`**

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
vue-tutorials
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

1. `<script setup lang="ts">`：脚本，Vue 3 推荐的 **组合式 API** 语法，语法简洁，性能更优。
2. `<template>`：模板，定义了组件的 HTML 结构。
3. `<style lang="less" scoped>`：样式，仅作用于当前组件，不影响全局。

## 应用实例

每个 Vue 应用都是通过 [createApp](https://cn.vuejs.org/api/application.html#createapp) 函数创建的，应用的 **根组件** 作为渲染的起点（通常为 App.vue）。

要将 Vue 应用挂载到 DOM 中，例如 \<div id="app">\</div>，可以这样写：

```typescript
import { createApp } from 'vue'
import App from '@/App.vue'
import './style.css'

createApp(App).mount('#app')
```

1. `createApp(App)`：创建一个 Vue **应用实例**，并将 App.vue 作为 **根组件**。
2. `mount('#app')`：将 Vue 应用挂载到 index.html 中的 `div#app` 标签中。
3. `mount()`：挂载，该方法返回的是 **根组件实例**，而不是应用实例。

> ⚠️ **注意**：Vite 生成的 index.html 默认包含 `<div id="app"></div>`，所以可以直接使用 #app 进行挂载。

## 运行项目

在终端运行以下命令，启动开发服务器：

```shell
$ pnpm dev
```

后在浏览器访问：http://localhost:5173/，你将看到页面显示：*Hello, Vue.js!*

> 🚀 **提示**：默认情况下，Vite 的开发服务器运行在 5173 端口。如果该端口被占用，Vite 会自动选择其他端口，你可以在终端查看具体的访问地址。

# API风格

@See https://cn.vuejs.org/guide/introduction#api-styles

Vue 提供了两种主要的组件开发风格：**选项式 API (Options API)** 和 **组合式 API (Composition API)**，两者在代码组织和逻辑复用上有显著差异。

> 提示：
>
> 本小节主要讲解 组合式API 和 选项式API 的区别，对于介绍中的一些概念可能你不是很了解，不过没有关系，这不是重点，后续章节会重点介绍，在这里，你只需要了解二者的区别和我们最终的取舍即可。 

## 选项式 API

**特点：**

- 通过预定义的选项（如 `data`、`methods`、`computed`、`watch` 等）组织组件逻辑。
- 逻辑分散在不同选项中，适合简单组件或快速开发。
- 通过 `this` 访问组件实例的属性和方法。

**示例：**

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

**适用场景：**

1. 小型项目或初学者入门。
2. 需要快速原型开发或维护旧版 Vue 项目。

## 组合式 API

组合式 API 是 Vue 3.0 引入的新特性，其特点如下：

1. 使用 `setup()` 函数集中管理逻辑，通过 `ref`、`reactive` 等函数创建响应式状态。
2. 逻辑按功能聚合，支持高度复用（通过自定义 Hook）。
3. 更好的 TypeScript 支持和类型推断。

**示例：**

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

**适用场景**：

1. 复杂组件或大型应用。
2. 需要逻辑复用或 TypeScript 深度集成。

> **⚠️ 注意**：由于 setup 在 beforeCreate 之前执行（也就是说在实例被完全初始化之前执行），因此无法使用 this 访问组件实例的属性和方法。

## **如何选择？**  

| 选择因素          | 选项式 API 适用场景                           | 组合式 API 适用场景          |
| ----------------- | --------------------------------------------- | ---------------------------- |
| 项目版本          | 适用于 Vue 2.x 或已有项目，避免大规模迁移成本 | Vue 3.x 新项目，利用最新特性 |
| 逻辑组织          | 按选项分散（data/methods 等）                 | 按功能集中（`setup` 函数内） |
| 代码复用          | 依赖 Mixins（易冲突）                         | 自定义 Hook（灵活复用）      |
| TypeScript 兼容性 | 需额外类型标注                                | 原生支持良好                 |

**结论**

1. **新项目**：优先推荐 **组合式 API**，可读性、可维护性、复用性更强。
2. **已有 Vue 2.x 项目**：若迁移成本较高，可继续使用 **选项式 API**。
3. **团队协作**：如果团队成员熟悉选项式 API，短期内无需强制迁移，但建议逐步过渡到组合式 API。

> 💡**提示**：**后续示例将默认使用 Composition API 进行讲解**，便于掌握更现代的 Vue 3 开发方式。

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

