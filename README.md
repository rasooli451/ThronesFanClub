# 🐺 ThronesFanClub 🐉

**ThronesFanClub** is a mini social networking platform designed specifically for fans of *Game of Thrones* and *A Song of Ice and Fire*. This fanclub app allows users to create accounts, make posts, comment, and interact with other fans — all while navigating the different privileges of being a true "member of the realm."

🔗 **Live Demo:** [thronesfanclub-production.up.railway.app](https://thronesfanclub-production.up.railway.app)  

---

## 🧩 Features

- 🔐 **Authentication & Session Management**
  - User registration and login using **Passport.js** and **express-session**
  - Only logged-in users can access the app routes

- 🧙 **Membership System**
  - All users can create accounts and interact with the app
  - To become a *member*, users must solve a lore-rich **riddle**
  - Members unlock additional features and access

- 📝 **Posts and Comments**
  - Create, edit, delete your own posts and comments
  - Like posts made by others
  - Non-members can post but have restricted editing capabilities
  - Non-members cannot see who posted or comment on posts

- 🧭 **User Profiles**
  - Members can visit other users’ profiles
  - View posts made by other users (members only)

---

## ⚙️ Tech Stack

| Technology         | Description                            |
|-------------------|----------------------------------------|
| **Node.js**        | Runtime environment                    |
| **Express.js**     | Web framework                          |
| **PostgreSQL**     | Relational database                    |
| **pg**             | PostgreSQL client for Node.js          |
| **EJS**            | Templating engine for rendering views  |
| **Passport.js**    | Authentication middleware              |
| **Express-Session**| Session management                     |
| **Railway**        | Hosting and deployment                 |

---

## 📁 Project Structure (Simplified)

```
ThronesFanClub/
├── views/              # EJS templates
├── public/             # Static assets (CSS, images)
├── routes/             # Express route definitions
├── models/             # DB logic and queries
├── server.js           # Main entry point
├── .env                # Environment variables (not committed)
├── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rasooli451/ThronesFanClub.git
cd ThronesFanClub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PGHOST=your-db-host
PGUSER=your-db-user
PGPASSWORD=your-db-password
PGDATABASE=your-db-name
PGPORT=your-db-port
SESSION_SECRET=your-secret
DATABASE_URL=your-database-url (optional)
```

> ⚠️ PostgreSQL connections on Railway typically require SSL. Ensure your DB client config includes `ssl: { rejectUnauthorized: false }`.

### 4. Run the App Locally

```bash
npm start
```

Go to `http://localhost:3000`

---

## 🧠 Membership Riddle System

To become a true member of the ThronesFanClub, users must solve a lore-based riddle drawn from the deep world of *A Song of Ice and Fire*. Only real fans will unlock the hidden features.

---

## 🛠 Deployment

The app is deployed on [Railway](https://railway.app/).

🔗 **Live URL:** [https://thronesfanclub-production.up.railway.app](https://thronesfanclub-production.up.railway.app)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👑 Acknowledgments

- Inspired by the world of *George R. R. Martin*
- Fonts and aesthetics chosen to reflect the tone of Westeros
