export interface DetectionConfig {
  comments: boolean;
  consoleLogs: boolean;
  emptyLines: boolean;
  customPatterns?: RegExp[];
}

export interface DetectionConfig {
  comments: boolean;
  consoleLogs: boolean;
  emptyLines: boolean;
  customPatterns?: RegExp[];
}

export class LineDetector {
  private static readonly COMMENT_PATTERNS: Record<string, RegExp[]> = {
    javascript: [/^\s*\/\//, /^\s*\/\*/, /^\s*\*/],
    typescript: [/^\s*\/\//, /^\s*\/\*/, /^\s*\*/],
    javascriptreact: [/^\s*\/\//, /^\s*\/\*/, /^\s*\*/],
    typescriptreact: [/^\s*\/\//, /^\s*\/\*/, /^\s*\*/],
    python: [/^\s*#/],
    java: [/^\s*\/\//, /^\s*\/\*/, /^\s*\*/],
    csharp: [/^\s*\/\//, /^\s*\/\*/, /^\s*\*/],
    cpp: [/^\s*\/\//, /^\s*\/\*/, /^\s*\*/],
    c: [/^\s*\/\//, /^\s*\/\*/, /^\s*\*/],
    go: [/^\s*\/\//],
    rust: [/^\s*\/\//, /^\s*\/\*/],
    php: [/^\s*\/\//, /^\s*\/\*/, /^\s*#/],
    ruby: [/^\s*#/],
    shellscript: [/^\s*#/],
    yaml: [/^\s*#/],
    html: [/^\s*<!--/],
    css: [/^\s*\/\*/],
    scss: [/^\s*\/\//, /^\s*\/\*/],
    sql: [/^\s*--/, /^\s*\/\*/],
    xml: [/^\s*<!--/],
  };

  private static readonly LOG_PATTERNS: Record<string, RegExp[]> = {
    javascript: [/console\.(log|warn|error|info|debug)/],
    typescript: [/console\.(log|warn|error|info|debug)/],
    javascriptreact: [/console\.(log|warn|error|info|debug)/],
    typescriptreact: [/console\.(log|warn|error|info|debug)/],
    python: [/print\(/, /logging\./],
    java: [/System\.out\.print/, /logger\./],
    csharp: [/Console\.Write/, /Debug\.Write/, /Trace\.Write/],
    cpp: [/std::cout/, /printf\(/],
    c: [/printf\(/],
    go: [/fmt\.Print/, /log\./],
    rust: [/println!/, /print!/],
    php: [/echo\s/, /print\(/, /var_dump\(/],
    ruby: [/puts\s/, /print\s/, /p\s/],
    shellscript: [/echo\s/, /printf\s/],
  };

  constructor(private config: DetectionConfig) { }

  detectExpendableLines(document: any, languageId: string): number[] {
    const targets: number[] = [];

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const text = line.text;

      if (this.isExpendable(text, languageId)) {
        targets.push(i);
      }
    }

    return targets;
  }

  private isExpendable(text: string, languageId: string): boolean {
    const trimmed = text.trim();

    if (this.config.emptyLines && trimmed === '') {
      return true;
    }

    // Check if it's a comment
    if (this.config.comments) {
      const patterns = LineDetector.COMMENT_PATTERNS[languageId] || LineDetector.COMMENT_PATTERNS['javascript'];
      if (this.matchesAny(text, patterns)) {
        return true;
      }
    }

    // Check if it's a console log
    if (this.config.consoleLogs) {
      const patterns = LineDetector.LOG_PATTERNS[languageId] || [];
      if (this.matchesAny(text, patterns)) {
        return true;
      }
    }

    if (this.config.customPatterns && this.matchesAny(text, this.config.customPatterns)) {
      return true;
    }

    return false;
  }

  private matchesAny(text: string, patterns: RegExp[]): boolean {
    return patterns.some(pattern => pattern.test(text));
  }
}
