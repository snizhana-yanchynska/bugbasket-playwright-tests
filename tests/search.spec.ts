import { test, expect } from '@playwright/test';

/*
REQ-CAT-03	
Search: 2–50 chars, trimmed, case-insensitive, matches name and description. 
Fewer than 2 chars shows a hint; no results shows an empty state.*/

test('header search finds the desk lamp', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('header-search-input').fill('lamp');
    await page.getByTestId('header-search-btn').click();

    await expect(page).toHaveURL('/products?q=lamp');
    await expect(page.getByTestId('catalog-result-count')).toHaveText('1 product');
    await expect(page.getByTestId('product-card')).toHaveCount(1);
    await expect(page.getByTestId('product-card-name')).toHaveText('Aurora Desk Lamp');
  });
  
  test('no matches shows the empty state', async ({ page }) => {
    await page.goto('/products?q=zzzzqqq');

    await expect(page).toHaveURL('/products?q=zzzzqqq');
    await expect(page.getByTestId('catalog-result-count')).toHaveText('0 products');
    await expect(page.getByTestId('catalog-empty-state')).toBeVisible();
    await expect(page.getByText('No products found')).toBeVisible();
  });
