import { test, expect } from '@playwright/test';
import { login } from '../../utils/auth';

test.describe('Feature : Produits - Ajouter un produit au panier', () => {

  test('@inventory @products @cart ajouter "Sauce Labs Bike Light" au panier', async ({ page }) => {

    // Login
    await login(page);

    // Preuve : je suis sur Inventory
    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText('Products')).toBeVisible();

    // Add product : ajouter un produit au panier
    const addBikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(addBikeLight).toBeVisible();
    await addBikeLight.click();

    // vérifier que le bouton est devenu Remove
    const removeBikeLight = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    await expect(removeBikeLight).toBeVisible();

    // vérifier que le badge panier affiche 1
    const badge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');

    // Vérifier que le produit a bien été ajouté au panier
    const shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    await expect(shoppingCart).toBeVisible();
    await shoppingCart.click();

    await expect(page).toHaveURL(/cart\.html/i);
    await expect(page.getByText('Your Cart')).toBeVisible();

    // Preuve métier : le bon produit est présent dans le panier
    await expect(page.locator('[data-test="item-0-title-link"]')).toHaveText(/sauce labs bike light/i);

    // Preuve métier : le bouton Remove est disponible dans le panier
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
  });

});
