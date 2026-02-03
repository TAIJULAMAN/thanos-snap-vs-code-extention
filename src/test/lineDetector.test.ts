import * as assert from 'assert';
import { LineDetector, DetectionConfig } from '../detectors/lineDetector';

suite('LineDetector Test Suite', () => {
    const config: DetectionConfig = {
        comments: true,
        consoleLogs: true,
        emptyLines: true
    };

    const detector = new LineDetector(config);

    test('should detect empty lines', () => {
        const mockDoc = {
            lineCount: 3,
            lineAt: (i: number) => ({ text: i === 1 ? '' : 'code' })
        };
        const targets = detector.detectExpendableLines(mockDoc, 'javascript');
        assert.deepStrictEqual(targets, [1]);
    });

    test('should detect JavaScript/TypeScript comments', () => {
        const lines = [
            'const x = 1;',
            '// Single line comment',
            '/* Block comment start',
            ' * Middle',
            ' */',
            'x++; // Inline comment (should NOT be deleted based on current logic, only full lines)',
        ];

        // Note: The current implementation checks if the *whole line* matches the pattern after trimming.
        // So 'x++; // comment' is NOT detected as a comment line, which is correct behavior for "deleting expendable lines".

        const mockDoc = {
            lineCount: lines.length,
            lineAt: (i: number) => ({ text: lines[i] })
        };

        const targets = detector.detectExpendableLines(mockDoc, 'typescript');
        // Expected: index 1, 2, 3, 4. 
        // Index 5 contains code, so it shouldn't be deleted.
        assert.deepStrictEqual(targets, [1, 2, 3, 4]);
    });

    test('should detect Python comments', () => {
        const lines = [
            'def foo():',
            '    # This is a comment',
            '    print("bar")'
        ];
        const mockDoc = {
            lineCount: lines.length,
            lineAt: (i: number) => ({ text: lines[i] })
        };

        const targets = detector.detectExpendableLines(mockDoc, 'python');
        assert.deepStrictEqual(targets, [1]);
    });

    test('should detect console logs in JavaScript', () => {
        const lines = [
            'console.log("debug");',
            'console.error("oops");',
            'const a = console.log;', // assignments shouldn't necessarily be deleted? 
            // actually the regex /console\.(log|...)/ matches anywhere in the string
            // but the current implementation uses `matchesAny` which uses `pattern.test(text)`.
            // So YES, it will match.
        ];
        const mockDoc = {
            lineCount: lines.length,
            lineAt: (i: number) => ({ text: lines[i] })
        };

        const targets = detector.detectExpendableLines(mockDoc, 'javascript');
        assert.deepStrictEqual(targets, [0, 1, 2]);
    });

    test('should detect HTML comments', () => {
        const lines = [
            '<div>',
            '  <!-- This is a comment -->',
            '</div>'
        ];
        const mockDoc = {
            lineCount: lines.length,
            lineAt: (i: number) => ({ text: lines[i] })
        };

        const targets = detector.detectExpendableLines(mockDoc, 'html');
        assert.deepStrictEqual(targets, [1]);
    });

    test('should respect configuration', () => {
        const noCommentsConfig = { ...config, comments: false };
        const noCommentsDetector = new LineDetector(noCommentsConfig);

        const lines = [
            '// comment',
            '',
            'console.log("hi")'
        ];
        const mockDoc = {
            lineCount: lines.length,
            lineAt: (i: number) => ({ text: lines[i] })
        };

        const targets = noCommentsDetector.detectExpendableLines(mockDoc, 'javascript');
        // Should detect empty line (1) and console log (2), but not comment (0)
        assert.deepStrictEqual(targets, [1, 2]);
    });
});
