import { test, expect } from '@playwright/test';

/*REQ-CAT-01	
40 products in 5 categories (Electronics, Books, Home, Sports, Toys)*/
test('guest can select products from "Electronics" category', async ({ page }) => {
    await page.goto('/products');

    await expect(page.getByLabel('Category')).toBeVisible();
    
    await page.getByTestId("filter-category-select").selectOption('electronics');

    await expect(page).toHaveURL('/products?category=electronics');
    await expect(page.getByTestId('filter-category-select')).toHaveValue('electronics');
    await expect(page.getByTestId('catalog-result-count')).toHaveText('8 products');
    await expect(page.getByTestId('product-card')).toHaveCount(8);
   
/*I wasn't sure how to verify that the items belong to electronics. 
I noticed that the image filenames contained the category extension, so I tracked them down using that.*/
    const products = await page.getByTestId('product-card').all();
    for (const product of products) {
        await expect(product.locator('img')).toHaveAttribute('src', /bb-ele-/);
    }

  });

  
test('guest can sort products in category "Electronics" from low to high.', async ({ page }) => {
    await page.goto('/products');

    await expect(page.getByLabel('Category')).toBeVisible();

    await page.getByTestId('filter-category-select').selectOption('electronics');

    await expect(page).toHaveURL('/products?category=electronics');
    await expect(page.getByTestId('filter-category-select')).toHaveValue('electronics');

    await page.getByTestId('sort-select').selectOption('price_asc');

    await expect(page).toHaveURL('/products?category=electronics&sort=price_asc');
    await expect(page.getByTestId('sort-select')).toHaveValue('price_asc');

    await page.waitForLoadState('networkidle');

    const products = await page.getByTestId('product-card').all();

    for (let i = 0; i < products.length - 1; i++) {
        const price1 = Number((await products[i].getByTestId('product-card-price').innerText()).replace(/[^\d.]/g, ''));

        const price2 = Number((await products[i + 1].getByTestId('product-card-price').innerText()).replace(/[^\d.]/g, ''));

        expect(price1).toBeLessThanOrEqual(price2);
    }


});

  