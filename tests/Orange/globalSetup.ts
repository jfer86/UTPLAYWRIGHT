import { Page, chromium } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

const authFolder = 'auth';

async function globalSetup() {
    // Primer inicio de sesión
    let browser = await chromium.launch({headless: false});
    let context = await browser.newContext();
    let page = await context.newPage();
    let loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.loginWithUser(process.env.USER_NAME ?? '', process.env.PASSWORD ?? '');
    await setStorage(page, 'user.json');
    await browser.close();

    // Segundo inicio de sesión
    browser = await chromium.launch({headless: false});
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.loginWithUser(process.env.USER_NAME_USER ?? '', process.env.PASSWORD_USER ?? '');    
    await setStorage(page, 'user2.json');
    await browser.close();
}

async function setStorage(page: Page, fileName: string) {
    const pathFileName = authFolder + '/' + fileName;
    await page.context().storageState({ path: pathFileName });
}

export default globalSetup;