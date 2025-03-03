<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, nextTick } from 'vue';


interface StateProps {
  colors: Array<{ label: string; color: string }>;
  timer: any;
}
  
// -- state
const state = reactive<StateProps>({
  colors: [
    { label: 'A', color: '#4b69ff' },
    { label: 'B', color: '#e4ae39' },
    { label: 'C', color: '#8847ff' },
    { label: 'D', color: '#d32ce6' },
    { label: 'E', color: '#eb4b4b' },
  ],
  timer: null,
});

// -- life circles
onMounted(() => {
  state.timer = setInterval(() => {
    const color = state.colors.pop();
    if (color) {
      nextTick(() => {
        state.colors.unshift(color);
      });
    }
  }, 2000);
});
onBeforeUnmount(() => {
  clearInterval(state.timer);
});

// -- methods
const getBgColor = (colorStop: string) => {
  return `linear-gradient(to bottom, #000 10%, ${colorStop} 100%)`;
};
</script>

<template>
  <div class="page">
    <transition-group class="list" tag="ul" name="list">
      <!-- key 值不能使用下标index，否则动画无效 -->
      <div
        v-for="item in state.colors"
        :key="item.label"
        class="item"
        :style="{ background: getBgColor(item.color) }"
      >
        {{ item.label }}
      </div>
    </transition-group>
  </div>
</template>

<style lang="less">
  
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 1.5s ease;
}
  
.list {
  width: calc(120px * 4);
  margin: 50px auto;
  white-space: nowrap;
  overflow-x: hidden;
  .item {
    display: inline-block;
    width: 120px;
    line-height: 160px;
    text-align: center;
    background-color: red;
    font-size: 36px;
    color: #ffffff;
    font-family: 'Times New Roman', Times, serif;
  }
}
</style>