import { test, expect } from '@playwright/test';
import { login } from '../../utils/auth';

test.describe('feature : Logout après une connexion réussie', () => {

  test('@auth @logout déconnexion réussie', async ({ page }) => {

    // Login : Connexion réussie
    await login(page);

    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText('Products')).toBeVisible();

    // Logout : déconnexion réussie
    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
    await page.locator('#react-burger-menu-btn').click();

    // Preuve : le lien logout est bien présent dans le menu
    const logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    await expect(logoutLink).toBeVisible();

    await logoutLink.click();

    // Preuves métier : retour page login + bouton login visible
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });

});
