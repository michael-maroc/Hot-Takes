
# Project 6 of the web development course with Openclassrooms
# Build a secured API for a food reviews app

The project consists of creating the backend side of the application using MongoDB and Node.js

## Back end Prerequisites
You will need to have Node and npm installed locally on your machine.

## Installation

Open your terminal and navigate to the "Client" folder

```bash
  cd client
```

Then install the dependencies using npm

```bash
  npm install
```

In another terminal, navigate to the "Server" folder

```bash
  cd server
```

Then install the dependencies using npm

```bash
  npm install
```
    
## 🛠 Tools used

* MongoDB
* Node.js
* Express
* JSON Web Tokens

## Environment variables

You'll need to enter the environments variables of the ".sample.env" file (which will have to be renamed to ".env"). The ".sample.env" file is in the "server" folder

### Configuration of the .env file

* ### Connection to the database

`SECRET_DB` = Connection string of your database (mongodb+srv://...)

* ### Token settings

`ACCESS_TOKEN_SECRET` = Your secret key (e.g cn0d4g33uc9...)

`ACCESS_TOKEN_EXPIRY` = Token expiry time (e.g 24h...)

## Start the project

### Once the installation is done and the environments variables are entered, you can start the project

* In your terminal at the "Client" folder, enter the command:
```bash
  npm start
```

* Same for the "Server" folder enter the command:
```bash
  npm start
```

* Then open your browser with at the url: http://localhost:4200/

## Documentation

[Project requirements](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Requirements_DW_P6.pdf)
