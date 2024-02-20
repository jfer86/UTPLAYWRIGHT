import { Page, Locator } from '@playwright/test';

export class Button {
    private locator: Locator;

    constructor(private page: Page, private name: string, byRole = true) {
        if (byRole)
            this.locator = this.page.getByRole('button', { name: name });
        else
            this.locator = this.page.locator(this.name);
    }

    async click() {
        await this.locator.click();
    }

    async getText() {
        return await this.locator.textContent();
    }
}