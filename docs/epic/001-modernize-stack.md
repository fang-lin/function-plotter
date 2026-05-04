# Epic-001: Modernize Tech Stack

- **Status:** in-progress
- **Created:** 2026-05-04

## Goal

将 function-plotter 从 2020 年代的技术栈升级到现代标准，提升开发体验、构建性能和运行时性能，同时为后续迁移到 Vercel 部署做好准备。

## Background

项目始于 2018 年，核心依赖已严重过时：React 16 (EOL)、Webpack 4、TypeScript 4.5、React Router 5。开发体验差（HMR 慢、需要 OpenSSL legacy hack），且无法利用现代 React 特性（hooks、concurrent rendering）。

## Scope

### In Scope
- 构建工具迁移 (Webpack 4 → Vite)
- React 升级 (16 → 18)
- React Router 升级 (5 → 7)
- TypeScript 升级 (4.5 → 5.x)
- Class components → Function components + Hooks
- 图片资源优化 (PNG → SVG)
- 补充核心单元测试
- 部署迁移 (AWS → Vercel)

### Out of Scope
- 功能性变更（不改变用户可见的行为）
- UI/UX 重设计
- 新增数学功能

## Stories

| # | Story | Status |
|---|-------|--------|
| 001 | [Migrate build tool from Webpack to Vite](../story/001-migrate-to-vite.md) | done |
| 002 | [Upgrade React 16 → 18 and adopt hooks](../story/002-upgrade-react.md) | done |
| 003 | [Upgrade React Router 5 → 7](../story/003-upgrade-react-router.md) | done |
| 004 | [Replace PNG icons with SVG](../story/004-png-to-svg.md) | blocked |
| 005 | [Add unit tests for core calculation services](../story/005-add-unit-tests.md) | done |
| 006 | [Deploy to Vercel and remove AWS infra](../story/006-deploy-to-vercel.md) | in-progress |

## Risks & Dependencies

- React 18 升级可能影响 Web Worker 通信逻辑
- Vite 对 Web Worker 的处理方式与 Webpack worker-plugin 不同，需要调整
- Story 001 (Vite) 应先于其他 Story 完成，后续开发都基于新构建工具
- Story 002 (React 升级) 包含 hooks 改造，是最大的改动

## Decisions

- [ADR-001: Migrate from Webpack to Vite](../adr/001-migrate-to-vite.md)
