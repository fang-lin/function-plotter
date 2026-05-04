# Story-006: Deploy to Vercel and remove AWS infra

- **Status:** in-progress
- **Epic:** [Epic-001](../epic/001-modernize-stack.md)
- **Created:** 2026-05-04

## Description

将 function-plotter 部署到 Vercel，配置 `plotter.fanglin.me` 自定义域名，并移除项目中的 AWS 基础设施代码（Terraform、S3 部署脚本）。

## Acceptance Criteria

- [ ] Vercel 项目创建并连接 GitHub repo
- [ ] `plotter.fanglin.me` 在 Vercel 上正常解析
- [ ] HTTPS 正常工作
- [ ] GitHub Actions workflow 简化为仅跑 lint + test
- [ ] 删除 `terraform/` 目录
- [ ] 删除 Dockerfile（Vercel 不需要）
- [ ] 删除 `error/` 目录（Vercel 有自带错误页面）
- [ ] 更新 package.json 移除 AWS 相关脚本

## Notes

- 依赖 www.fanglin.me 项目完成 DNS 迁移后才能配置自定义域名
- Vercel 自动检测 Vite 项目并配置构建
- 可先用 Vercel 默认域名验证部署正常，再绑定自定义域名
- 参考 www.fanglin.me 的 CI/CD workflow 配置
