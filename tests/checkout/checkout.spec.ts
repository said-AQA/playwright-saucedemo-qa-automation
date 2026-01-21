import { test, expect } from '@playwright/test';
import { login } from '../../utils/auth';
import { addBikeLightToCart } from '../../utils/cart';

test.describe('Feature : Checkout - SauceDemo', () => {

  test.beforeEach(async ({ page }) => {
    await login(page);
    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('@checkout @e2e finaliser un achat avec succès', async ({ page }) => {

    // Ajouter un Produit au panier "Sauce Labs Bike Light"
    await addBikeLightToCart(page);

    // Ouvrir le panier
    const cartLink = page.locator('[data-test="shopping-cart-link"]');
    await expect(cartLink).toBeVisible();
    await cartLink.click();

    await expect(page).toHaveURL(/cart\.html/i);
    await expect(page.getByText('Your Cart')).toBeVisible();

    // Preuve métier : le produit est bien dans le panier
    await expect(page.getByText(/sauce labs bike light/i)).toBeVisible();

    // Je clique sur "Checkout"
    const checkoutBtn = page.locator('[data-test="checkout"]');
    await expect(checkoutBtn).toBeVisible();
    await checkoutBtn.click();

    await expect(page).toHaveURL(/checkout-step-one\.html/i);
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();

    // Ajouter les informations
    await expect(page.locator('[data-test="checkout-info-container"]')).toBeVisible();
    await page.locator('[data-test="firstName"]').fill('first name');
    await page.locator('[data-test="lastName"]').fill('last name');
    await page.locator('[data-test="postalCode"]').fill('75001');

    const continueBtn = page.locator('[data-test="continue"]');
    await expect(continueBtn).toBeVisible();
    await continueBtn.click();

    await expect(page).toHaveURL(/checkout-step-two\.html/i);

    // Je finalise la transaction
    await expect(page.getByText('Checkout: Overview')).toBeVisible();

    // Preuve métier : le produit est bien présent dans l'overview
    await expect(page.getByText(/sauce labs bike light/i)).toBeVisible();

    await expect(page.getByText('Payment Information')).toBeVisible();
    await expect(page.getByText('Shipping Information')).toBeVisible();
    await expect(page.getByText('Price Total')).toBeVisible();

    const finishBtn = page.locator('[data-test="finish"]');
    await expect(finishBtn).toBeVisible();
    await finishBtn.click();

    // message de confirmation et Back Home
    await expect(page).toHaveURL(/checkout-complete\.html/i);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();

    const backHome = page.locator('[data-test="back-to-products"]');
    await expect(backHome).toBeVisible();
    await backHome.click();

    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('@checkout @negative Checkout refusé avec informations manquantes', async ({ page }) => {

    // Ajouter un Produit au panier "Sauce Labs Bike Light"
    await addBikeLightToCart(page);

    // Ouvrir le panier
    const cartLink = page.locator('[data-test="shopping-cart-link"]');
    await expect(cartLink).toBeVisible();
    await cartLink.click();

    await expect(page).toHaveURL(/cart\.html/i);
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText(/sauce labs bike light/i)).toBeVisible();

    // Je clique sur "Checkout"
    const checkoutBtn = page.locator('[data-test="checkout"]');
    await expect(checkoutBtn).toBeVisible();
    await checkoutBtn.click();

    await expect(page).toHaveURL(/checkout-step-one\.html/i);
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();

    // validé avec des informations manquantes (First Name vide)
    await expect(page.locator('[data-test="checkout-info-container"]')).toBeVisible();
    await page.locator('[data-test="lastName"]').fill('last name');
    await page.locator('[data-test="postalCode"]').fill('75001');

    const continueBtn = page.locator('[data-test="continue"]');
    await expect(continueBtn).toBeVisible();
    await continueBtn.click();

    // Preuves : erreur visible + je reste sur step-one
    await expect(page).toHaveURL(/checkout-step-one\.html/i);

    const error1 = page.locator('[data-test="error"]');
    await expect(error1).toBeVisible();
    await expect(error1).toContainText(/First Name is required/i);
  });

});
