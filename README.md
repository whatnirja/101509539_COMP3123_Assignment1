# COMP3123 Assignment 1 – Backend API (Node.js, Express, MongoDB)

**Student Name:** Nirja Arun Dabhi  
**Student ID:** 101509539  
**Course:** COMP3123 – Full Stack Development  
**Due Date:** October 12, 2025  

## Project Overview
This backend REST API is built using Node.js, Express.js, and MongoDB Atlas.  
It provides routes for User and Employee management, supporting full CRUD operations, authentication, and validation as required in the assignment.

## Features
### User Module
- User registration (signup)
- User login (authentication)
- Password encryption using bcrypt
- JWT token generation for secure authentication
- Duplicate user prevention (unique username/email)

### Employee Module
- Create, view, update, and delete employee records
- Validation for fields such as name, email, salary, and department
- Secured endpoints using JWT authentication
- Returns structured JSON responses with proper HTTP status codes

### Validation and Security
- Input validation using express-validator  
- Mongoose schema validation  
- Password hashing using bcryptjs  
- JWT authentication for protected routes  
- Environment variables stored securely in `.env`

## Technologies Used
| Category | Tools / Libraries |
|-----------|-------------------|
| Backend Framework | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Validation | express-validator |
| Authentication | bcryptjs, jsonwebtoken |
| Configuration | dotenv |
| Testing | Postman |
| Dev Utility | Nodemon |

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/101509539_COMP3123_Assignment1.git
   cd 101509539_COMP3123_Assignment1
2. Install dependencies:
   ```bash
   npm install
3. Run server:
   ```bash
   npm run dev
