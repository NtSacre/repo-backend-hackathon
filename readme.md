# 🇸🇳 HACKATHON UNIPRO 2026

# Plateforme citoyenne de prévention des inondations et des risques sanitaires

> **Contexte : Sénégal — Hackathon UNIPRO 2026 — MVP fonctionnel en 24 heures**

---

# 1. OBJECTIF DU PROJET

Construire une plateforme numérique simple et accessible permettant aux citoyens sénégalais de :

* consulter la météo ;
* connaître le niveau de risque de leur zone ;
* voir les autres zones à risque ;
* signaler très rapidement un problème ;
* recevoir des recommandations après un signalement ;
* consulter des points recommandés à proximité ;
* écouter des informations de prévention en français ou en wolof ;
* consulter l'historique de leurs signalements.

La plateforme doit également permettre aux agents municipaux de :

* consulter les signalements citoyens ;
* accepter ou rejeter un signalement ;
* traiter un signalement ;
* consulter les zones à risque ;
* visualiser les informations sur une carte ;
* consulter les statistiques principales ;
* gérer les zones et les points recommandés.

---

# 2. PRINCIPES UX À RESPECTER

## RÈGLE PRINCIPALE

L'application doit être :

> **Simple — Rapide — Terre à terre — Compréhensible — Utilisable avec peu de lecture**

Le citoyen ne doit pas avoir besoin de remplir de longs formulaires.

## Principe "2 clics"

Pour signaler :

```text
Clic 1
↓
🌊 Inondation

Clic 2
↓
✅ Confirmer le signalement
```

Le système récupère automatiquement :

* utilisateur ;
* position GPS ;
* zone ;
* date ;
* heure.

Aucune saisie supplémentaire ne doit être obligatoire.

---

# 3. ACTEURS

## CITIZEN

Fonctionnalités :

* connexion ;
* accueil ;
* météo ;
* risque de sa zone ;
* zones à risque ;
* signalement ;
* recommandations ;
* points recommandés ;
* informations audio ;
* historique.

## MUNICIPALITY_AGENT

Fonctionnalités :

* connexion ;
* dashboard ;
* carte des signalements ;
* liste des signalements ;
* détail d'un signalement ;
* accepter/rejeter ;
* changer le statut ;
* zones à risque ;
* statistiques.

## ADMIN

Toutes les fonctionnalités de l'agent municipal + :

* gestion utilisateurs ;
* gestion zones ;
* gestion points recommandés ;
* gestion guides ;
* gestion météo ;
* gestion des risques.

---

# 4. STACK TECHNIQUE

## Backend

```text
NestJS
TypeScript
TypeORM
MySQL
JWT
Passport
bcrypt
class-validator
Swagger
```

## Base de données

```text
MySQL

Database:
hackathon_unipro
```

MySQL
hackathon_unipro
```

---

# 5. STRUCTURE DU PROJET

Créer un projet monorepo :

```text
hackathon-unipro/
│
├── README.md
│
├── backend/
│   ├── src/
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── dto/
│   │   │   ├── guards/
│   │   │   └── strategies/
│   │   │
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.module.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   │
│   │   ├── zones/
│   │   │   ├── zones.controller.ts
│   │   │   ├── zones.service.ts
│   │   │   ├── zones.module.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   │
│   │   ├── reports/
│   │   │   ├── reports.controller.ts
│   │   │   ├── reports.service.ts
│   │   │   ├── reports.module.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   │
│   │   ├── risks/
│   │   │   ├── risks.controller.ts
│   │   │   ├── risks.service.ts
│   │   │   ├── risks.module.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   │
│   │   ├── weather/
│   │   │   ├── weather.controller.ts
│   │   │   ├── weather.service.ts
│   │   │   ├── weather.module.ts
│   │   │   └── entities/
│   │   │
│   │   ├── guides/
│   │   │   ├── guides.controller.ts
│   │   │   ├── guides.service.ts
│   │   │   ├── guides.module.ts
│   │   │   └── entities/
│   │   │
│   │   ├── audio-guides/
│   │   │   ├── audio-guides.controller.ts
│   │   │   ├── audio-guides.service.ts
│   │   │   ├── audio-guides.module.ts
│   │   │   └── entities/
│   │   │
│   │   ├── recommended-points/
│   │   │   ├── recommended-points.controller.ts
│   │   │   ├── recommended-points.service.ts
│   │   │   ├── recommended-points.module.ts
│   │   │   └── entities/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── dashboard.controller.ts
│   │   │   ├── dashboard.service.ts
│   │   │   └── dashboard.module.ts
│   │   │
│   │   ├── database/
│   │   │   ├── migrations/
│   │   │   └── seeds/
│   │   │
│   │   ├── common/
│   │   │   ├── decorators/
│   │   │   ├── enums/
│   │   │   ├── guards/
│   │   │   ├── filters/
│   │   │   ├── interceptors/
│   │   │   └── utils/
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── test/
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── layouts/
    │   ├── pages/
    │   ├── services/
    │   ├── hooks/
    │   ├── contexts/
    │   ├── types/
    │   ├── utils/
    │   ├── offline/
    │   ├── routes/
    │   ├── assets/
    │   ├── App.tsx
    │   └── main.tsx
    │
    ├── public/
    ├── package.json
    ├── vite.config.ts
    └── tailwind.config.js
```

---

# 6. BASE DE DONNÉES MYSQL

Créer la base :

```sql
CREATE DATABASE hackathon_unipro
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Configuration :

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=hackathon_unipro
```

---

# 7. TABLES DU MVP

Créer exactement ces 8 tables principales :

```text
users
zones
reports
risk_zones
weather_data
safety_guides
audio_guides
recommended_points
```

Ne pas créer de tables inutiles pour le MVP.

---

# 8. TABLE USERS

## Objectif

Stocker les citoyens, agents municipaux et administrateurs.

```text
users
--------------------------------
id
full_name
phone
email
password
role
zone_id
is_active
created_at
updated_at
```

## Colonnes

```text
id              UUID / CHAR(36) PRIMARY KEY
full_name       VARCHAR(150)
phone           VARCHAR(30) UNIQUE
email           VARCHAR(150) UNIQUE NULL
password        VARCHAR(255)
role            ENUM('CITIZEN','MUNICIPALITY_AGENT','ADMIN')
zone_id         FK zones.id NULL
is_active       BOOLEAN DEFAULT TRUE
created_at      DATETIME
updated_at      DATETIME
```

Le mot de passe doit être hashé avec bcrypt.

Ne jamais retourner `password` dans les réponses API.

---

# 9. TABLE ZONES

Une zone représente un quartier ou une zone géographique.

Exemples :

```text
Pikine Nord
Yeumbeul
Keur Massar
Guédiawaye
Parcelles Assainies
```

Structure :

```text
zones
--------------------------------
id
name
commune
department
region
latitude
longitude
created_at
updated_at
```

Types :

```text
id              UUID / CHAR(36)
name            VARCHAR(150)
commune         VARCHAR(150)
department      VARCHAR(150) NULL
region          VARCHAR(150) DEFAULT 'Dakar'
latitude        DECIMAL(10,7)
longitude       DECIMAL(10,7)
created_at      DATETIME
updated_at      DATETIME
```

---

# 10. TABLE REPORTS

Table centrale de l'application.

Chaque signalement citoyen est enregistré ici.

```text
reports
--------------------------------
id
user_id
zone_id
type
severity
description
latitude
longitude
photo_url
status
created_at
updated_at
```

## Type

```text
FLOOD
BLOCKED_ROAD
STAGNANT_WATER
MOSQUITO
HOUSE_RISK
HEALTH
OTHER
```

## Severity

```text
LOW
MEDIUM
HIGH
CRITICAL
```

## Status

```text
PENDING
VERIFIED
IN_PROGRESS
RESOLVED
REJECTED
```

## Règle

Lorsqu'un citoyen signale :

```text
POST /reports
```

le backend doit automatiquement :

1. identifier l'utilisateur ;
2. récupérer sa position ;
3. déterminer la zone ;
4. enregistrer le signalement ;
5. calculer les recommandations ;
6. recalculer le niveau de risque de la zone.

---

# 11. TABLE RISK_ZONES

Stocker le niveau de risque actuel d'une zone.

```text
risk_zones
--------------------------------
id
zone_id
flood_level
health_level
score
description
updated_at
```

## flood_level

```text
LOW
MEDIUM
HIGH
CRITICAL
```

## health_level

```text
LOW
MEDIUM
HIGH
CRITICAL
```

## score

Valeur de :

```text
0 → 100
```

Exemple :

```text
Pikine Nord

flood_level = HIGH
health_level = MEDIUM
score = 78
```

Relation :

```text
zones 1 ───── 1 risk_zones
```

Mettre une contrainte UNIQUE sur `zone_id`.

---

# 12. TABLE WEATHER_DATA

Stocker les données météo utilisées pour informer le citoyen.

```text
weather_data
--------------------------------
id
zone_id
temperature
rain_probability
rainfall_mm
condition
forecast_date
created_at
```

Exemple :

```text
temperature = 28.5
rain_probability = 90
rainfall_mm = 20
condition = "Rain"
```

Le frontend doit afficher :

```text
🌧️ Pluie prévue

90% de probabilité

Votre zone est actuellement classée
🔴 À RISQUE ÉLEVÉ

Prenez vos dispositions.
```

---

# 13. TABLE SAFETY_GUIDES

Contient les recommandations à afficher au citoyen.

```text
safety_guides
--------------------------------
id
title
content
icon
category
language
is_active
created_at
updated_at
```

## category

```text
FLOOD
HEALTH
MOSQUITO
MOBILITY
EMERGENCY
GENERAL
```

## language

```text
FR
WO
```

Exemples :

```text
Évitez de traverser les eaux stagnantes.

Éloignez les enfants des zones inondées.

Utilisez une moustiquaire.

Restez informé des alertes locales.
```

---

# 14. TABLE AUDIO_GUIDES

Permet d'associer un audio français ou wolof à un guide.

```text
audio_guides
--------------------------------
id
guide_id
language
audio_url
duration
created_at
```

Relation :

```text
safety_guides 1 ───── N audio_guides
```

Exemple :

```text
Guide :
"Que faire en cas d'inondation ?"

Audio FR :
/audio/flood-fr.mp3

Audio WO :
/audio/flood-wo.mp3
```

Le citoyen doit pouvoir appuyer simplement sur :

```text
🔊 Écouter
```

---

# 15. TABLE RECOMMENDED_POINTS

Contient les lieux recommandés.

Types :

```text
HEALTH_CENTER
PHARMACY
SAFE_ZONE
EMERGENCY_POINT
SHELTER
OTHER
```

Structure :

```text
recommended_points
--------------------------------
id
zone_id
name
type
description
latitude
longitude
phone
is_active
created_at
updated_at
```

Exemples :

```text
Centre de santé
Pharmacie
Point de secours
Zone refuge
```

---

# 16. RELATIONS

```text
users
   │
   └──────── zone_id ──────────┐
                               ↓
                              zones
                               │
             ┌─────────────────┼─────────────────┐
             ↓                 ↓                 ↓
       risk_zones       weather_data      recommended_points
             
users
   │
   └──────────── reports ──────→ zones

safety_guides
   │
   └──────────── audio_guides
```

Relations TypeORM :

```text
User
  ManyToOne → Zone

Zone
  OneToMany → Users
  OneToMany → Reports
  OneToOne → RiskZone
  OneToMany → WeatherData
  OneToMany → RecommendedPoints

Report
  ManyToOne → User
  ManyToOne → Zone

RiskZone
  OneToOne → Zone

SafetyGuide
  OneToMany → AudioGuide

AudioGuide
  ManyToOne → SafetyGuide
```

---

# 17. AUTHENTIFICATION

Utiliser :

```text
JWT
Passport
bcrypt
```

Endpoints :

```text
POST /auth/register
POST /auth/login
GET /auth/me
```

Réponse login :

```json
{
  "accessToken": "...",
  "user": {
    "id": "...",
    "fullName": "...",
    "role": "CITIZEN",
    "zone": {
      "id": "...",
      "name": "Pikine Nord"
    }
  }
}
```

Utiliser un `RolesGuard`.

Exemple :

```text
@Roles('MUNICIPALITY_AGENT', 'ADMIN')
```

---

# 18. API — AUTH

```text
POST /auth/register
POST /auth/login
GET /auth/me
```

---

# 19. API — CITIZEN DASHBOARD

Créer :

```text
GET /dashboard/citizen
```

Cette API doit retourner toutes les données nécessaires à l'accueil :

```json
{
  "user": {},
  "zone": {},
  "risk": {},
  "weather": {},
  "warning": {},
  "recommendedPoints": [],
  "quickActions": []
}
```

L'objectif est d'éviter plusieurs appels inutiles au chargement de l'accueil.

---

# 20. API — ZONES

```text
GET /zones
GET /zones/:id
GET /zones/:id/risk
GET /zones/:id/weather
```

Pour le citoyen :

```text
GET /zones/my-zone
```

---

# 21. API — RISQUES

```text
GET /risks
GET /risks/map
GET /risks/my-zone
GET /risks/:zoneId
PATCH /risks/:zoneId
```

`GET /risks/map` doit retourner les zones avec :

```json
[
  {
    "zoneId": "...",
    "name": "Pikine Nord",
    "latitude": 14.76,
    "longitude": -17.39,
    "floodLevel": "HIGH",
    "healthLevel": "MEDIUM",
    "score": 78
  }
]
```

---

# 22. API — SIGNALMENTS

## Citoyen

```text
POST /reports
GET /reports/me
GET /reports/:id
```

## Agent

```text
GET /reports
GET /reports/:id
PATCH /reports/:id/status
```

## Exemple POST

```json
{
  "type": "FLOOD",
  "latitude": 14.7642,
  "longitude": -17.3912,
  "severity": "HIGH"
}
```

Le `user_id` doit venir du JWT.

Le citoyen ne doit jamais pouvoir envoyer un `user_id` arbitraire.

---

# 23. API — WEATHER

```text
GET /weather/my-zone
GET /weather/:zoneId
```

Pour le MVP, les données météo peuvent être alimentées par :

1. données mockées/seedées ;
2. ou une API météo si elle est disponible et rapide à intégrer.

Ne pas bloquer le projet sur une API externe.

---

# 24. API — GUIDES

```text
GET /guides
GET /guides/:id
GET /guides/recommendations
```

Filtre :

```text
GET /guides?language=FR
GET /guides?language=WO
GET /guides?category=FLOOD
```

---

# 25. API — AUDIO

```text
GET /audio-guides
GET /audio-guides/:id
```

---

# 26. API — POINTS RECOMMANDÉS

```text
GET /recommended-points
GET /recommended-points/nearby
GET /recommended-points/:id
```

---

# 27. API — DASHBOARD MAIRIE

Créer :

```text
GET /dashboard/municipality
```

Retourner :

```json
{
  "statistics": {
    "totalReports": 120,
    "pendingReports": 14,
    "verifiedReports": 50,
    "inProgressReports": 20,
    "resolvedReports": 36,
    "highRiskZones": 4
  },
  "recentReports": [],
  "riskZones": []
}
```

---

# 28. LOGIQUE DE CALCUL DU RISQUE

Le MVP ne nécessite pas de machine learning.

Créer un moteur de scoring simple et explicable.

Exemple :

```text
Nombre de signalements
+
gravité
+
eau stagnante
+
routes bloquées
+
conditions météo
```

Calculer un score entre :

```text
0 et 100
```

Exemple :

```text
0 - 24
LOW

25 - 49
MEDIUM

50 - 74
HIGH

75 - 100
CRITICAL
```

Le score doit rester simple à expliquer au jury.

---

# 29. EXEMPLE DE CALCUL

Supposons :

```text
5 signalements inondation
3 eaux stagnantes
2 routes bloquées
90% probabilité de pluie
```

Le service `RisksService` calcule un score.

Exemple :

```text
Flood reports       +30
Stagnant water      +20
Blocked roads       +15
Rain probability    +20

TOTAL = 85

Risque = CRITICAL
```

Le score exact peut être ajusté pendant le développement.

---

# 30. LOGIQUE "QUE FAIRE MAINTENANT ?"

Après un signalement, le backend doit pouvoir retourner les recommandations associées.

Exemple :

```text
Signalement :
FLOOD
```

Retour :

```text
Évitez de traverser les eaux.

Éloignez les enfants.

Ne vous approchez pas des installations électriques.

Consultez les points sûrs à proximité.
```

Pour :

```text
STAGNANT_WATER
```

Retour :

```text
Évitez le contact avec l'eau stagnante.

Éliminez les petites retenues d'eau autour de votre habitation.

Protégez-vous des moustiques.
```

Pour :

```text
MOSQUITO
```

Retour :

```text
Utilisez une moustiquaire.

Évitez les zones fortement infestées.

Consultez un professionnel de santé en cas de problème.
```

---

# 31. FRONTEND — NOMBRE D'ÉCRANS

NE PAS créer beaucoup de pages.

## CITIZEN : 5 écrans principaux

```text
1. Accueil
2. Zones à risque
3. Signaler
4. Que faire maintenant ?
5. Mes signalements
```

Les points recommandés et les informations audio peuvent être affichés depuis l'accueil ou sous forme de bottom sheets/modals.

---

# 32. ÉCRAN CITOYEN — ACCUEIL

L'accueil doit afficher immédiatement :

```text
Bonjour 👋

📍 Pikine Nord

🔴 RISQUE ÉLEVÉ

🌧️ Pluie prévue aujourd'hui
90%

⚠️ Vous êtes dans une zone à risque.
Prenez vos dispositions.
```

Puis les gros boutons :

```text
🚨 SIGNALER

🗺️ ZONES À RISQUE

📍 POINTS RECOMMANDÉS

🔊 QUE FAIRE ?
```

Ne pas mettre beaucoup de texte.

---

# 33. ÉCRAN — ZONES À RISQUE

Carte simple.

Légende :

```text
🟢 Faible
🟠 Moyen
🔴 Élevé
⚫ Critique
```

Afficher les zones du Sénégal/Dakar disponibles dans le MVP.

Bouton :

```text
📍 VOIR MA ZONE
```

Au clic :

```text
Votre zone :

Pikine Nord

🔴 Risque élevé

Score : 78/100
```

---

# 34. ÉCRAN — SIGNALER

Écran extrêmement simple.

Titre :

```text
Que se passe-t-il ?
```

Gros boutons :

```text
🌊
INONDATION

🚧
ROUTE BLOQUÉE

💧
EAU STAGNANTE

🦟
MOUSTIQUES

🏠
MAISON EN DANGER

🏥
PROBLÈME DE SANTÉ
```

Après le premier clic :

```text
📍 Pikine Nord

Votre position a été détectée.

[ CONFIRMER LE SIGNALEMENT ]
```

Deuxième clic :

```text
✅ Signalement envoyé
```

Puis afficher immédiatement :

```text
Que faire maintenant ?

[ VOIR LES CONSIGNES ]
```

---

# 35. ÉCRAN — QUE FAIRE MAINTENANT ?

Afficher des cartes très simples :

```text
💧
Évitez les eaux stagnantes

🔊 Écouter
```

```text
👨‍👩‍👧
Éloignez les enfants des zones dangereuses

🔊 Écouter
```

```text
🦟
Protégez-vous des moustiques

🔊 Écouter
```

Permettre :

```text
🇫🇷 Français
🇸🇳 Wolof
```

---

# 36. ÉCRAN — MES SIGNALEMENTS

Liste simple :

```text
🌊 Inondation
Pikine Nord

🟠 En cours
Aujourd'hui 18:20
```

```text
🚧 Route bloquée
Yeumbeul

🟢 Résolu
Hier
```

Pas de tableau complexe côté citoyen.

---

# 37. DASHBOARD MAIRIE

Le dashboard desktop doit afficher :

```text
┌──────────────────────────────────────────┐
│ Dashboard municipal                      │
├──────────────────────────────────────────┤
│                                          │
│ 120          14          20          36  │
│ Signalements En attente  En cours   Résolus
│                                          │
├──────────────────────────────────────────┤
│                                          │
│              CARTE                       │
│                                          │
│        🔴       🟠                       │
│             🔴                           │
│    🟢                  🟠                │
│                                          │
├──────────────────────────────────────────┤
│ Signalements récents                     │
└──────────────────────────────────────────┘
```

---

# 38. SIGNALMENT CÔTÉ MAIRIE

Lorsqu'un signalement arrive :

```text
🌊 INONDATION

Pikine Nord

Il y a 5 minutes

🔴 Haute gravité

📍 Voir sur la carte
```

Boutons :

```text
[ ACCEPTER ]

[ REJETER ]
```

Après acceptation :

```text
[ METTRE EN TRAITEMENT ]
```

Puis :

```text
[ MARQUER COMME RÉSOLU ]
```

---

# 39. OFFLINE / FAIBLE CONNECTIVITÉ

Le frontend citoyen doit être une PWA.

Fonctionnalités offline minimales :

* application accessible après première visite ;
* derniers risques sauvegardés localement ;
* derniers conseils disponibles ;
* possibilité d'enregistrer un signalement localement ;
* synchronisation lorsque la connexion revient.

Utiliser :

```text
Service Worker
IndexedDB
```

ou une solution simple équivalente.

Le signalement offline doit être stocké localement :

```text
PENDING_SYNC
```

Puis envoyé automatiquement lorsque le réseau revient.

---

# 40. GÉOLOCALISATION

Utiliser :

```text
navigator.geolocation
```

Lors du signalement :

```text
latitude
longitude
```

Le backend détermine la zone associée.

Pour le MVP, si la détection géographique exacte est trop complexe, le frontend peut proposer la zone du profil comme fallback.

---

# 41. CARTE

Utiliser :

```text
Leaflet
React Leaflet
OpenStreetMap
```

Ne pas développer un système cartographique maison.

Couleurs :

```text
LOW      → vert
MEDIUM   → orange
HIGH     → rouge
CRITICAL → noir/rouge foncé
```

---

# 42. DESIGN

Le design doit être :

```text
Sénégalais
Simple
Accessible
Mobile-first
Très lisible
Pictogrammes importants
Peu de texte
Gros boutons
```

Utiliser des icônes avec :

```text
Lucide React
```

Éviter :

* animations inutiles ;
* dashboards trop complexes ;
* petites polices ;
* formulaires longs ;
* menus compliqués.

---

# 43. RESPONSIVE

Le citoyen utilise principalement :

```text
mobile
```

La mairie utilise principalement :

```text
desktop/tablette
```

L'application doit néanmoins être responsive partout.

---

# 44. SEED DATABASE

Créer automatiquement des données de démonstration sénégalaises.

## Zones

Créer au minimum :

```text
Pikine Nord
Yeumbeul
Keur Massar
Guédiawaye
Parcelles Assainies
```

## Utilisateurs

Créer :

```text
citizen@test.com
agent@test.com
admin@test.com
```

Les mots de passe doivent être documentés uniquement dans l'environnement local de développement et hashés en base.

## Signalements

Créer au minimum :

```text
5 inondations
3 routes bloquées
3 eaux stagnantes
2 problèmes sanitaires
2 maisons à risque
```

## Risques

Créer des niveaux différents :

```text
Pikine Nord      HIGH
Yeumbeul         MEDIUM
Keur Massar      CRITICAL
Guédiawaye       MEDIUM
Parcelles        LOW
```

## Météo

Créer des données réalistes de démonstration :

```text
Pikine Nord
28°C
90% pluie
20mm
Rain
```

## Guides

Créer des conseils :

```text
Inondation
Eau stagnante
Moustiques
Route bloquée
Santé
Prévention générale
```

Chaque catégorie doit avoir :

```text
Français
Wolof
```

si l'audio correspondant est disponible.

---

# 45. MIGRATIONS

NE PAS utiliser :

```typescript
synchronize: true
```

en production.

Créer de vraies migrations TypeORM.

Commandes :

```bash
npm run migration:generate
npm run migration:run
npm run migration:revert
```

Le projet doit pouvoir être installé sur une machine vierge uniquement avec :

```bash
npm install
npm run migration:run
npm run seed
npm run start:dev
```

---

# 46. ENVIRONMENT VARIABLES

Créer :

```text
.env.example
```

Contenu :

```env
NODE_ENV=development

PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=hackathon_unipro

JWT_SECRET=change_me
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:5173

UPLOAD_DIR=uploads
```

Frontend :

```env
VITE_API_URL=http://localhost:3000/api
```

---

# 47. PREFIX API

Toutes les routes doivent utiliser :

```text
/api
```

Exemple :

```text
POST /api/auth/login
GET /api/dashboard/citizen
POST /api/reports
GET /api/risks/map
```

---

# 48. SWAGGER

Activer Swagger.

URL :

```text
/api/docs
```

Documenter :

* Auth ;
* Users ;
* Zones ;
* Reports ;
* Risks ;
* Weather ;
* Guides ;
* Audio ;
* Points ;
* Dashboard.

Chaque endpoint doit avoir :

* description ;
* paramètres ;
* body ;
* réponses ;
* codes HTTP.

---

# 49. VALIDATION

Utiliser :

```text
class-validator
class-transformer
```

Activer :

```typescript
ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true
})
```

Toutes les données entrantes doivent être validées.

---

# 50. GESTION DES ERREURS

Utiliser des réponses HTTP propres.

Exemple :

```json
{
  "statusCode": 404,
  "message": "Zone introuvable",
  "error": "Not Found"
}
```

Ne jamais exposer :

* stack traces ;
* mots de passe ;
* secrets ;
* informations internes.

---

# 51. SÉCURITÉ

Obligatoire :

```text
JWT
bcrypt
RolesGuard
ValidationPipe
CORS
Helmet
```

Le citoyen ne peut modifier que ses propres signalements.

L'agent municipal peut traiter les signalements.

L'admin peut administrer les données.

---

# 52. LOGIQUE DE PERMISSIONS

```text
CITIZEN
├── lire météo
├── lire risques
├── lire guides
├── lire points
├── créer report
├── lire ses reports
└── lire dashboard citoyen

MUNICIPALITY_AGENT
├── lire reports
├── modifier status report
├── lire risques
├── modifier risques
├── lire dashboard municipal
└── lire zones

ADMIN
└── toutes les permissions
```

---

# 53. TESTS BACKEND

Créer au minimum des tests pour :

```text
AuthService
ReportsService
RisksService
DashboardService
```

Tester notamment :

```text
création utilisateur
connexion
création signalement
récupération signalements
changement statut
calcul risque
permissions
```

---

# 54. TESTS FRONTEND

Tester au minimum :

```text
connexion
affichage dashboard
création signalement
affichage risque
affichage météo
affichage recommandations
historique
```

---

# 55. SCÉNARIO DE DÉMONSTRATION DU HACKATHON

Le produit doit être conçu pour cette démonstration.

## ÉTAPE 1 — Citoyen

Connexion.

Accueil :

```text
📍 Pikine Nord

🌧️ 90% de pluie

🔴 RISQUE ÉLEVÉ

⚠️ Prenez vos dispositions.
```

---

## ÉTAPE 2 — Voir les zones

Cliquer :

```text
🗺️ Zones à risque
```

Afficher :

```text
🔴 Keur Massar
🔴 Pikine Nord
🟠 Yeumbeul
🟠 Guédiawaye
🟢 Parcelles
```

---

## ÉTAPE 3 — Signaler

Cliquer :

```text
🚨 Signaler
```

Puis :

```text
🌊 Inondation
```

Puis :

```text
✅ Confirmer
```

Le signalement est créé.

---

## ÉTAPE 4 — Recommandations

Afficher immédiatement :

```text
⚠️ Que faire maintenant ?

Évitez les eaux.

Éloignez les enfants.

Consultez les points recommandés.

🔊 Écouter en Wolof
```

---

## ÉTAPE 5 — Mairie

Changer de compte.

Le dashboard affiche :

```text
🔴 Nouveau signalement
Inondation
Pikine Nord
```

Cliquer :

```text
ACCEPTER
```

Puis :

```text
EN TRAITEMENT
```

---

## ÉTAPE 6 — Risque

Le système recalcule le score.

Exemple :

```text
Pikine Nord

Score : 78

🔴 RISQUE ÉLEVÉ
```

Le citoyen peut ensuite voir la mise à jour.

---

# 56. CE QUI EST PRIORITAIRE

## P0 — OBLIGATOIRE

```text
[ ] NestJS
[ ] MySQL
[ ] TypeORM
[ ] Auth JWT
[ ] Users
[ ] Zones
[ ] Reports
[ ] Risk zones
[ ] Weather
[ ] Dashboard citoyen
[ ] Dashboard mairie
[ ] Signalement en 2 clics
[ ] Carte
[ ] Statuts des signalements
[ ] Calcul de risque
[ ] Seed
[ ] Swagger
```

## P1 — IMPORTANT

```text
[ ] Safety guides
[ ] Audio
[ ] Français
[ ] Wolof
[ ] Points recommandés
[ ] PWA
[ ] Cache offline
```

## P2 — SEULEMENT SI LE TEMPS RESTE

```text
[ ] Synchronisation offline avancée
[ ] Notifications push
[ ] SMS
[ ] USSD
[ ] IA prédictive
[ ] Analyse historique avancée
```

NE PAS commencer par P2.

---

# 57. CE QU'IL NE FAUT PAS FAIRE

Ne pas créer :

```text
chatbot IA
réseau social
système médical complet
machine learning complexe
système météo complet
USSD complet
SMS complet
IoT complexe
20 écrans
formulaires longs
```

Le MVP doit rester simple.

---

# 58. RÈGLE IMPORTANTE POUR ANTIGRAVITY

Ne pas seulement créer les fichiers.

Le projet doit être réellement fonctionnel.

Antigravity doit :

1. initialiser le backend ;
2. installer les dépendances ;
3. configurer MySQL ;
4. créer les entités ;
5. créer les migrations ;
6. créer les seeds ;
7. créer les modules ;
8. créer les services ;
9. créer les controllers ;
10. créer les DTO ;
11. configurer JWT ;
12. configurer Swagger ;
13. créer les tests ;
14. créer le frontend ;
15. connecter frontend et backend ;
16. créer les écrans ;
17. créer la carte ;
18. créer le système de signalement ;
19. créer les recommandations ;
20. créer le dashboard mairie ;
21. tester le parcours complet.

---

# 59. CRITÈRE "DONE"

Le projet est considéré comme terminé uniquement lorsque ce scénario fonctionne réellement :

```text
Créer/seed un citoyen
        ↓
Connexion
        ↓
Accueil
        ↓
Voir météo
        ↓
Voir niveau de risque
        ↓
Voir carte des zones
        ↓
Créer un signalement
        ↓
Confirmer
        ↓
Signalement enregistré MySQL
        ↓
Recommandations affichées
        ↓
Connexion agent mairie
        ↓
Signalement visible
        ↓
Accepter
        ↓
Mettre en traitement
        ↓
Résoudre
        ↓
Retour citoyen
        ↓
Historique mis à jour
```

Aucun élément de ce parcours ne doit être simulé dans le frontend si l'API correspondante existe.

---

# 60. COMMANDES DE DÉMARRAGE

## Backend

```bash
cd backend

npm install

npm run migration:run

npm run seed

npm run start:dev
```

Backend :

```text
http://localhost:3000
```

Swagger :

```text
http://localhost:3000/api/docs
```

---

# 61. FRONTEND

```bash
cd frontend

npm install

npm run dev
```

Frontend :

```text
http://localhost:5173
```

---

# 62. MYSQL

Créer la base avant de démarrer :

```sql
CREATE DATABASE hackathon_unipro
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

---

# 63. ARCHITECTURE FINALE

```text
                         🇸🇳 SUNU JÀMM
                              │
                 ┌────────────┴────────────┐
                 │                         │
              CITOYEN                   MAIRIE
                 │                         │
                 ↓                         ↓
        React / PWA Mobile          React Dashboard
                 │                         │
                 └────────────┬────────────┘
                              │
                         REST API
                              │
                         NestJS
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
      AUTH                 REPORTS               RISKS
        │                     │                     │
      USERS                 ZONES                WEATHER
                              │
                    ┌─────────┴─────────┐
                    │                   │
                 GUIDES              POINTS
                    │
                 AUDIO
                              │
                         TypeORM
                              │
                              ↓
                     MySQL Database
                     hackathon_unipro
```

---

# 64. VISION PRODUIT

Le produit doit pouvoir être résumé en une phrase :

> **Une plateforme citoyenne simple qui permet de connaître le risque autour de soi, signaler un danger en deux clics et savoir immédiatement quoi faire.**

Le citoyen :

```text
👀 Je regarde
↓
⚠️ Je suis informé
↓
🚨 Je signale
↓
✅ Je confirme
↓
🔊 Je sais quoi faire
```

La mairie :

```text
👀 Elle reçoit
↓
📍 Elle localise
↓
✅ Elle valide
↓
🚧 Elle traite
↓
🟢 Elle résout
```

---

# 65. OBJECTIF FINAL DU MVP

Ne pas chercher à construire une plateforme nationale complète en 24 heures.

Construire un prototype fonctionnel démontrant clairement :

```text
MÉTÉO
   +
RISQUE LOCAL
   +
SIGNALMENT CITOYEN
   +
RÉPONSE MUNICIPALE
   +
CONSEILS DE PRÉVENTION
   +
ACCESSIBILITÉ
```

Le produit doit être suffisamment simple pour être compris en moins d'une minute par un citoyen et suffisamment concret pour être démontré devant le jury en cinq minutes.

---

# 66. CONSIGNE FINALE À ANTIGRAVITY

> **Construis réellement l'intégralité de ce projet conformément à ce README.**
>
> Ne te limite pas à générer des interfaces statiques.
>
> Le backend NestJS doit être connecté à MySQL `hackathon_unipro`, les migrations doivent créer toutes les tables, les seeds doivent fournir les données de démonstration sénégalaises et le frontend doit consommer les vraies API.
>
> Priorité absolue au parcours :
>
> **Connexion → météo/risque → zones à risque → signalement en 2 clics → recommandations → dashboard mairie → validation → traitement → résolution.**
>
> Toute fonctionnalité non indispensable doit être reportée après le parcours MVP.
>
> Le projet doit être exécutable localement avec les commandes indiquées dans ce README.
>
> À la fin du développement, vérifier que le parcours complet fonctionne de bout en bout avec MySQL.
>
> **Ne pas complexifier le produit. La simplicité et la rapidité d'utilisation sont des exigences fonctionnelles majeures.**

# FIN DU README
