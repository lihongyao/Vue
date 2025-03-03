import type { UserConfig, ConfigEnv } from 'vite';
import { defineConfig } from 'vite'
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  void mode;
  // -- 获取当前工作目录路径
  const root = process.cwd();
  const pathResolve = (path: string) => resolve(root, '.', path);

  return {
    resolve: {
      alias: {
        "@": pathResolve('src'),
      },
    },
    plugins: [vue(), tailwindcss(),],
  };
});