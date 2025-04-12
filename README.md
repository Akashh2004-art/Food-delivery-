# 🍅 Tomato - Online Food Delivery App

**Tomato** is a modern, full-stack food delivery web application where users can explore dishes, add them to a cart, and place orders. Admins can manage items, track orders, and control the platform via a separate dashboard.

---

## 🚀 Features

### 👨‍🍳 User Side
- 🍽️ Browse food by categories (🥗 Salad, 🌯 Rolls, 🍰 Dessert, 🍜 Noodles etc.)
- 🛒 Add to cart with quantity control
- 📦 Place & view orders in "My Orders"
- 🔐 JWT-based secure authentication
- 📱 Fully responsive UI

### 🧑‍💼 Admin Panel
- ➕ Add/Edit/Delete food items
- 📊 View all orders in real-time
- 👤 Manage users (optional)
- 🖼️ Upload item images (stored in `/uploads`)

---

## 🏗️ Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| 👨‍🎨 Frontend   | React.js, Vite, CSS         |
| 🔙 Backend    | Node.js, Express.js         |
| 🗄️ Database    | MongoDB (Atlas)             |
| 🔐 Auth       | JWT                        |
| 🖼️ Uploads     | Multer + File System        |

---

## 📁 Folder Structure

```
project-root/
├── frontend/           # 🍔 User UI
│   └── src/
│       ├── components/
│       ├── context/
│       └── pages/
│   └── .env            # Frontend environment variables
│
├── admin/              # 🧑‍💼 Admin Panel
│   └── components/
│   └── pages/
│   
│
├── backend/            # 🔙 API + DB
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/        # Image storage
│   └── .env            # Backend environment variables
│   └── server.js
```

---

## 🔐 Environment Variables Setup

### 📦 Backend `.env`
Create a `.env` file inside the `backend/` folder:

```env
PORT=4000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
SALT=your_salt
MONGODB_URI=mongodb+srv://your-user:your-pass@cluster.mongodb.net/dbname
STRIPE_SECRET_KEY=your_stripe_key (optional if Stripe integration added later)
```

### 🧑‍🎨 Frontend `.env`
Inside the `frontend/` directory:

```env
VITE_API_URL=http://localhost:4000
```

---

## 🔧 Local Setup Instructions

### 1️⃣ Backend Setup

cd backend

npm install

npm start


### 2️⃣ Frontend Setup

cd frontend

npm install

npm run dev


### 3️⃣ Admin Panel Setup

cd admin

npm install

npm run dev


---

## 🖼️ Image Uploads

- Food item images uploaded via admin are stored in `backend/uploads/`
- You may use `uploads/` as a static folder to serve images via Express

---

## 🌐 Deployment

- Frontend: Vercel / Netlify
- Backend: Render / Railway / Cyclic
- MongoDB: MongoDB Atlas

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

