# Mobile Acebook Backend

This repository contains a fully-working application using the MERN stack.

The application is the same you just worked on during your recent [Engineering
Project](https://github.com/makersacademy/course/tree/main/simple/engineering_projects),
so it should be extremely familiar.

:warning: The frontend code is included for reference only and is not required
for this week's project. You'll be focusing on integrating your Mobile App with
the existing backend within this repository.

:information_source: Do not worry if you used a different tech stack for your
Acebook project (e.g. Ruby on Rails), as the project is designed to be
backend-agnostic really. Keep reading and this will make more sense soon!


## Existing Features

This is a complete Acebook project, but you will only integrate your Mobile App
against a subset of the features already available.

Feel free to explore more features if you have extra time!


## API Endpoints Overview

Here's a quick overview of the API endpoints you'll be interacting with:

| Endpoint                    | Method | Payload Model | Description                          | Response Values                          |
|-----------------------------|--------|---------------|--------------------------------------|------------------------------------------|
| http://127.0.0.1:8080/users  | POST   | User          | Sign up a new user                   | 201 OK: `{ message: 'OK' }`              |
| http://127.0.0.1:8080/tokens | POST   | email, password | Log in an existing user             | 201 OK: `{ token: String, message: 'OK' }`|
| http://127.0.0.1:8080/posts  | POST   | NewPost       | Create a new post                    | 201 OK: `{ message: 'OK', token: String }`|
| http://127.0.0.1:8080/posts  | GET    | N/A           | Fetch all posts                      | 200 OK: `{ posts: [Post], user: User, token: String }` |


Remember to include the token in the request headers for authenticated routes.


## Postman collections

We have created a Postman collection with all the relevant requests in it for
the week, in case you need to test your backend in isolation to get clarity
about payloads, etc.

This collection should help you make sense of what the Models in the table above
mean :)

Consider this a hint for your SwiftUI mobile app!

You can find it [here](./utils/Mobile_Acebook_Backend.postman_collection.json).

And to import it in Postman, simply click on "File" -> "Import" and select the
above file, a new collection should be created and you're ready to go!


<br>

-------
-------
-------

<br>


We have also included all the relevant instructions that were part of the
[original template for the MERN Acebook
project](https://github.com/makersacademy/acebook-mern-template) just below as
well for reference in case you need them.

## Videos

* [An overview of the app](https://youtu.be/meTABGgrO2c)
* [The backend (api)](https://youtu.be/mFczOzWW3vo)
* [Postman](https://youtu.be/VO_kinuJngA)


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

This application is comprised of two distinct pieces.

- A backend API built with Express
- A frontend built with React (for reference only)


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

### What is a JSON Web Token?

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

:warning: Make sure that your backend server (in `./api`) is running so that you
can interact with it from your Mobile App.

:rotating_light: You do not need to run the React application (in `./frontend`)
at all.

1. Clone this project to your local machine. (Do not fork it, as you will not
   make any changes to it really.)
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

## MongoDB Connection Errors?

Some people occasionally experience MongoDB connection errors when running the
tests or trying to use the application. Here are some tips which might help
resolve such issues.

- Check that MongoDB is installed using `mongo --version`
- Check that it's running using `brew services list`

If you have issues that are not resolved by these tips, please reach out to a
coach and, once the issue is resolved, we can add a new tip!
