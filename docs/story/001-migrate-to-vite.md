# Story-001: Migrate build tool from Webpack to Vite

- **Status:** done
- **Epic:** [Epic-001](../epic/001-modernize-stack.md)
- **Created:** 2026-05-04

## Description

将构建工具从 Webpack 4 迁移到 Vite，消除 OpenSSL legacy hack，大幅提升开发体验。这是所有后续 Story 的前置条件。

## Acceptance Criteria

- [x] `npm run dev` 使用 Vite 启动开发服务器
- [x] `npm run build` 使用 Vite 产出生产构建
- [x] Web Worker 使用 Vite 原生语法正常工作
- [x] 所有现有功能正常运行（函数绘图、参数方程、缩放、拖拽）
- [x] 删除 webpack.config.js 及所有 webpack 相关依赖
- [x] 删除 `--openssl-legacy-provider` hack
- [x] 构建产物大小不超过当前版本

## Notes

- Vite Web Worker 语法: `new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })`
- 需要将 `src/index.html` 移到项目根目录（Vite 约定）
- styled-components 需要 `vite-plugin-babel` 或改用 babel macros
- tsconfig 需要调整 `module` 和 `moduleResolution` 配置
- worker-plugin 和 worker-loader 可以移除
