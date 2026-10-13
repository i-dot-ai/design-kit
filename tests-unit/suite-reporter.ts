import type { Reporter } from "vitest/node";
import type { TestCase, TestModule, TestSuite } from "vitest/node";

/**
 * Minimal reporter: prints each suite (describe) once with a pass/fail marker,
 * and only lists individual test cases when they fail. Passing variants stay
 * hidden to keep output readable; failures still show their full path + error.
 */
export class SuiteReporter implements Reporter {
    private failedSuites = new Set<string>();
    private seenSuites = new Set<string>();
    private passed = 0;
    private failed = 0;

    private suiteKey(suite: TestSuite | TestModule): string {
        const framework = suite.project?.name ? ` [${suite.project.name}]` : "";
        const name = "name" in suite ? suite.name : "";
        return `${name}${framework}`;
    }

    onTestCaseResult(testCase: TestCase): void {
        const state = testCase.result().state;
        if (state === "passed") this.passed++;
        else if (state === "failed") this.failed++;

        const parent = testCase.parent;
        // Only decorate real describe() suites (not the module root).
        const isSuite = "name" in parent && !("moduleId" in parent);
        const suiteObj = isSuite ? (parent as TestSuite) : testCase.module;
        const suiteName = this.suiteKey(suiteObj);

        if (!this.seenSuites.has(suiteName)) {
            this.seenSuites.add(suiteName);
        }

        if (state === "failed") {
            this.failedSuites.add(suiteName);
            const errors = testCase.result().errors ?? [];
            // eslint-disable-next-line no-console
            console.error(
                `  ✗ ${suiteName} > ${testCase.name}\n${errors
                    .map((e) => `      ${e?.message ?? ""}`)
                    .join("\n")}`,
            );
        }
    }

    onTestModuleEnd(testModule: TestModule): void {
        for (const suite of testModule.children.allSuites()) {
            const key = this.suiteKey(suite);
            const ok = !this.failedSuites.has(key);
            // eslint-disable-next-line no-console
            console.log(` ${ok ? "✓" : "✗"} ${key}`);
        }
    }

    onTestRunEnd(): void {
        const total = this.passed + this.failed;
        // eslint-disable-next-line no-console
        console.log(
            `\n Tests: ${this.passed} passed, ${this.failed} failed (${total})`,
        );
    }
}
