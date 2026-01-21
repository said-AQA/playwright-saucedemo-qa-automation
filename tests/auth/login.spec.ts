import { test, expect } from '@playwright/test';
import { login } from '../../utils/auth';

test.describe('feature : Authentification SauceDemo', () => {

  test('@auth @login connexion avec identifiants valides', async ({ page }) => {

    // Scenario : connexion avec identifiants valides
    await login(page);

    // Preuves métier : je suis bien sur l'inventory
    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('@auth @negative @invalid connexion refusée avec identifiants invalides', async ({ page }) => {

    // Scenario : Connexion avec identifiants invalides
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('invalideUsername');
    await page.locator('[data-test="password"]').fill('InvalidePassword');

    await page.locator('[data-test="login-button"]').click();

    // Preuve : je reste sur la page login (pas d'accès inventory)
    await expect(page).toHaveURL(/\/$/);
    await expect(page).not.toHaveURL(/inventory\.html/i);

    const error1 = page.locator('[data-test="error"]');
    await expect(error1).toBeVisible();
    await expect(error1).toContainText(/username and password/i);
  });

  test('@auth @negative @required connexion refusée si champs vides', async ({ page }) => {

    // Scenario : Connexion refusée champs vides
    await page.goto('/');
    await page.locator('[data-test="login-button"]').click();

    // Preuve : je reste sur la page login
    await expect(page).toHaveURL(/\/$/);
    await expect(page).not.toHaveURL(/inventory\.html/i);

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText(/Username is required/i);
  });

});
