import { test, expect } from '@playwright/test';


test.describe('Navigate to viewSystemUsers page', async () => {
    test.use({ storageState: 'auth/user.json' });
    test('After login, navigate to viewSystemUsers page and validate URL', async ({ page }) => {
        const viewSystemUsersUrl = process.env.BASE_URL + '/admin/viewSystemUsers';
        await page.goto(viewSystemUsersUrl);
        await expect(page).toHaveURL(viewSystemUsersUrl);
        await page.close();
    });

    test('Navigate to PIM page and validate URL', async ({ page }) => {
        const pimUrl = process.env.BASE_URL + '/pim/viewEmployeeList';
        await page.goto(pimUrl);
        await expect(page).toHaveURL(pimUrl);
        await page.close();
    });

    test('Navigate to Leave page and validate URL', async ({ page }) => {
        const leaveUrl = process.env.BASE_URL + '/leave/viewLeaveList';
        await page.goto(leaveUrl);
        await expect(page).toHaveURL(leaveUrl);
        await page.close();
    });
});