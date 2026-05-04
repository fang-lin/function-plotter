# Story-007: Friendly 404 page

- **Status:** done
- **Epic:** [Epic-001](../epic/001-modernize-stack.md)
- **Created:** 2026-05-04

## Description

当用户访问无效路由时（如 `/asdsa`），显示一个友好的 404 页面而非 Vercel 默认的纯文本 "404: NOT_FOUND"。需要配置 Vercel SPA fallback 并在 React Router 中添加 404 组件。

## Acceptance Criteria

- [x] 访问无效路由返回 200 并显示自定义 404 页面
- [x] 404 页面提供返回首页的链接
- [x] 页面风格与主应用一致
- [x] 从 HashRouter 迁移到 BrowserRouter（支持真正的路由匹配）
- [x] 配置 vercel.json SPA fallback

## Notes

- Vercel 需要 `vercel.json` 配置 rewrites 把所有非静态资源请求转发到 index.html
- React Router 的 `*` 路由负责渲染 404 组件
