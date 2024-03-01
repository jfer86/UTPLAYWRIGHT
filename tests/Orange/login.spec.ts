import { test, expect } from '@playwright/test';
import { VisualHelper } from '../../utils/VisualHelper';
import { LoginPage } from '../../pages/loginPage';

test.describe('Navigate to viewSystemUsers page', async () => {
    let visualHelper: VisualHelper;
    let loginPage: LoginPage;

    test.use({ storageState: 'auth/user.json' });

    test.beforeEach(async ({ page }) => {
        visualHelper = new VisualHelper(page);
        loginPage = new LoginPage(page);
    });

    test('After login, navigate to viewSystemUsers page and validate URL', async ({ page }) => {
        const viewSystemUsersUrl = process.env.BASE_URL + '/dashboard/index';
        await page.goto(viewSystemUsersUrl);
        await visualHelper.checkPageSnapshot('dashboard-snapshot.png', 5_000, 0.1, true);
        await expect(page).toHaveURL(viewSystemUsersUrl);
    });

    test('Navigate to PIM page and validate URL', async ({ page }) => {
        const pimUrl = process.env.BASE_URL + '/pim/viewEmployeeList';
        await page.goto(pimUrl);
        await visualHelper.checkPageSnapshot('table-snapshot.png', 5_000, 0.1, false, loginPage.table);
        await expect(page).toHaveURL(pimUrl);
    });

    test('Navigate to Leave page and validate URL', async ({ page }) => {
        const leaveUrl = process.env.BASE_URL + '/leave/viewLeaveList';
        await page.goto(leaveUrl);
        await visualHelper.checkPageSnapshot('leave-snapshot.png', 5_000, 0.1, true);
        await expect(page).toHaveURL(leaveUrl);
    });
});

test.describe('other user', async () => {
    let visualHelper: VisualHelper;
    
    test.beforeEach(async ({ page }) => {
        visualHelper = new VisualHelper(page);
    });
    test.use({ storageState: 'auth/user2.json' });
    test('After login, Dashboard user2', async ({ page }) => {
        const viewSystemUsersUrl = process.env.BASE_URL + '/dashboard/index';
        await page.goto(viewSystemUsersUrl);
        await visualHelper.checkPageSnapshot('dashboardrahul-snapshot.png', 5_000, 0.1, true);
        await expect(page).toHaveURL(viewSystemUsersUrl);
    });

    test('Navigate my info page and validate URL', async ({ page }) => {
        const myInfoUrl = process.env.BASE_URL + '/pim/viewPersonalDetails/empNumber/96';
        await page.goto(myInfoUrl);
        const element = page.locator('.oxd-layout-context');
        await visualHelper.checkPageSnapshot('myinfo-rahul-snapshot.png', 5_000, 0.1, false,element);
        await expect(page).toHaveURL(myInfoUrl);
    });

});
