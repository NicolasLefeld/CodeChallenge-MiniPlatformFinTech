# Mini Fintech API

A simple virtual wallet platform for user-to-user transactions.

## 🛠️ Stack

- Node.js + Express
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Jest for testing

## ▶️ How to Run

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```
DB_URL=postgres://user:pass@localhost:5432/mini_fintech
JWT_SECRET=secret123
```

3. Start the server:

```bash
npm start
```

4. Run tests:

```bash
npm test
```

## 👤 Mock User

Insert this SQL manually to create a test user:

```sql
INSERT INTO "Users"  (id, name, email, balance, "createdAt", "updatedAt")
VALUES (1, 'Test User', 'test@example.com', 100000, NOW(), NOW());
```

## 🔐 Authentication

Use this endpoint to get a JWT token:

```http
POST /login
{
  "userId": 1
}
```

Then use the token in all authenticated requests:

```
Authorization: Bearer <token>
```

## 📬 API Endpoints

- `POST /login`: Get a JWT token
- `GET /health`: Health check
- `POST /transactions`: Create a transaction
- `GET /transactions`: List user's transactions
- `PATCH /transactions/:id/approve`: Approve a pending transaction
- `PATCH /transactions/:id/reject`: Reject a pending transaction

## 📫 Postman Collection

Import `mini-fintech-postman.json` to test all endpoints quickly.
