import { Page, expect, test, Locator } from '@playwright/test';

export class VisualHelper {
    constructor(private page: Page) { }

    /**
     * Check full page snapshot
     * @param snapshotName Snapshot name
     * @param maxDiffPixelsRatio Max difference pixel ratio
     * @param waitTime Time to wait before taking the screenshot
     * @param fullPage Whether to take a full page screenshot
     * @param locator Locator of the element to screenshot
     */
    async checkPageSnapshot(snapshotName: string, waitTime = 0, maxDiffPixelsRatio = 0.1, fullPage = true, locator?: Locator) {
        const stepDescription = 'Compare snapshot: ' + snapshotName + ' with maxDiffPixelsRatio: ' + maxDiffPixelsRatio;
        // eslint-disable-next-line playwright/valid-title
        await test.step(stepDescription, async () => {
            // Wait before taking the screenshot
            await new Promise(resolve => setTimeout(resolve, waitTime));

            // eslint-disable-next-line playwright/no-conditional-in-test
            if (locator) {
                // Take a screenshot of the element
                // eslint-disable-next-line playwright/no-conditional-expect
                await expect(locator, stepDescription).toHaveScreenshot(snapshotName,
                    {
                        maxDiffPixelRatio: maxDiffPixelsRatio,
                        animations: 'disabled'
                    });
            } else {
                // Take a screenshot of the full page or the visible area
                // eslint-disable-next-line playwright/no-conditional-expect
                await expect(this.page, stepDescription).toHaveScreenshot(snapshotName,
                    {
                        maxDiffPixelRatio: maxDiffPixelsRatio,
                        fullPage: fullPage,
                        animations: 'disabled',
                    });
            }
        });
    }
}