# Nexus AI portfolio experience

Production: https://nexus.prescoddigital.com

This repository contains the compiled static application. The original React source was not present in the repository at the time of this repair.

## September 2026 changes

- Workflow chapter now appears immediately after the hero, before the redesigned editorial benefits section.
- The welcome-sequence viewport scrolls horizontally with swipe, keyboard, arrow controls, and optional execution following. Both final action nodes are reachable.
- Duplicate workflow/features IDs removed.
- Feature section uses a quieter cyan and ink palette, three readable feature panels, and demo-specific copy rather than unverified outcome metrics.
- Visible copy cleanup is text-only; technical identifiers and URLs are untouched.

The Run interaction is a visual demonstration. No outreach messages are sent. Other figures and service actions in this portfolio experience may be sample data or simulated.

## September 26 performance repair

The hero grid now precomputes neighboring connections instead of comparing every point against every other point on every frame. It batches canvas paths, caps updates near 30 fps, suspends offscreen and hidden-tab animation, observes reduced motion and avoids invalid coordinates when the pointer lands on a grid point. A static grid appears immediately while JavaScript loads. The visual style is retained; device-specific performance has not yet been measured.

The hero Demo button scrolls directly to the interactive workflow builder. The original compiled bundle is retained for rollback. JavaScript syntax and the actual grid function lifecycle were regression tested before publication.
