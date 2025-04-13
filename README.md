
# Test Technique Angular

## Installation

Pour installer les dépendances du projet, utilisez la commande suivante :

    pnpm i

## Lancement de l’application

Pour démarrer l'application, exécutez la commande suivante :

    pnpm run start

## Tests

Pour lancer les tests unitaires du projet, utilisez la commande suivante :

    pnpm run test

Les tests sont configurés avec Jest pour garantir le bon fonctionnement de l'application.

## Technologies utilisées

Ce projet utilise les technologies suivantes :

- Nx pour la gestion de projets monolithiques.
- Angular 19.
- Angular Material.
- Tailwind CSS.
- Jest.
- Internationalisation avec support pour le français et l'anglais.
- Accessibilité.

## Structure du projet

Le projet se compose de :

- apps/geo-browser : L'application principale.
- libs/api : Une librairie pour la gestion des API.
- libs/features : Une librairie qui contient les composants/fonctionnalités
  spécifiques à l'application.

## To-Do List

Voici quelques éléments à améliorer ou ajouter dans le projet :

Tests plus poussés : Ajouter des tests plus approfondis pour couvrir davantage de cas d'usage.

Amélioration du thème Angular Material : Optimiser le système de thème d'Angular Material pour une meilleure personnalisation et gestion des couleurs.

Utilisation des stores Angular 19 (via signals) : Implémenter l'utilisation des nouveaux stores via les signals d'Angular 19 pour une gestion d'état plus efficace.

Rendre certaines parties des composants plus atomiques : Refactoriser certains composants pour les rendre plus atomiques, notamment en utilisant l'implémentation de ControlValueAccessor dans les formulaires Angular.

## Autres détails

Il y a encore de nombreux petits détails à améliorer dans le code, mais ces points représentent les principales priorités à traiter dans les prochaines itérations.

**A bientôt ;) !**


