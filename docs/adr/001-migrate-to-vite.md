# ADR-001: Migrate from Webpack 4 to Vite

- **Status:** accepted
- **Created:** 2026-05-04

## Context

项目使用 Webpack 4.46.0 作为构建工具，配置复杂（ts-loader、worker-plugin、多种 loader），开发服务器启动慢，且需要 `--openssl-legacy-provider` hack 才能在 Node 17+ 运行。Webpack 4 已停止维护。

## Options Considered

### Option A: Upgrade to Webpack 5

- Pros: 最小改动，配置基本兼容
- Cons: 配置仍然复杂，DX 提升有限，生态在向 Vite 迁移

### Option B: Migrate to Vite

- Pros: 极快的开发启动（ESM native），零配置 TypeScript 支持，内置 Web Worker 支持，活跃社区，Vercel 原生支持
- Cons: 需要调整 Web Worker 导入方式，移除 worker-plugin

## Decision

迁移到 Vite。开发体验的提升是决定性因素，同时 Vite 对 Web Worker 有原生支持（`new Worker(new URL(...), { type: 'module' })`），不需要额外插件。

## Consequences

- 删除 webpack.config.js 及相关 loader 依赖
- Web Worker 导入方式需改为 Vite 原生语法
- 开发启动时间从秒级降到毫秒级
- 不再需要 `--openssl-legacy-provider` hack
- HtmlWebpackPlugin → Vite 内置 HTML 处理
