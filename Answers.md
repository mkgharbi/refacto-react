# Refactorisation

## Processus et Principes Appliqués

### 1. Approche Progressive en Trois Phases

#### Phase 1 : Standardisation (La Forme)
- Mise en place de Prettier pour garantir un formatage cohérent
- Principe : établir les fondations avant les changements structurels

#### Phase 2 : Correction Technique (La Stabilité)
- Migration du point d'entrée React vers l'API React 18 avec `createRoot`
- Remplacement de l'obsolète `ReactDOM.render` utilisable dans React 17
- Principe : corriger les problèmes de compatibilité avant d'optimiser

#### Phase 3 : Refactorisation Fonctionnelle (Le Fond)
- Extraction de la logique métier
- Création de composants réutilisables
- Optimisation des performances
- Principe : améliorer l'architecture une fois les bases solides

### 2. Principes de Design Appliqués

#### Séparation des Responsabilités
- Logique métier isolée dans `domainUtils.ts`
- Composants UI découplés de la logique Redux
- Utilitaires testables indépendamment

#### Composition plutôt qu'Héritage
- Composant `Select` générique et configurable
- Réutilisation par composition dans `DomainFilter`

#### Performance Déclarative
- Remplacement de `useState` + `useEffect` par `useMemo` pour les calculs dérivés
- Principe : éviter les re-renders inutiles avec une approche déclarative

#### Test-Driven Confidence
- Tests unitaires pour chaque utilitaire et composant
- Couverture des cas limites (entrées vides, doublons, formats incorrects)

## Architecture Détaillée

### Utilitaires Métier (`domainUtils.ts`)

##### `parseDomain(input: string): Domain | null`
##### `getUniqueDomains(domains: Domain[]): DomainSummary[]`
##### `buildSelectOptions(domains: DomainSummary[]): SelectOption[]`

### Refactorisation de `DomainFilter`

#### Avant :
- Container avec `mapStateToProps` / `mapDispatchToProps`
- Éléments `<select>` natifs avec logique inline
- Calculs dans `useEffect` et stockage dans `useState`

#### Après :
- Hooks modernes Redux (`useSelector`)
- Composant `Select` réutilisable
- Calculs optimisés avec `useMemo` (memoization)
- Logique métier externalisée dans `domainUtils`

## Réutilisation 
1. Création d'un Nouveau Filtre de Domaines : Select Composant Réutilisable
2. Étendre les Utilitaires de Domaine : getUniqueDomains et buildSelectOptions réutilisées
3. Créer un Select Multi-valeurs


