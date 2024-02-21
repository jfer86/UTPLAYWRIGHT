import { Page, chromium } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

const authFolder = 'auth';

async function globalSetup() {
    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.loginWithUser(process.env.USER_NAME ?? '', process.env.PASSWORD ?? '');

    await setStorage(page, 'user.json');
    await browser.close();
}

async function setStorage(page: Page, fileName: string) {
    const pathFileName = authFolder + '/' + fileName;
    await page.context().storageState({ path: pathFileName });
}

export default globalSetup;