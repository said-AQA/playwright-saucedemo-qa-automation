import { test, expect } from '@playwright/test';
import { login } from '../../utils/auth';

test.describe('Feature : Retirer un produit du panier', () => {

  test('@produit @panier @retirer retirer un produit depuis la page détail', async ({ page }) => {

    // Login : connexion avec un utilisateur valide
    await login(page);

    // Vérifier que je suis sur la page Inventory
    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();

    // Ouvrir la fiche produit "Sauce Labs Bike Light"
    const bikeLightItem = page.locator('[data-test="inventory-item"]').filter({ hasText: /Sauce Labs Bike Light/i });
    await expect(bikeLightItem).toBeVisible();

    // Click sur le lien du produit 
    await page.locator('[data-test="item-0-title-link"]').click();


    // Vérifier que je suis sur la page détail du produit
    await expect(page).toHaveURL(/inventory-item\.html\?id=/i);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(/Sauce Labs Bike Light/i);
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();

    // Ajouter le produit au panier
    const addToCart = page.locator('[data-test="add-to-cart"]');
    await expect(addToCart).toBeVisible();
    await addToCart.click();

    // Vérifier que le produit est ajouté : badge = 1 et bouton Remove visible
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    const removeBtn = page.locator('[data-test="remove"]');
    await expect(removeBtn).toBeVisible();

    // Retirer le produit du panier
    await removeBtn.click();

    // Vérifier que le panier est vide : le badge disparaît
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();

    // Retour à la page Inventory
    await page.locator('[data-test="back-to-products"]').click();

    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
  });

});
