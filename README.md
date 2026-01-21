# Playwright SauceDemo QA Automation

Projet portfolio de tests automatisés UI avec **Playwright + TypeScript** sur l’application **SauceDemo**.  
Objectif : démontrer une approche QA “pro” (locators stables, assertions métier, organisation par features, helpers réutilisables).

##  Stack
- Playwright Test Runner (`@playwright/test`)
- TypeScript
- Reporting Playwright (HTML report, traces)

##  Structure du projet
tests/
auth/
login.spec.ts
logout.spec.ts

inventory/
inventory.spec.ts
products.spec.ts
sorting.spec.ts

cart/
cart-badge.spec.ts
cart-management.spec.ts
remove-item.spec.ts

checkout/
checkout.spec.ts

utils/
auth.ts
cart.ts


##  Installation
```bash
npm install
npx playwright install
## Exécuter les tests
Lancer toute la suite :

npx playwright test
Lancer en headed :

npx playwright test --headed
Lancer un fichier précis :

npx playwright test tests/checkout/checkout.spec.ts
 Exécutions par tags
Exemples :

npx playwright test --grep "@auth"
npx playwright test --grep "@inventory"
npx playwright test --grep "@cart"
npx playwright test --grep "@checkout"

## Reporting & Debug
Afficher le rapport HTML :

npx playwright show-report
Bonnes pratiques de debug utilisées :

Traces Playwright (sur échec)

Assertions métier (URL, titres, présence produit, badge panier)

Locators stables (data-test, getByRole, getByText quand pertinent)

## Scénarios couverts (exemples)
Auth : login valide / login invalide / champs requis / logout

Inventory : liste produits visible, tri (A→Z, Z→A, prix low→high, high→low)

Cart : badge incrément/décrément, contenu du panier, remove item

Checkout : parcours complet + cas négatif (champs obligatoires)

## Choix QA (portfolio)
Organisation par features (auth, inventory, cart, checkout)

Helpers réutilisables (login, ajout au panier)

Assertions utiles (preuves métier) et suppression des waits artificiels (waitForTimeout)