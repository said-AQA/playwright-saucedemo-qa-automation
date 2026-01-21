import { expect, Page } from '@playwright/test';

export async function addBikeLightToCart(page: Page) {

  // Vérifier que je suis bien sur la page Inventory
  await expect(page).toHaveURL(/inventory\.html/i);
  await expect(page.getByText('Products')).toBeVisible();

  // Vérifier que la liste des produits est affichée
  await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();

  // Identifier le produit "Sauce Labs Bike Light"
  const bikeLightItem = page
    .locator('[data-test="inventory-item"]')
    .filter({ hasText: /Sauce Labs Bike Light/i });

  await expect(bikeLightItem).toBeVisible();

  // Ajouter le produit au panier
  const addToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await expect(addToCartBtn).toBeVisible();
  await addToCartBtn.click();

  // Preuves métier : bouton Remove visible + badge = 1
  await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
}
