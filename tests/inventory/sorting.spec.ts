import { test, expect } from '@playwright/test';
import { login } from '../../utils/auth';

test.describe('Feature : Filtre / Tri produits - SauceDemo', () => {

  test.beforeEach(async ({ page }) => {
    await login(page);

    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText(/products/i)).toBeVisible();
  });

  test('@inventory @filtre Trier les produits par nom de A à Z', async ({ page }) => {

    // sélectionner le filtre "Name (A to Z)"
    const sortSelect = page.locator('[data-test="product-sort-container"]');
    await expect(sortSelect).toBeVisible();
    await sortSelect.selectOption('az');
    await expect(sortSelect).toHaveValue('az');

    // récupérer les noms affichés
    const productNames = page.locator('[data-test="inventory-item-name"]');
    const names = await productNames.allTextContents();

    // Petite sécurité (sinon un test “vide” peut passer)
    expect(names.length).toBeGreaterThan(1);

    // Normaliser (trim) pour éviter espaces invisibles
    const normalized = names.map(n => n.trim());

    // Calculer l’ordre attendu (A -> Z)
    const sorted = [...normalized].sort((a, b) => a.localeCompare(b));

    // Preuve métier : l’ordre affiché = ordre trié
    expect(normalized).toEqual(sorted);
  });

  test('@inventory @filtre Trier les produits par nom de Z à A', async ({ page }) => {

    // sélectionner le filtre "Name (Z to A)"
    const sortSelect = page.locator('[data-test="product-sort-container"]');
    await expect(sortSelect).toBeVisible();
    await sortSelect.selectOption('za');
    await expect(sortSelect).toHaveValue('za');

    // récupérer les noms affichés
    const productNames = page.locator('[data-test="inventory-item-name"]');
    const names = await productNames.allTextContents();

    // Petite sécurité (sinon un test “vide” peut passer)
    expect(names.length).toBeGreaterThan(1);

    // Normaliser (trim) pour éviter espaces invisibles
    const normalized = names.map(n => n.trim());

    // Calculer l’ordre attendu (Z -> A)
    const sorted = [...normalized].sort((a, b) => b.localeCompare(a));

    // Preuve métier : l’ordre affiché = ordre trié
    expect(normalized).toEqual(sorted);
  });

  test('@inventory @filtre Trier les produits par prix du moins cher au plus cher', async ({ page }) => {

    // sélectionner le filtre "Price (low to high)"
    const sortSelect = page.locator('[data-test="product-sort-container"]');
    await expect(sortSelect).toBeVisible();
    await sortSelect.selectOption('lohi');
    await expect(sortSelect).toHaveValue('lohi');

    // récupérer les prix affichés
    const productPrices = page.locator('[data-test="inventory-item-price"]');
    const pricesText = await productPrices.allTextContents();

    // Petite sécurité
    expect(pricesText.length).toBeGreaterThan(1);

    // "$9.99" -> 9.99
    const prices = pricesText.map(p => Number(p.replace('$', '').trim()));

    // Calculer l’ordre attendu (low -> high)
    const sorted = [...prices].sort((a, b) => a - b);

    // Preuve métier : l’ordre affiché = ordre trié
    expect(prices).toEqual(sorted);
  });

  test('@inventory @filtre Trier les produits par prix du plus cher au moins cher', async ({ page }) => {

    // sélectionner le filtre "Price (high to low)"
    const sortSelect = page.locator('[data-test="product-sort-container"]');
    await expect(sortSelect).toBeVisible();
    await sortSelect.selectOption('hilo');
    await expect(sortSelect).toHaveValue('hilo');

    // récupérer les prix affichés
    const productPrices = page.locator('[data-test="inventory-item-price"]');
    const pricesText = await productPrices.allTextContents();

    // Petite sécurité
    expect(pricesText.length).toBeGreaterThan(1);

    // "$9.99" -> 9.99
    const prices = pricesText.map(p => Number(p.replace('$', '').trim()));

    // Calculer l’ordre attendu (high -> low)
    const sorted = [...prices].sort((a, b) => b - a);

    // Preuve métier : l’ordre affiché = ordre trié
    expect(prices).toEqual(sorted);
  });

});
