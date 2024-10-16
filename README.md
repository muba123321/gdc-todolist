# TODO List Web Application

# Author: [Mubarak Adam Ibnu Chambas]

# Date: 2024-10-14

## Deployed on Render

https://todolist-gdc.onrender.com/

## Description

A full-stack TODO list web application that allows users to register, log in, and manage their tasks efficiently. Users can add, update, mark as complete, and delete tasks. The application uses React with Vite on the frontend, Node.js/Express on the backend, MongoDB as the database, and Redux Toolkit with Redux Persist for state management.

## Features

- User Authentication (Sign up, Sign in, and Sign out)
- Create, Edit, Complete, and Delete tasks
- Persist login session using Redux Persist
- REST API for task management
- Bootstrap for responsive design
- Logout with session cleanup

## Technologies Used

- Frontend: React, Vite, Redux Toolkit, Bootstrap
- Backend: Node.js, Express.js
- Database: MongoDB
- State Management: Redux with Redux Persist
- API Client: Axios

## API Endpoints

### Authentication

- POST /auth/signup – Register a new user
- POST /auth/signin – Login a user
- GET /auth/signout – Logout the user

### Tasks

- GET /tasks – Get all tasks for the logged-in user
- POST /tasks – Create a new task
- PUT /tasks/:id – Update a task
- DELETE /tasks/:id – Delete a task
