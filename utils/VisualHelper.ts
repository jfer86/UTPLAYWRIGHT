import { Page, expect, test, Locator } from '@playwright/test';

export class VisualHelper {
    constructor(private page: Page) { }

    /**
     * Check full page snapshot
     * @param snapshotName Nombre del snapshot
     * @param maxDiffPixelsRatio Máxima relación de píxeles de diferencia
     * @param waitTime Tiempo de espera antes de tomar la captura de pantalla
     * @param fullPage Si se debe tomar una captura de pantalla completa
     * @param locator "Localizador del elemento a capturar en la captura de pantalla
     */
    async checkPageSnapshot(snapshotName: string, waitTime = 0, maxDiffPixelsRatio = 0.1, fullPage = true, locator?: Locator) {
        const stepDescription = 'Compare snapshot: ' + snapshotName + ' with maxDiffPixelsRatio: ' + maxDiffPixelsRatio;
        // eslint-disable-next-line playwright/valid-title
        await test.step(stepDescription, async () => {
            // Esperar antes de tomar la captura de pantalla
            await new Promise(resolve => setTimeout(resolve, waitTime));

            // eslint-disable-next-line playwright/no-conditional-in-test
            if (locator) {
                // Tomar una captura de pantalla del elemento
                // eslint-disable-next-line playwright/no-conditional-expect
                await expect(locator, stepDescription).toHaveScreenshot(snapshotName,
                    {
                        maxDiffPixelRatio: maxDiffPixelsRatio,
                        animations: 'disabled'
                    });
            } else {
                // Tomar una captura de pantalla de la página completa o del área visible
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