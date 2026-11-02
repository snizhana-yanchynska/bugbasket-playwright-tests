import { test, expect } from '@playwright/test';

/* REQ-CART-01	Add to cart from the list or the product page.*/

test('guest can add a product to the cart', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Add Clean Code Handbook to cart' })).toBeVisible();

    await page.getByRole('button', { name: 'Add Clean Code Handbook to cart' }).click();

    //await expect(page.getByTestId("toast-success")).toBeVisible();
    await expect(page.getByTestId("toast-success")).toHaveText('Clean Code Handbook added to cart');
    await expect(page.getByRole('link', { name: 'Cart, 1 item' })).toBeVisible();

    await page.getByRole('link', { name: 'Cart, 1 item' }).click();

    await expect(page).toHaveURL('/cart');
    //await expect(page.getByTestId("cart-line-name")).toBeVisible();
    await expect(page.getByTestId("cart-line-name")).toHaveText('Clean Code Handbook');
    await expect(page.getByTestId("cart-subtotal")).toHaveText('₴899.00');
  });



test.describe('Cart quantity updates', () => {
  /*To avoid repeating the steps for adding a product to the cart,
   I moved this logic into a beforeEach block for all subsequent tests.*/
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Add Clean Code Handbook to cart' })).toBeVisible();

    await page.getByRole('button', { name: 'Add Clean Code Handbook to cart' }).click();
    await page.getByRole('link', { name: 'Cart, 1 item' }).click();


  });

   /* REQ-CART-02	Line quantity 1–10*/
   test('guest can change the product quantity in the cart', async ({ page }) => {
    
    await expect(page).toHaveURL('/cart');
    await expect(page.getByTestId('cart-line-qty-select')).toHaveValue('1');

    await page.getByTestId("cart-line-qty-select").selectOption('2');

    await expect(page.getByTestId('cart-line-qty-select')).toHaveValue('2');
    await expect(page.getByTestId("cart-total")).toHaveText("₴1,798.00");

    await page.getByTestId("cart-line-qty-select").selectOption('10');

    await expect(page.getByTestId('cart-line-qty-select')).toHaveValue('10');
    await expect(page.getByTestId("cart-total")).toHaveText("₴8,990.00");
  });
  
  /* REQ-CART-02 Remove a line;*/
  test('guest can remove product from cart', async ({ page }) => {
    await expect(page).toHaveURL('/cart');
    await expect(page.getByTestId('cart-line')).toBeVisible();

    await page.getByRole('button',{name: 'Remove'}).click();

    await expect(page.getByTestId('cart-empty-state')).toBeVisible();
    await expect(page.getByText('Your cart is empty')).toBeVisible();

  

  }); 
});
