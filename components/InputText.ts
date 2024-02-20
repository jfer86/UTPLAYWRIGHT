import { Page, Locator } from '@playwright/test';

export class InputText {
    private locator: Locator;

    constructor(private page: Page, private name: string, byRole = true) {
        if (byRole)
            this.locator = this.page.getByRole('textbox', { name: name });
        else
            this.locator = this.page.locator(this.name);
    }

    async fill(value: string) {
        await this.locator.fill(value);
    }
}