# Change Log

All notable changes to the "vs-thanos-snap" extension will be documented in this file.

## [0.0.1] - 2026-01-28

### Added
- Initial release of VS Thanos Snap
- Smart detection of expendable code (comments, console logs, empty lines)
- Multi-language support (JavaScript, TypeScript, Python, Java, C#, C++, Go, Rust, PHP, Ruby)
- Cinematic dust effect animation
- Configurable settings:
  - Confirmation dialog toggle
  - Target pattern customization
  - Animation duration control
- Statistics display after snap
- Command: "Thanos Snap: Balance the Code"

### Features
- Randomly deletes 50% of detected expendable lines
- Language-aware comment and log detection
- Safe by default with confirmation dialog
- Undo support via VS Code's native undo functionality