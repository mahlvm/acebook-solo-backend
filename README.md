# Acebook Backend

This repository contains a backend application using the MERN stack. 


## API Endpoints Overview

Here's a quick overview of the API endpoints you'll be interacting with:

| Endpoint                                                  | Method |  Description             | 
|-----------------------------------------------------------|--------|--------------------------|
| http://127.0.0.1:8080/users                               | POST   | Sign up a new user       |
| http://127.0.0.1:8080/users/all                           | GET    | Fetch all users          | 
| http://127.0.0.1:8080/users/:userId/add-friend/:friendId  | POST   | Connect two users        | 
| http://127.0.0.1:8080/users/:userId/friends               | GET    | Connections by users     | 
| http://127.0.0.1:8080/users/avatar/:filename              | GET    | Fetch avatar             | 
| http://127.0.0.1:8080/users/:userId                       | PUT    | Update user              | 
| http://127.0.0.1:8080/tokens                              | POST   | Log in an existing user  | 
| http://127.0.0.1:8080/posts                               | POST   | Create a new post        | 
| http://127.0.0.1:8080/posts                               | GET    | Fetch all posts          | 
| http://127.0.0.1:8080/posts                               | DELETE | Delete post              | 
| http://127.0.0.1:8080/posts/:postId/like                  | GET    | Like posts               | 
| http://127.0.0.1:8080/comments/:postId                    | POST   | Create a new comment     |
| http://127.0.0.1:8080/comments/:postId                    | GET    | Fetch comments by post   |
| http://127.0.0.1:8080/comments/:commentId/like            | PUT    | Like comment             |
| http://127.0.0.1:8080/comments//:commentId"               | DELETE | Delete comment           |



## Technologies

### **M** is for MongoDB
[MongoDB](https://www.mongodb.com/) is a _NoSQL_ database program that stores
data in collections of documents (in a format similar to JSON), rather than in
tables. The application interacts with MongoDB using a tool called Mongoose.

### **E** is for Express
[Express](https://expressjs.com/) is the Javascript equivalent of Sinatra. The
structure of this application will feel quite different to what you're used to
but the principles are the same.

### **R** is for React

### **N** is for Node
Javascript was originally designed to run exclusively in browsers, such as
Chrome. [Node](https://nodejs.org/en/) is a tool that allows you to run
Javascript outside the browser and its invention made it possible to build full
stack Javascript apps.


## Architecture

- A backend API built with Express



## Authentication

Here's the authentication flow for this application

1. A registered user submits their email address and password from the frontend
   (our Mobile App in this case).
2. The backend receives the data and tries to find a user in the DB with the
   same email address.
3. If a user is found, the password in the database is compared to the password
   that was submitted.
4. If the passwords match, a JSON Web Token is generated and returned, as part
   of the response.
5. The frontend receives the token and holds on to it.
6. Every request to the backend that requires authentication must include a
   valid token (which is checked by the backend).
7. When the user logs out, the front end discards the token.

![authentication flow diagram](./diagrams/auth_flow.png)

### JSON Web Token

A JSON Web Token, or JWT, is a token that comprises three parts

- A header, which contains information about how the token was generated.
- A signature, which is used to verify the token.
- A payload, which you can use to store some **non-sensitive data** like a user
  id. Note that the payload is not secure and can be decoded very easily.

The signature is created using a 'secret', which must be kept private (i.e. not
put on GitHub) otherwise nefarious internet users could start to issue tokens
for your application.

Here, we've used an environment variable called `JWT_SECRET`, which you'll see
used in the commands to start the application and run the tests (below). You can
change the value of that environment variable to anything you like.


## Quickstart

### Install Node.js

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), currently `18.1.0`.
   ```
   nvm install 18
   ```

### Set up your project

:warning: Make sure that your backend server (in `./api`)

1. Clone this project to your local machine.
2. Install Node.js dependencies for the backend (API)
   ```
   ; cd api
   ; npm install
   ```
3. Install MongoDB (if you haven't already)
   ```
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```
   *Note:* If you see a message that says `If you need to have
   mongodb-community@5.0 first in your PATH, run:`, follow the instruction.
   Restart your terminal after this.
4. Start MongoDB
   ```
   brew services start mongodb-community@5.0
   ```

### Start

1. Start the server

  **Note the use of an environment variable for the JWT secret**

   ```
   ; cd api
   ; JWT_SECRET=SUPER_SECRET npm start
   ```


