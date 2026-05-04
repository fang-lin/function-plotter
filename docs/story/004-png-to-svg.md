# Story-004: Replace PNG icons with SVG

- **Status:** blocked
- **Epic:** [Epic-001](../epic/001-modernize-stack.md)
- **Created:** 2026-05-04

## Description

将 `src/images/` 下的 50+ PNG 图标替换为 SVG，减小 bundle 体积，支持任意缩放，简化资源管理。

## Acceptance Criteria

- [ ] 所有 UI 图标替换为内联 SVG 或 SVG 组件
- [ ] 删除不再使用的 PNG 文件
- [ ] PreloadImages 组件移除或重构（SVG 不需要预加载）
- [ ] 图标在 1x/2x/3x 屏幕下清晰显示
- [ ] Bundle 体积减小

## Notes

- **Blocked reason**: 这些 PNG 是手绘风格的艺术图标（每个 10-50KB），不是标准 UI 图标。转 SVG 需要设计师重新绘制，不适合自动化完成。
- 未来可考虑请设计师提供 SVG 版本
- PreloadImages 组件暂时保留（PNG 需要预加载）
