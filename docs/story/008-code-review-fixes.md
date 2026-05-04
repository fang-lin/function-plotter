# Story-008: Code review fixes

- **Status:** done
- **Epic:** [Epic-001](../epic/001-modernize-stack.md)
- **Created:** 2026-05-04

## Description

Deep code review of the entire codebase, fixing all identified issues across critical, high, medium, and low severity categories.

## Acceptance Criteria

- [x] Unhandled promise in clipboard API (EquationItem)
- [x] Worker event listener memory leak (workerPool)
- [x] Unhandled async error in StageEquations (setRedrawing stuck)
- [x] Array bounds check in createMapping loop
- [x] setTimeout cleanup in Dialog, EquationDialog, Redrawing
- [x] .map() replaced with .forEach() for side effects
- [x] PreloadImages alt attributes for accessibility
- [x] Sort optimization in StageCursor (O(n log n) → O(n))
- [x] All existing tests still pass
