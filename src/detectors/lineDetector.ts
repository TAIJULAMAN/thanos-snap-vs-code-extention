export interface DetectionConfig {
  comments: boolean;
  consoleLogs: boolean;
  emptyLines: boolean;
  customPatterns?: RegExp[];
}

export class LineDetector {
  constructor(private config: DetectionConfig) {}

  detectExpendableLines(document: any, languageId: string): number[] {
    const targets: number[] = [];
    
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const text = line.text.trim();
      
      if (this.isExpendable(text, languageId)) {
        targets.push(i);
      }
    }
    
    return targets;
  }

  private isExpendable(text: string, languageId: string): boolean {
    // Language-aware detection
    const commentPatterns = this.getCommentPatterns(languageId);
    const logPatterns = this.getLogPatterns(languageId);
    
    if (this.config.emptyLines && text === '') return true;
    if (this.config.comments && this.matchesAny(text, commentPatterns)) return true;
    if (this.config.consoleLogs && this.matchesAny(text, logPatterns)) return true;
    if (this.config.customPatterns && this.matchesAny(text, this.config.customPatterns)) return true;
    
    return false;
  }

  private getCommentPatterns(languageId: string): RegExp[] {
    const patterns: Record<string, RegExp[]> = {
      javascript: [/^\/\//, /^\/\*/, /^\*/],
      typescript: [/^\/\//, /^\/\*/, /^\*/],
      python: [/^#/],
      java: [/^\/\//, /^\/\*/, /^\*/],
      csharp: [/^\/\//, /^\/\*/, /^\*/],
      cpp: [/^\/\//, /^\/\*/, /^\*/],
      c: [/^\/\//, /^\/\*/, /^\*/],
      go: [/^\/\//],
      rust: [/^\/\//, /^\/\*/],
      php: [/^\/\//, /^\/\*/, /^#/],
      ruby: [/^#/],
    };
    
    return patterns[languageId] || patterns.javascript;
  }

  private getLogPatterns(languageId: string): RegExp[] {
    const patterns: Record<string, RegExp[]> = {
      javascript: [/console\.(log|warn|error|info|debug)/],
      typescript: [/console\.(log|warn|error|info|debug)/],
      python: [/print\(/, /logging\./],
      java: [/System\.out\.print/, /logger\./],
      csharp: [/Console\.Write/, /Debug\.Write/, /Trace\.Write/],
      cpp: [/std::cout/, /printf\(/],
      c: [/printf\(/],
      go: [/fmt\.Print/, /log\./],
      rust: [/println!/, /print!/],
      php: [/echo\s/, /print\(/, /var_dump\(/],
      ruby: [/puts\s/, /print\s/, /p\s/],
    };
    
    return patterns[languageId] || [];
  }

  private matchesAny(text: string, patterns: RegExp[]): boolean {
    return patterns.some(pattern => pattern.test(text));
  }
}
