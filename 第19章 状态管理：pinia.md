# 概述

Pinia 是一个简单、灵活且类型安全的状态管理库，适用于Vue.js应用程序的状态管理。它提供了一种模块化的方法来组织和管理状态，并与Vue 3的Composition API无缝集成。无论是小型项目还是大型应用程序，Pinia都能提供良好的开发体验和可维护性。

关于 Pinia 的具体使用，建议直接参考 【[官方文档 >>](https://pinia.vuejs.org/zh/)】，这里只演示在实际开发中应该如何使用。

常用方法：

- `store.k`：访问/编辑State
- `store.$patch(Object | Function)`：变更 State（支持同一时间更改多个属性）
- `store.$reset()`：重置State

# 示例

## 创建项目

```shell
$ npm create vite@latest pinia-examples -- --template vue-ts && cd pinia-examples && npm install && code .
$ npm install pinia
$ mkdir -p src/stores && touch src/stores/index.ts
```

## 定义Store

**`src/store/index.ts`**

```ts
import { defineStore } from 'pinia';

interface UserProps {
  name: string;
  age: number;
}

interface State {
  appID: string;
  count: number;
  userList: UserProps[];
}

export const useAppStore = defineStore('appStore', {
  state: (): State => ({
    appID: 'wx9d0f652e42541e26',
    count: 0,
    userList: [],
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

## 导入Store

**`main.ts`**

```ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAppStore } from './stores';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
```

## 访问Store

```vue
<script setup lang="ts">
import { useAppStore } from './stores';
const store = useAppStore();
</script>

<template>
  <button @click="store.increment()">{{ store.count }}</button>
</template>
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
$ npm i pinia-plugin-persist
```

