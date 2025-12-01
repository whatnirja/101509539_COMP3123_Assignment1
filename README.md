# COMP3123 – Full Stack Development I
## Assignment 2 – Employee Management System (MERN)

**Student ID:** 101509539  
**Name:** Nirja Dabhi

## Overview
This is a full-stack MERN Employee Management System that includes user authentication, employee CRUD operations, image uploads using Multer, and full deployment using Render (backend), Vercel (frontend), and MongoDB Atlas (database).

## Features

### Authentication
- User signup
- User login
- JWT authentication
- Password hashing (bcrypt)
- Protected routes

### Employee Management
- Create new employees
- View all employees
- View employee details
- Update employee information
- Delete employees
- Filter by department or position

### Image Upload
- Multer-based profile picture upload
- Images stored in `/uploads`
- Frontend displays uploaded pictures correctly

### Deployment
- Backend: Render
- Frontend: Vercel
- Database: MongoDB Atlas

## Technology Stack

### Frontend
- React.js  
- Axios  
- React Router  
- Bootstrap  

### Backend
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- Multer  
- bcrypt  
- JSON Web Tokens  


## Project Structure

### Backend
backend/
server.js
package.json
.env
uploads/
controllers/
models/
routes/
middleware/

### Frontend
frontend/
src/
App.js
api/axios.js
components/
pages/
styles/
package.json
.env


## API Endpoints

### Authentication
| Method | Endpoint      | Description    |
|--------|---------------|----------------|
| POST   | /auth/signup  | Register user  |
| POST   | /auth/login   | Login user     |

### Employees
| Method | Endpoint                | Description         |
|--------|--------------------------|---------------------|
| GET    | /emp/employees          | Get all employees   |
| GET    | /emp/employees/:id      | Get single employee |
| POST   | /emp/employees          | Create employee     |
| PUT    | /emp/employees/:id      | Update employee     |
| DELETE | /emp/employees/:id      | Delete employee     |

## Local Setup

1. Clone the repository  
2. Install backend dependencies (`npm install`)  
3. Install frontend dependencies (`npm install`)  
4. Add `.env` files  
5. Run backend (`npm start`)  
6. Run frontend (`npm start`)  


## Deployment

### Backend (Render)
- Create Web Service  
- Add environment variables  
- Build command: `npm install`  
- Start command: `node server.js`  

### Frontend (Vercel)
- Connect GitHub  
- Add environment variable:  
  `REACT_APP_API_URL=https://101509539-comp-3123-assignment1-hkb.vercel.app`  


**Local:**  
`REACT_APP_API_URL=http://localhost:8080/api/v1`

**Deployed:**  
`REACT_APP_API_URL=https://101509539-comp-3123-assignment1-hkb.vercel.app`


## Screenshots
<img width="777" height="522" alt="Screenshot 2025-11-30 at 10 53 54 PM" src="https://github.com/user-attachments/assets/e7be8d85-b102-4f0a-80e9-f30a627286df" />
<img width="1198" height="1011" alt="Screenshot 2025-11-30 at 10 54 54 PM" src="https://github.com/user-attachments/assets/5722e815-df48-48dc-8bc4-8d40082c46af" />
<img width="637" height="514" alt="Screenshot 2025-11-30 at 10 55 21 PM" src="https://github.com/user-attachments/assets/04ea8817-e38b-43ba-84f4-2138acb52e58" />



