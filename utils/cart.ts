import { expect, type Page } from '@playwright/test';

export async function addBikeLightToCart(page: Page) {

  // Le produit existe dans la liste
  await expect(
    page.locator('[data-test="inventory-item"]').filter({ hasText: /sauce labs bike light/i })
  ).toBeVisible();

  // Bouton "Add to cart" visible
  const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await expect(addToCartButton).toBeVisible();

  // Ajout au panier
  await addToCartButton.click();

  // Preuve métier : bouton "Remove" + badge panier = 1
  await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
}
