# 概述

[Pinia >>](https://pinia.vuejs.org/zh/) 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。

相较于 Vuex，它更加简洁、轻量，并且天然支持 TypeScript。本文将介绍如何在 Vite + Vue 3 + TypeScript 项目中使用 Pinia，并结合组合式 API 来构建一个现代化的前端应用。

> 💡**提示**：关于 Pinia 的具体使用，建议直接参考 【[官方文档 >>](https://pinia.vuejs.org/zh/)】，这里只演示在实际开发中应该如何使用。

常用方法：

- `store.k`：访问/编辑State
- `store.$patch(Object | Function)`：变更 State（支持同一时间更改多个属性）
- `store.$reset()`：重置State

# 示例

## 准备工作

```shell
# 创建项目
$ pnpm create vite pinia-tutorials --template vue-ts && cd pinia-tutorials && pnpm install && code .
# 安装 Pinia
$ pnpm add pinia
# 创建文件
$ mkdir -p src/stores && touch src/stores/global.ts
```

## 配置 Pinia

在 **`src/main.ts`** 中引入并配置 Pinia：

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

## 创建第一个 Store

在 **`src/stores`** 目录下创建一个 global.ts 文件，定义一个全局 Store：

```ts
import { defineStore } from 'pinia';


interface State {
  count: number;
  version: string;
  users: Array<{ name: string, age: number }>;
}

export const useGlobalStore = defineStore('globalStore', {
  state: (): State => ({
    version: 'v1.0.0',
    count: 1,
    users: [],
  }),
  getters: {
    double: (state) => state.count * 2,
    doublePlusOne(): number {
      return this.double + 1;
    },
  },
  actions: {
    async increment() {
      this.count++;
    },
  },
});
```

## 在组件中使用 Store

```vue
<script setup lang="ts">
import { useGlobalStore } from "./stores/global";
const globalStore = useGlobalStore();
</script>

<template>
  <div>{{ globalStore.count }}</div>
  <div>{{ globalStore.doublePlusOne }}</div>
</template>

<style scoped></style>
```

# 拓展

## Pinia vs. Vuex

- pinia只有store、getter、action，mutations 不再存在，简化了状态管理的操作；
- pinia模块划分不需要modules，
- pinia自动化代码拆分
- pinia对ts支持很好以及vue3的composition API
- pinia体积更小，性能更好

## 持久化

### 原生持久化

```ts
// 👉 持久化pinia
const store = useAppStore();
// 页面进入：合并状态
const localState = localStorage.getItem('appStorePersist');
if (localState) {
  console.log('[温馨提示]：合并Store...');
  store.$state = JSON.parse(localState);
}
// 页面刷新：存储状态
window.addEventListener('beforeunload', () => {
  console.log('[温馨提示]：缓存Store...');
  localStorage.setItem('appStorePersist', JSON.stringify(store.$state));
});
```

### 插件持久化

```shell
$ pnpm add pinia-plugin-persist
```

