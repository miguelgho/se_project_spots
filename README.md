# 📸 Spots - An Image Sharing Platform

Spots is a responsive web application that allows users to share, view, and interact with images. This project demonstrates core front-end development skills and has been completely refactored to use **Webpack** for modular component-based development and **Asynchronous JavaScript** to interact with a RESTful API.

**[Live Demo Link](https://miguelgho.github.io/se_project_spots/)**

---

## ✨ Key Features

- **Server Integration:** All user data, initial image cards, and likes are dynamically fetched from a backend database on page load.
- **Data Persistence:** Using `fetch` API requests (GET, POST, PATCH, PUT, DELETE), all changes made by the user are saved to the server and persist across browser refreshes.
- **Edit Profile & Avatar:** Users can update their name, professional description, and profile picture via a pop-up modal.
- **Add & Delete Posts:** Users can add new images to the gallery and delete their own posts (with a customized confirmation modal to prevent accidental deletions).
- **Image Interaction:** Users can 'like' or 'unlike' their favorite images, with the state accurately reflecting the server data.
- **Loading State UX:** Buttons dynamically update to say "Saving..." or "Deleting..." while waiting for server responses to greatly improve the user experience.
- **Robust Form Validation:** All forms feature real-time, client-side validation to guide the user before data is sent to the server.
- **Responsive Design:** Fully responsive layout optimized for desktop, tablet, and mobile.

---

## 🛠 Tech Stack

- **JavaScript (ES6+):** Object-Oriented Programming (OOP), Asynchronous JS (Promises, Fetch API), and modular architecture.
- **REST API:** Client-server communication handling asynchronous network requests.
- **HTML5 & CSS3:** Semantic markup, Flexbox, and Grid styling.
- **Webpack:** Module bundling, asset management, and minification.
- **Babel:** Transpiling for cross-browser compatibility.
- **PostCSS:** Automated vendor prefixing and CSS optimization.

---

## 💻 Running Locally

Since this project uses Webpack, you will need Node.js installed to run it.

### 1. Clone the repository

```bash
git clone [https://github.com/miguelgho/se_project_spots.git](https://github.com/miguelgho/se_project_spots.git)
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The project will open at localhost:8080 with hot reloading enabled.

### 4. Build for production

```bash
npm run build
```

This creates the optimized dist/ folder.

---

## 🎥 Video Demo

[First Video Link](https://drive.google.com/file/d/1MH3A_tKw_wm75WJJ5SloBhH0acjoNCAM/view)

[Latest updates Video Link](https://drive.google.com/file/d/1MH3A_tKw_wm75WJJ5SloBhH0acjoNCAM/view)

---

## 🚀 Future Features

### User Authentication: Implement a full login/registration system so multiple users can have isolated feeds and personalized tokens.

### Direct Image Uploads: Allow users to upload files directly from their device instead of relying solely on image URLs.

### Image Filters & Cropping: Add front-end photo editing capabilities before a post is submitted.
