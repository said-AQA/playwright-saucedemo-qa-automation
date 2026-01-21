import { expect, type Page } from '@playwright/test';

export async function login(page: Page, username = 'standard_user', password = 'secret_sauce') {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();

  // preuve que je suis loggé
  await expect(page).toHaveURL(/inventory\.html/i);
  await expect(page.getByText('Products')).toBeVisible();
  await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
}
