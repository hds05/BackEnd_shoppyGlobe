# ShoppyGlobe Backend API

A simple e-commerce backend built using **Node.js, Express, MongoDB, and JWT Authentication**.
This API allows users to register, login, Add product, view products, and manage their cart.

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (Authentication)
* bcryptjs (Password hashing)

---

# Setup Instructions

### 1. Clone the repository

```bash
git clone "https://github.com/hds05/BackEnd_shoppyGlobe.git"
cd Project_Node
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000
```

### 4. Run the server

```bash
npm start
```

---

# 🌐 Base URL

```
http://localhost:4000
```

---

# Authentication APIs

## Register User

```
POST /auth/register
```

**Body:**

```json
{
  "name": "Himanshu",
  "email": "test@test.com",
  "password": "123456"
}
```

---

## Login User

```
POST /auth/login
```

**Body:**

```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "your_jwt_token"
}
```

---

# Product APIs

## Get All Products

```
GET /products
```

---

## Get Product by ID

```
GET /products/:id
<!-- Here, give the ObjectId of the particular item stored in product collection -->

```

---

## Add Product

```
POST /addProduct
```

**Body:**

```json
{
  "name": "Product 1",
  "price": 100,
  "description": "Sample product",
  "stock": 10
}
```

---

# Cart APIs (Protected)

👉 Add this header in all cart requests:

```
Authorization: Bearer YOUR_TOKEN
```

---

## Get Cart Items

```
GET /cart
```

---

## Add to Cart

```
POST /cart/addToCart
```

**Body:**

```json
{
  "productId": "PRODUCT_ID",
  "quantity": 2
}
```

---

## Update Cart Item

```
PUT /cart/updateCart/:id
<!-- Here, give the ObjectId of the item stored in the cart you want to update-->

```

**Body:**

```json
{
  "quantity": 5
}
```

---

## Delete Cart Item

```
DELETE /cart/deleteProduct/:id   
<!-- Here, give the ObjectId of the item stored in the cart -->
```

---

# API Flow

1. Register user
2. Login user → get token
3. Use token for protected routes
4. Fetch products
5. Get/Add/update/delete cart items
6. Get/Get:id/Add products

---

# Important Notes

* Passwords are hashed using bcrypt
* JWT is used for authentication
* Protected routes require token
* MongoDB stores all data

---

# Features

* User Authentication (Register/Login)
* Product Management
* Cart Management
* Secure API with JWT
* Clean MVC Architecture

---

# Author

Himanshu 😁

---

# Status

✅ Ready for submission
