# Story-003: Upgrade React Router 5 → 7

- **Status:** done
- **Epic:** [Epic-001](../epic/001-modernize-stack.md)
- **Created:** 2026-05-04

## Description

将 React Router 从 v5 升级到 v6。项目路由简单（仅 Home 和 Plotter 两个页面），改动量小。

## Acceptance Criteria

- [x] react-router-dom 升级到 v6
- [x] `<Switch>` 替换为 `<Routes>`
- [x] `<Route component={X}>` 替换为 `<Route element={<X/>}>`
- [x] 路由导航正常工作（useNavigate + useParams）
- [x] 删除 `@types/react-router-dom`（v6 自带类型）
- [x] 删除 `history` 包（v6 内置）
- [x] `Redirect` 替换为 `Navigate`

## Notes

- 项目只有两个路由: `/` (Home) 和 `/bindbindplotter` (Plotter)
- 改动非常小，可以和 Story-002 一起做
