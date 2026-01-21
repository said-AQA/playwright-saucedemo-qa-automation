import { test, expect } from '@playwright/test';
import { login } from '../../utils/auth';

test.describe('Feature : gestion du panier - SauceDemo', () => {

  test('@cart @management afficher le panier avec les produits ajoutés', async ({ page }) => {

    // Login : utilisateur valide
    await login(page);

    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText('Products')).toBeVisible();

    // Ajouter 2 produits au panier (Bike Light + Backpack)
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();

    const addBikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(addBikeLight).toBeVisible();
    await addBikeLight.click();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

    const addBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(addBackpack).toBeVisible();
    await addBackpack.click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

    // Preuve badge = 2
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // Ouvrir le panier
    const cartLink = page.locator('[data-test="shopping-cart-link"]');
    await expect(cartLink).toBeVisible();
    await cartLink.click();

    await expect(page).toHaveURL(/cart\.html/i);
    await expect(page.getByText('Your Cart')).toBeVisible();

    // Preuves métier : les 2 produits sont bien dans le panier
    await expect(page.getByText(/sauce labs bike light/i)).toBeVisible();
    await expect(page.getByText(/sauce labs backpack/i)).toBeVisible();

    // Preuve : les boutons Remove sont présents dans le panier
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

    // Continuer les achats
    const continueShopping = page.locator('[data-test="continue-shopping"]');
    await expect(continueShopping).toBeVisible();
    await continueShopping.click();

    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText('Products')).toBeVisible();
  });

});
