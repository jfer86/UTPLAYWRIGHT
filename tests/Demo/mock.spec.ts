import { test, expect } from '@playwright/test';

test.describe('Mock simulate response', async () => {
    test('mocks a fruit and doesn\'t call api', async ({ page }) => {
        // Mock the api call before navigating
        await page.route('*/**/api/v1/fruits', async route => {
            const json = [{ name: 'fresas', id: 21 }];
            await route.fulfill({ json });
        });
        // Go to the page
        await page.goto('https://demo.playwright.dev/api-mocking');
      
        // Assert that the Strawberry fruit is visible
        await expect(page.getByText('Strawberry')).toBeVisible();
    });
});

test.describe('Mock simulate response', async () => {
    test('mocks a transaction and doesn\'t call api', async ({ page }) => {
        // simula la llamada a la API antes de hacer la petición
        await page.route('http://localhost:8080/General-APIs/v1/transactions/transUnionValidation', async (route) => {
            // Comprueba si la solicitud es una solicitud POST y si el cuerpo coincide con la solicitud esperada.
            if (route.request().method() === 'POST' && JSON.parse(route.request().postData()!)['idNumber'] === '1036604143') {
                const json = {
                    'Decision': 'Pass',
                    'DSUbicaCOLData': {
                        'IDVReasonsCode': {
                            'Reason': {
                                'Applicant': 'MUÑOZ',
                                'Code': '100',
                                'Type': 'Coincidencia',
                                'Description': 'Documento validado exitosamente. - Pass'
                            }
                        }
                    },
                    // ... Resto de la respuesta
                };
                await route.fulfill({ status: 200, body: JSON.stringify(json) });
            } else {
                // Si la solicitud no coincide, déjela proceder sin mocking
                await route.continue();
            }
        });

        // Realiza una solicitud POST a la API
        const response = await page.evaluate(async () => {
            const response = await fetch('http://localhost:8080/General-APIs/v1/transactions/transUnionValidation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idNumber: '1036604143' })
            });
            return response.status;
        });

        expect(response).toBe(200);
    });
});