import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // 输出目录保持 dist
    outDir: 'dist',
    // 清空目录
    emptyOutDir: true,
    // 库模式配置
    lib: {
      entry: 'src/components/Dialog/IEDialog.ts',
      name: 'IEDialog',
      fileName: 'iedialog',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // 外部依赖
      external: [],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {},
        // 确保 CSS 文件名与 JS 文件一致
        assetFileNames: '[name].[ext]'
      }
    }
  }
});