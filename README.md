# Restaurant Management Backend

## Project Overview

This project is a backend application built using Node.js, Express.js, and MongoDB. It provides REST APIs to manage restaurant menu items and staff details. It also includes authentication using Passport.js and JWT.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Passport.js
* JSON Web Token (JWT)
* bcrypt

## Features

* Create and retrieve menu items.
* Filter menu items by taste.
* Register users and authenticate them.
* Retrieve staff details.
* Filter staff by work role, such as chef, manager, and waiter.
* Update and delete staff records.
* Hash passwords using bcrypt.

## Project Structure

```text
nodejs-hotels/
├── models/
│   ├── menu.js
│   └── person.js
├── routes/
│   ├── menuRoutes.js
│   └── personRoutes.js
├── node_modules/
├── .env.example
├── .gitignore
├── auth.js
├── db.js
├── jwt.js
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Prerequisites

Install the following before running the project:

* Node.js
* npm
* MongoDB, either locally or through MongoDB Atlas

## Setup Instructions

1. Clone or download the project.

2. Open a terminal in the project directory.

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file using `.env.example` as a reference. Configure the MongoDB connection and any other required environment variables. Use your own local credentials and never commit secrets to GitHub.

5. Start the application:

   ```bash
   npm start
   ```

6. The server listens on port 3000 and connects to MongoDB when the configuration is correct.

## API Functionality

The application provides APIs for:

* Creating and retrieving menu items
* Filtering menu items by taste
* Registering and authenticating users
* Retrieving staff records
* Filtering staff by work role
* Updating staff records
* Deleting staff records

Refer to the files in the `routes` folder for the exact API endpoints, request methods, and required request bodies.

## Authentication

The project uses Passport.js for local authentication, bcrypt for password hashing, and JSON Web Tokens (JWT) for token-based authentication.

Users must provide the required credentials to register or log in.

## Security Notes

* Passwords are hashed using bcrypt.
* API responses should not expose password hashes.
* Protected operations should verify authentication and appropriate authorization.
* Database credentials and secret keys should be stored in environment variables.
* The `.env` file should not be committed to GitHub or included in a project submission ZIP.

## Learning Outcomes

This project helped me practice:

* Building REST APIs using Express.js
* Connecting MongoDB using Mongoose
* Implementing CRUD operations
* Password hashing and authentication
* Working with Passport.js and JWT
* Organizing a Node.js application using models and routes

## Future Improvements

* Strengthen authorization for update and delete operations.
* Add request validation and consistent error handling.
* Add API documentation.
* Add automated tests.

## Author

Sakshi
