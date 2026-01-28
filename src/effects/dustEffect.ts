import * as vscode from 'vscode';

export class DustEffect {
    private decorationType: vscode.TextEditorDecorationType;

    constructor(private duration: number = 1500) {
        this.decorationType = vscode.window.createTextEditorDecorationType({
            opacity: '0.0',
            textDecoration: 'none; filter: blur(2px); transition: all 1.5s ease-out;'
        });
    }

    async apply(editor: vscode.TextEditor, lineIndices: number[]): Promise<void> {
        const ranges = lineIndices.map(i => editor.document.lineAt(i).range);

        // Apply fade-out effect
        editor.setDecorations(this.decorationType, ranges);

        // Wait for animation to complete
        await this.delay(this.duration);

        // Clean up
        this.decorationType.dispose();
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
