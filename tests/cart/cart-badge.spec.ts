import { test, expect } from '@playwright/test';
import { login } from '../../utils/auth';

test.describe('Feature : badge panier - SauceDemo', () => {

  test('@cart @badge incrémente puis décrémente selon les actions panier', async ({ page }) => {

    // Login : utilisateur valide
    await login(page);

    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText('Products')).toBeVisible();

    // Ajouter au panier le produit "Sauce Labs Bike Light"
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();

    const bikeLightItem = page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: /Sauce Labs Bike Light/i });
    await expect(bikeLightItem).toBeVisible();

    const addBikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(addBikeLight).toBeVisible();
    await addBikeLight.click();

    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Ajouter au panier le produit "Sauce Labs Backpack"
    const backpackItem = page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: /Sauce Labs Backpack/i });
    await expect(backpackItem).toBeVisible();

    const addBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(addBackpack).toBeVisible();
    await addBackpack.click();

    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // Retirer du panier le produit "Sauce Labs Bike Light"
    const removeBikeLight = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    await expect(removeBikeLight).toBeVisible();
    await removeBikeLight.click();

    await expect(addBikeLight).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Retirer du panier le produit "Sauce Labs Backpack"
    const removeBackpack = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await expect(removeBackpack).toBeVisible();
    await removeBackpack.click();

    await expect(addBackpack).toBeVisible();

    // Preuve métier : le badge n’est plus affiché
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  });

});
