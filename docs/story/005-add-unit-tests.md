# Story-005: Add unit tests for core calculation services

- **Status:** done
- **Epic:** [Epic-001](../epic/001-modernize-stack.md)
- **Created:** 2026-05-04

## Description

为核心计算逻辑添加单元测试，确保升级过程中数学计算的正确性不被破坏。重点覆盖 services/ 目录下的计算模块。

## Acceptance Criteria

- [x] 测试框架从 Jest 切换到 Vitest（与 Vite 配套）
- [x] `calculateFunctionEquation.ts` 测试覆盖
- [x] `calculateParametricEquation.ts` 测试覆盖
- [x] `Equations.ts`（方程解析与验证）测试覆盖
- [x] `coordinateTransform.ts` 测试覆盖
- [x] `codec.ts` 测试覆盖
- [ ] CI 中运行测试并阻断失败构建（待 Story-006 Vercel 部署时配置）
- [x] 核心模块覆盖率 > 80%

## Notes

- Vitest 与 Vite 共享配置，零额外配置
- Web Worker 测试可以 mock worker 或使用 vitest 的 worker 支持
- 优先测试纯函数（计算、转换、编解码），这些最容易测也最有价值
- 依赖 Story-001 (Vite) 完成后再切到 Vitest
