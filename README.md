# NCT127 – NASA Collection of Technologies

A full-stack web application to explore NASA's technology patents. Built for educational exploration and personal research organization.

---

## Features

- Search NASA Patents via the TechTransfer API  
- Detailed Patent Views with modal interface  
- Stash System to preview saved patents  
- Profile Management with persistent saves  
- Notes, URLs, and Tags per patent  
- Tag Filtering for fast lookup  
- User Authentication (Sign Up & Login)  
- Material UI + Framer Motion animations  

---

## API Endpoints

All requests are prefixed with `/api`.

### Account & Auth (`nctAccount.js`)

| Method | Endpoint                        | Description                      |
|--------|----------------------------------|----------------------------------|
| GET    | `/nctaccount`                   | Retrieve all accounts            |
| POST   | `/nctaccount`                   | Register a new user              |
| GET    | `/nctaccount/:accountId`        | Get user by ID                   |
| PUT    | `/nctaccount/:accountId`        | Update user data                 |
| POST   | `/nctaccount/login`             | Login user                       |

### Patent Handling (`handlePatents.js`)

| Method | Endpoint                                        | Description                        |
|--------|--------------------------------------------------|------------------------------------|
| GET    | `/handlePatents/:accountId`                     | Get all saved patents for user     |
| POST   | `/handlePatents/:accountId`                     | Add new patent to user profile     |
| GET    | `/handlePatents/:accountId/:patentId`           | Get one patent by ID               |
| PUT    | `/handlePatents/:accountId/:patentId`           | Update notes, tags, URLs           |
| DELETE | `/handlePatents/:accountId/:patentId`           | Remove patent from user profile    |

### NASA External Search (`nasaApi.js`)

| Method | Endpoint             | Description                    |
|--------|----------------------|--------------------------------|
| GET    | `/nasaApi/:search`   | Search patents from NASA API  |

---

## Data Flow (Frontend <-> Backend)

- React (frontend) uses `fetch()` to communicate with Express (backend).
- State is shared across routes via React Router using `useSearchParams` or `useParams`.
- Data is stored in a MongoDB collection named `accounts`, each user with a `patents` array.

### MongoDB Schema

```json
{
  "_id": ObjectId,
  "username": String,
  "email": String,
  "password": String,
  "patents": [
    {
      "id": String,
      "data": Array,
      "notes": String,
      "tags": [String],
      "urls": [String]
    }
  ]
}
```

---

## File Structure

```
project-root/
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── components/
│       ├── assets/
│       └── main.jsx
├── backend/
│   ├── server.js
│   ├── api/
│   └── config/
├── Documents/
│   └── (project writeups, diagrams, reports)
└── README.md
```

---

## Setup Instructions

### 1. Frontend Setup

```bash
cd frontend
npm install
npm install react react-dom react-router-dom
npm install @mui/material @emotion/react @emotion/styled
npm install lucide-react
npm install framer-motion
```

### 2. Backend Setup

```bash
cd backend
npm install
npm install express cors body-parser mongodb
npm install -g nodemon
nodemon server.js
```

### 3. MongoDB Setup

- Install MongoDB Community Edition
- Create a database: `NCT127`
- Create a collection: `accounts`
- Ensure the MongoDB URI and port in `config/db.js` match your local MongoDB setup

---

## Team Contribution

**Danton Dang**  
- Frontend: PatentView, Profile, View/Edit Notes, Stash Page  
- Backend: CRUD endpoints for accounts and patents  

**Evan**  
- Frontend: Navbar, Dropdowns, Login/Signup  
- Backend: User authentication routes and validation logic  

---

