# 🏃 PowerPlay – Athletic Event Booking Platform (Client Side)

This is the **client side** of **PowerPlay**, an athletic event booking platform that allows users to browse, create, and book sports events. Built with **React 19**, **Firebase Auth**, and styled using **Tailwind CSS**, the application offers a seamless and responsive user experience.

> 🔗 **Live Site:** [https://powerplay-faisal-ahmed.netlify.app/](https://powerplay-faisal-ahmed.netlify.app/)

---

## 🚀 Overview

PowerPlay connects athletes and sports enthusiasts with real-world competitions and local events. It supports secure login, dynamic routing, bookings, and event management—all in a modern, single-page app interface.

---

## 🧩 Key Features

### 🔐 Authentication

- Email/password login
- Google authentication
- Firebase-based auth with user profile
- Auth state persistence across refreshes
- Profile image, hover name, and logout

### 📄 Pages

- **Home**: Slider for upcoming events, featured events, testimonials
- **Events**: All events with search filter (by name or location)
- **Event Details**: View + Book
- **Create Event**: Protected route for event organizers
- **Manage Events**: Update/Delete user-created events
- **My Bookings**: View, toggle layout (table/card), cancel bookings
- **Update Event**: Pre-filled form for updating events
- **404 Page**: Custom not-found page

### 🛠 Functionality

- Prevent duplicate bookings
- Responsive design for all devices
- Dynamic page titles using route name
- Toasts and SweetAlert2 for feedback
- Loading spinners while fetching data

---

## 🛠 Technologies & Libraries

| Package         | Purpose                    |
| --------------- | -------------------------- |
| React 19        | Frontend framework         |
| React Router v7 | Routing and private routes |
| Firebase        | Authentication             |
| Tailwind CSS    | Styling                    |
| DaisyUI         | UI components              |
| SweetAlert2     | Confirmation modals        |
| React Icons     | Icon library               |
| React Hot Toast | Toast notifications        |
| jwt-decode      | JWT decoding (future use)  |
| Lottie React    | Animations                 |
| Vite            | Build tool                 |

---

## 📂 Folder Structure

src/
├── assets/
├── components/
├── context/
│ └── AuthContext.jsx
├── firebase/
├── pages/
│ └── Home, Events, Bookings, CreateEvent, etc.
├── router/
│ └── PrivateRoute.jsx
└── main.jsx
