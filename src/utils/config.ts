import * as vscode from 'vscode';

export class ConfigManager {
    private config: vscode.WorkspaceConfiguration;

    constructor() {
        this.config = vscode.workspace.getConfiguration('thanosSnap');
    }

    get confirmBeforeSnap(): boolean {
        return this.config.get('confirmBeforeSnap', true);
    }

    get targetPatterns(): { comments: boolean; consoleLogs: boolean; emptyLines: boolean } {
        return this.config.get('targetPatterns', {
            comments: true,
            consoleLogs: true,
            emptyLines: true
        });
    }

    get animationDuration(): number {
        return this.config.get('animationDuration', 1500);
    }

    refresh(): void {
        this.config = vscode.workspace.getConfiguration('thanosSnap');
    }
}
