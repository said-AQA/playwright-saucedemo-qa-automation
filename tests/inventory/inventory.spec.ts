import { test, expect } from '@playwright/test';
import { login } from '../../utils/auth';

test.describe('Feature: Inventory - SauceDemo', () => {

  test('@inventory @products afficher la liste des produits', async ({ page }) => {

    //je me connecte avec un compte valide
    await login(page);

    // je suis sur la page Inventory
    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText(/products/i)).toBeVisible();

    // la liste des produits est visible
    const inventoryList = page.locator('[data-test="inventory-list"]');
    await expect(inventoryList).toBeVisible();

    // il y a au moins 1 produit affiché
    const items = page.locator('[data-test="inventory-item"]');
    await expect(items).toHaveCount(6);

    // preuve métier sur un item (nom + prix + bouton d'action)
    const firstItem = items.first();
    await expect(firstItem.locator('[data-test="inventory-item-name"]')).toBeVisible();
    await expect(firstItem.locator('[data-test="inventory-item-price"]')).toBeVisible();

    // bouton action : Add to cart OU Remove (selon état)
    const actionButton = firstItem.locator('button');
    await expect(actionButton).toBeVisible();
  });

});
