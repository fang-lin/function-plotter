# Story-002: Upgrade React 16 → 18 and adopt hooks

- **Status:** done
- **Epic:** [Epic-001](../epic/001-modernize-stack.md)
- **Created:** 2026-05-04

## Description

将 React 从 16.13.1 升级到 18，同时将 class components 改为 function components + hooks。这是最大的代码改动，涉及所有组件。

## Acceptance Criteria

- [x] React 和 ReactDOM 升级到 18.x
- [x] 使用 `createRoot` API 替换 `ReactDOM.render`
- [x] 所有 class components 改为 function components
- [x] 状态管理使用 useState/useReducer
- [x] 副作用使用 useEffect/useRef
- [x] Canvas 渲染逻辑使用自定义 hooks 封装
- [x] TypeScript 类型定义更新 (`@types/react` 18)
- [x] 所有功能回归通过

## Notes

- `src/pages/Plotter/index.tsx` 是主要的 class component，状态较复杂
- Canvas 相关逻辑可抽取为 `useCanvas`, `useCoordinateTransform` 等 hooks
- styled-components 5.x 兼容 React 18
- 注意 `StrictMode` 下 useEffect 会 double-invoke（开发模式）
