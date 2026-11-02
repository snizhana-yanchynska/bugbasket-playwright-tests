import { test, expect } from '@playwright/test';
/*import — команда імпорту, тобто підключення потрібних інструментів.

test — функція, за допомогою якої ми створюємо тест-кейси.

expect — функція для перевірки очікуваного результату (assertion).

@playwright/test — бібліотека Playwright, з якої ми беремо ці інструменти.*/

test('user can log in with a demo account', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('student1@bugbasket.test');
    await page.getByLabel('Password').fill('Student123');
    await page.getByRole('button', { name: 'Log in' }).click();
  
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
    await expect(page).toHaveURL('/');
  });
  
  test('unknown user sees a generic error', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('nobody@bugbasket.test');
    await page.getByLabel('Password').fill('WrongPassword1');
    await page.getByRole('button', { name: 'Log in' }).click();
  
    await expect(page.getByTestId('login-error')).toHaveText('Invalid email or password');
  });