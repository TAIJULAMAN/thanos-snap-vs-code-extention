# ⚡ VS Thanos Snap

> *"Perfectly balanced, as all code should be."*

Bring the power of Thanos to your codebase! This VS Code extension randomly deletes 50% of "expendable" code (comments, console logs, and empty lines) with a cinematic dust effect animation.


## ✨ Features

- 🎯 **Smart Detection**: Automatically identifies expendable code across multiple languages
- 🎬 **Cinematic Animation**: Watch your code fade away with a dust effect
- ⚙️ **Highly Configurable**: Customize what gets deleted and how
- 🌍 **Multi-Language Support**: Works with JavaScript, TypeScript, Python, Java, C#, C++, Go, Rust, PHP, Ruby, and more
- 🛡️ **Safe by Default**: Confirmation dialog before deletion (can be disabled)
- 📊 **Statistics**: See exactly what was deleted

## 📦 Installation

### From VS Code Marketplace (Coming Soon)
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "VS Thanos Snap"
4. Click Install

## 🚀 Usage

1. Open any code file
2. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Type "Thanos Snap: Balance the Code"
4. Confirm the snap (if confirmation is enabled)
5. Watch the magic happen! ✨

### Keyboard Shortcut (Optional)
Add a custom keybinding in your `keybindings.json`:
```json
{
  "key": "ctrl+alt+t",
  "command": "vs-thanos-snap.snap",
  "when": "editorTextFocus"
}
```

## ⚙️ Configuration

Access settings via `File > Preferences > Settings` and search for "Thanos Snap"

### Available Settings

#### `thanosSnap.confirmBeforeSnap`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Show confirmation dialog before snapping

#### `thanosSnap.targetPatterns`
- **Type**: `object`
- **Default**:
  ```json
  {
    "comments": true,
    "consoleLogs": true,
    "emptyLines": true
  }
  ```
- **Description**: Configure which types of code to target

#### `thanosSnap.animationDuration`
- **Type**: `number`
- **Default**: `1500`
- **Range**: `0-5000` (milliseconds)
- **Description**: Duration of the dust effect animation

### Example Configuration

```json
{
  "thanosSnap.confirmBeforeSnap": false,
  "thanosSnap.targetPatterns": {
    "comments": true,
    "consoleLogs": true,
    "emptyLines": false
  },
  "thanosSnap.animationDuration": 2000
}
```

## 🎯 What Gets Deleted?

### Comments
- JavaScript/TypeScript: `//`, `/*`, `*/`
- Python: `#`
- Java/C#/C++: `//`, `/*`, `*/`
- Ruby: `#`
- And more!

### Console Logs
- JavaScript/TypeScript: `console.log()`, `console.warn()`, etc.
- Python: `print()`, `logging.*`
- Java: `System.out.print*`, `logger.*`
- C#: `Console.Write*`, `Debug.Write*`
- And more!

### Empty Lines
Any line with only whitespace

## 📝 Examples

### Before Snap
```javascript
// This is a comment
function calculateTotal(items) {
  console.log('Calculating total...');
  
  let total = 0;
  // Loop through items
  for (const item of items) {
    console.log('Processing:', item);
    total += item.price;
  }
  
  console.log('Total:', total);
  return total;
}
```

### After Snap (Example Result)
```javascript
function calculateTotal(items) {
  console.log('Calculating total...');
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  return total;
}
```

*Note: Results are random - approximately 50% of expendable lines are deleted*

## 🌍 Supported Languages

- JavaScript / TypeScript
- Python
- Java
- C# / C / C++
- Go
- Rust
- PHP
- Ruby
- And more coming soon!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This extension **permanently deletes code**. While VS Code's undo feature (`Ctrl+Z` / `Cmd+Z`) will restore deleted lines, please use with caution. Always commit your work before snapping!

## 🙏 Acknowledgments

- Inspired by Thanos from the Marvel Cinematic Universe
- Built with ❤️ using the VS Code Extension API



**Remember**: With great power comes great responsibility. Snap wisely! ⚡
