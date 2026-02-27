# 🍽️ StarkFood — Hybrid Web2 + Web3 Restaurant App

> Commander vos plats et payer en crypto STRK ou en monnaie classique. Chaque paiement est enregistré sur **Starknet**.

## Stack

| Couche | Technologie |
|---|---|
| Smart Contract | Cairo · Scarb · Starknet |
| Backend API | Laravel 11 · MySQL |
| Frontend | Next.js 14 · Tailwind CSS · Starknet React |

---

## 📁 Structure

```
crud-scaffold/
├── packages/
│   ├── snfoundry/                  # Smart contract Cairo
│   │   ├── src/
│   │   │   └── RestaurantOrders.cairo
│   │   └── Scarb.toml
│   └── nextjs/                     # Frontend Next.js 14
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx            # Page d'accueil + MenuDisplay
│       │   └── orders/page.tsx     # Mes commandes
│       ├── components/starkfood/
│       │   ├── Navbar.tsx          # Connect wallet + dark mode
│       │   ├── MenuDisplay.tsx     # Grille de plats (API Laravel)
│       │   ├── DishCard.tsx        # Carte plat
│       │   └── OrderButton.tsx     # Paiement Starknet + classique
│       └── lib/
│           ├── api.ts              # Client Axios
│           ├── contract.ts         # ABI + adresse contrat
│           └── types.ts            # Types TypeScript
└── backend/                        # API Laravel 11
    ├── app/
    │   ├── Models/{Dish,Order}.php
    │   └── Http/Controllers/{Dish,Order}Controller.php
    ├── database/migrations/
    ├── routes/api.php
    └── config/cors.php
```

---

## 🚀 Installation

### 1. Prérequis
- PHP 8.2+ · Composer
- Node.js 20+ · npm
- MySQL 8+
- Scarb (Cairo package manager)

### 2. Backend Laravel

```bash
cd backend

# Dépendances
composer install

# Configuration
cp .env.example .env     # déjà pré-configuré, ajustez DB_PASSWORD si besoin
php artisan key:generate

# Base de données MySQL
mysql -u root -e "CREATE DATABASE starkfood;"
php artisan migrate:fresh --seed

# Démarrer le serveur (port 8000)
php artisan serve
```

### 3. Frontend Next.js

```bash
cd packages/nextjs
npm install

# Configurer l'adresse du contrat après déploiement
# Éditez .env.local : NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

npm run dev   # http://localhost:3000
```

### 4. Smart Contract Cairo

```bash
cd packages/snfoundry

# Compiler
scarb build

# Déployer (mainnet ou testnet Sepolia)
# sncast deploy ... 
# Puis copiez l'adresse dans packages/nextjs/.env.local
```

---

## 🔗 API Endpoints

| Méthode | URL | Description |
|---|---|---|
| `GET` | `/api/dishes` | Liste des plats disponibles |
| `GET` | `/api/dishes?category=main` | Filtrer par catégorie |
| `GET` | `/api/dishes/{id}` | Détail d'un plat |
| `POST` | `/api/orders` | Créer une commande |
| `GET` | `/api/orders` | Liste des commandes |
| `GET` | `/api/orders/{id}` | Détail d'une commande |

**POST `/api/orders` — Body :**
```json
{
  "dish_id": 1,
  "user_address": "0x04...",
  "tx_hash": "0xabc...",
  "amount": 24.90,
  "quantity": 1
}
```

---

## ⛓️ Smart Contract

**`RestaurantOrders.cairo`**

```
place_order(order_id: u64, amount: u256)
  → Émet OrderPlaced { customer, order_id, amount, timestamp }

get_order(order_id: u64) → OrderInfo
```

---

## 🎨 Flux de Commande

```
Client → Consulte Menu (MenuDisplay → GET /api/dishes)
       → Clique "Commander"
       → Choisit mode de paiement:

  🟣 STRK (Starknet):
     └→ useSendTransaction → place_order() sur la blockchain
        └→ tx_hash reçu → POST /api/orders { tx_hash, ... }

  💳 Classique:
     └→ POST /api/orders directement (status=pending)
```

---

## 🛠️ Variables d'environnement

### Backend (`backend/.env`)
| Variable | Valeur |
|---|---|
| `DB_DATABASE` | `starkfood` |
| `DB_USERNAME` | `root` |
| `DB_PASSWORD` | _(votre mot de passe MySQL)_ |

### Frontend (`packages/nextjs/.env.local`)
| Variable | Valeur |
|---|---|
| `NEXT_PUBLIC_LARAVEL_URL` | `http://localhost:8000/api` |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | _(adresse après déploiement)_ |

---

*Built with ❤️ on Starknet*
