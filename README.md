# 🛒 E-Commerce Website

A full-stack e-commerce web application with product listings, cart management, and checkout flow — built with the MERN stack.

<!-- ![demo](./screenshots/demo.gif) -->

🔗 **Live Demo:** [add-your-deployed-link-here]
📂 **Repo:** https://github.com/samrajay99/E_Commerce_website

---

## ✨ Features

- Browse products with categories/filters
- Product detail pages
- Add to cart / update quantity / remove from cart
- Checkout flow
- User authentication (login/signup)
- Responsive design across devices
- (Update this list to match what you actually built — e.g. payment gateway integration, order history, admin product management)

---

## 🛠️ Tech Stack

**Frontend:** React.js, [Tailwind CSS / Bootstrap — update], Redux (if used for cart state)
**Backend:** Node.js, Express.js
**Database:** MongoDB
**Auth:** [JWT — update if applicable]
**Payments:** [Stripe / Razorpay test mode — update if applicable]
**Other tools:** Postman, Git

---

## 📸 Screenshots

| Home / Product Grid | Product Detail | Cart & Checkout |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/samrajay99/E_Commerce_website.git
cd E_Commerce_website

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### Environment Variables

`server/.env`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
# STRIPE_SECRET_KEY=your_key   (if payments integrated)
```

### Run Locally

```bash
# Backend
cd server
npm run dev

# Frontend (separate terminal)
cd client
npm start
```

Visit `http://localhost:3000`.

---

## 📁 Folder Structure

```
E_Commerce_website/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/          # if using Redux for cart state
│   │   └── App.js
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
└── README.md
```

---

## 🗺️ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get a single product |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:id` | Update cart item quantity |
| DELETE | `/api/cart/:id` | Remove item from cart |
| POST | `/api/orders` | Place an order |

---

## 🔮 Future Improvements

- Integrate real payment gateway (Stripe/Razorpay)
- Add order history & order tracking
- Add admin panel for inventory management
- Add product reviews & ratings

---

## 👤 Author

**Samrajay Gupta**
[LinkedIn](https://linkedin.com/in/samrajaygupta1) · [GitHub](https://github.com/samrajay99) · samrajgupta250298@gmail.com
