# Playwright SauceDemo – QA Automation Framework
## Présentation

Ce projet est un framework d’automatisation des tests UI développé avec Playwright + TypeScript, appliqué au site de démonstration SauceDemo.

L’objectif est de démontrer :

une approche QA professionnelle

des tests fiables et maintenables

une bonne structuration du projet

des preuves métier claires dans les assertions

Ce projet est conçu comme un portfolio QA Automation.

## Périmètre fonctionnel couvert

Les fonctionnalités suivantes sont automatisées :

## Authentification

Connexion avec identifiants valides

Connexion refusée (identifiants invalides)

Validation des champs requis

Déconnexion (logout)

## Inventory (Produits)

Affichage de la liste des produits

Présence des informations essentielles (nom, prix)

Navigation vers la fiche produit

## Panier

Ajout d’un produit au panier

Suppression d’un produit

Gestion du badge panier (incrément / décrément)

Vérification du contenu du panier

## Checkout

Parcours d’achat complet (E2E)

Validation des informations client

Message de confirmation de commande

Cas négatif : informations manquantes

## Tri des produits

Nom : A → Z

Nom : Z → A

Prix : du moins cher au plus cher

Prix : du plus cher au moins cher
## Vérification métier de l’ordre réel affiché

## Stack technique

Playwright Test

TypeScript

Node.js

Git / GitHub

HTML Report Playwright

Trace Viewer (debug & flakiness)

##  Project Structure

```text
├── tests
│   ├── auth
│   │   ├── login.spec.ts
│   │   └── logout.spec.ts
│   ├── cart
│   │   ├── cart-badge.spec.ts
│   │   ├── cart-management.spec.ts
│   │   └── remove-item.spec.ts
│   ├── checkout
│   │   └── checkout.spec.ts
│   ├── inventory
│   │   ├── inventory.spec.ts
│   │   ├── products.spec.ts
│   │   └── sorting.spec.ts
│
├── utils
│   ├── auth.ts
│   └── cart.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```


## Bonnes pratiques QA appliquées

✅ Sélecteurs robustes (data-test, role, text)

❌ Aucun waitForTimeout

✅ Assertions métier, pas seulement techniques

✅ Tests indépendants

✅ Helpers pour éviter la duplication (auth, cart)

✅ Tests négatifs réels

✅ Debug via trace Playwright

✅ Nommage clair des tests et tags (@auth, @cart, @checkout…)

## Installation
npm install


## Installer les navigateurs Playwright :

npx playwright install

## Exécution des tests
Tous les tests
npx playwright test

Un fichier spécifique
npx playwright test tests/checkout/checkout.spec.ts

Par tag
npx playwright test --grep @checkout

Mode headed
npx playwright test --headed

## Rapports & Debug

Rapport HTML :

npx playwright show-report


Traces automatiques activées en cas d’échec

Screenshots & vidéos disponibles dans test-results/

## Points de vigilance / limites

Site de démo → données non persistantes

Pas de backend réel (API mockées)

Objectif pédagogique & démonstratif

 Améliorations possibles

Fixtures avancées (authenticatedPage)

storageState pour optimiser le login

Génération de données dynamiques

CI GitHub Actions

Tests API complémentaires

Page Object Model (version avancée)

## Auteur

Said
QA Engineer / QA Automation
Playwright · TypeScript · Cypress · API Testing
