import * as vscode from 'vscode';
import { LineDetector } from './detectors/lineDetector';
import { DustEffect } from './effects/dustEffect';
import { ConfigManager } from './utils/config';
import { SnapStatistics, SnapResult } from './types';

export function activate(context: vscode.ExtensionContext) {
	console.log('VS Thanos Snap extension is now active!');

	const disposable = vscode.commands.registerCommand('vs-thanos-snap.snap', async () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage("Thanos cannot snap nothingness. Please open a file first.");
			return;
		}

		// Load configuration
		const configManager = new ConfigManager();

		// Show confirmation dialog if enabled
		if (configManager.confirmBeforeSnap) {
			const answer = await vscode.window.showWarningMessage(
				'Are you ready to balance your code? This will delete ~50% of comments, logs, and empty lines.',
				{ modal: true },
				'Snap',
				'Cancel'
			);

			if (answer !== 'Snap') {
				vscode.window.showInformationMessage('The snap has been avoided... for now.');
				return;
			}
		}

		// Execute the snap
		const result = await performSnap(editor, configManager);

		if (result.success) {
			const stats = result.statistics;
			vscode.window.showInformationMessage(
				`⚡ Thanos is inevitable... Deleted ${stats.linesDeleted} of ${stats.targetsFound} expendable lines (${stats.deletionRate}% of file).`
			);
		} else {
			vscode.window.showErrorMessage(`Snap failed: ${result.error}`);
		}
	});

	context.subscriptions.push(disposable);
}

async function performSnap(editor: vscode.TextEditor, configManager: ConfigManager): Promise<SnapResult> {
	try {
		const document = editor.document;
		const totalLines = document.lineCount;

		// Detect expendable lines
		const detector = new LineDetector(configManager.targetPatterns);
		const targets = detector.detectExpendableLines(document, document.languageId);

		if (targets.length === 0) {
			return {
				success: false,
				statistics: {
					totalLines,
					targetsFound: 0,
					linesDeleted: 0,
					deletionRate: 0
				},
				error: 'Your code is already perfectly balanced. No expendable lines found.'
			};
		}

		// Randomly select 50% of targets
		const shuffled = targets.sort(() => 0.5 - Math.random());
		const linesToDelete = shuffled.slice(0, Math.floor(targets.length / 2));

		// Apply dust effect animation
		const dustEffect = new DustEffect(configManager.animationDuration);
		await dustEffect.apply(editor, linesToDelete);

		// Delete the selected lines
		await editor.edit(editBuilder => {
			// Sort descending so deleting lines doesn't shift indices
			linesToDelete.sort((a, b) => b - a).forEach(lineIndex => {
				const line = document.lineAt(lineIndex);
				editBuilder.delete(line.rangeIncludingLineBreak);
			});
		});

		// Calculate statistics
		const deletionRate = Math.round((linesToDelete.length / totalLines) * 100);

		return {
			success: true,
			statistics: {
				totalLines,
				targetsFound: targets.length,
				linesDeleted: linesToDelete.length,
				deletionRate
			}
		};
	} catch (error) {
		return {
			success: false,
			statistics: {
				totalLines: 0,
				targetsFound: 0,
				linesDeleted: 0,
				deletionRate: 0
			},
			error: error instanceof Error ? error.message : 'Unknown error occurred'
		};
	}
}

export function deactivate() { }

