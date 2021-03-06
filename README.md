# Bio-WebApp
![](https://img.shields.io/badge/node-^6.7.0-blue.svg) ![](https://img.shields.io/badge/angular-^7.2.0-green.svg) ![](https://img.shields.io/badge/express-^4.16.3-blue.svg) ![](https://img.shields.io/badge/mongoose-^5.1.5-yellow.svg) <br>

A MEAN stack demo appliction whose frontend is built by angular-cli while backend is built by express. Can login/logout, register, pull data from data server and do specific search and add, as well as total requesting process to the robot. Facing to biological engineers to send requests to the bio-robot.

Hint: Because some parts of project's data server was based on an internal database, the Heroku link https://fflabdemo.herokuapp.com/ can not show all functions in the projects.

## TODO

Configure the API endpoints of frontend in `/angular-src/src/environments` insead of creating an extra `testServer.ts` file.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Your own MongoDB should be installed no matter 
a local one such as [MongoDB Compass](https://www.mongodb.com/products/compass)
 or a remote one like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

* Nodejs should be installed

```Bash
brew install node
```

### Installing

* Install the dependencies for the backend at root directory:

```Bash
npm install
```

* Then there are two ways to install the dependencies for angular frontend:

  * Directly install at root directory:

  ```Bash
  npm run angular-install
  ```

  * Or install the dependencies for angular frontend seperately at `./angular-src` folder:

  ```Bash
  cd angular-src

  npm install
  ```

### Configuration

#### a. Database
* If planning to run the project locally, then we should configure the database like this in `./config/database.js`:

```javascript
module.exports = {
  database: 'mongodb://localhost:27017/<databse>',
  secret: 'yoursecret'
}
```
* If planning to run on the remote server, such as Heroku server, then the database should be configured like this in `./config/database.js`:

```javascript
module.exports = {
  database: 'mongodb+srv://<username>:<password>@guozhimongo-4p5ba.mongodb.net/<database>?retryWrites=true&w=majority',
  secret: 'yoursecret'
}
```

#### b. Live App Configuration
* This application has been deployed on Heroku Server. Here is the link: [Bio-WebApp](https://fflabdemo.herokuapp.com/)<br>
* The steps of creating live app on Heroku can be found in my repository "Guozhi_Programming_Notes": [Heroku Configuration](https://app.gitbook.com/@tangguozhi53/s/guozhi-programming-notes/configuration-tutorials/1.12-heroku-configuration) <br>
* In this project, in order to deploy on Heroku, some changes should be made:
  * In `./routes/app.js`, port number should be changed:
    ```javascript
    // Port Number
    // const port = 3000;
    // For Heroku
    const port = process.env.PORT || 8080;
    ```
  * Meanwhile, in `./angular-src/src/app/testServer.ts`, the testServer parameter should be changed like below:
    ```javascript
    // When in development mode, the address for Node Server could be defined exactly 
    //export const testServer = 'http://localhost:3000/';

    // For Production mode
    export const testServer = '';
    ```

## Running the project

* First, run the MongoDB server in the terminal:
```Bash
mongod
```

* Then there are two ways to run the backend and frontend servers:

  * Directly run two servers at the same time with the help of `concurrently` at root directory

  ```Bash
  npm run dev
  ```
  
  * Run two servers seperately:

    * Open a new terminal and change to the root directory to run the backend server:

    ```Bash
    nodemon
    ```

    * After that, open a new terminal and change to the `./angular-src` and run the frontend server:

    ```Bash
    ng serve
    ```

Then, we can see our project locally on http://localhost:4200.

Once we have some changes on the frontend side, run following command to export frontend components to the public folder, and then deploy the project to Heroku:

```Bash
ng build
```

The final home page is shown below:

![home](./angular-src/src/assets/home.png)

All the functionalities:

![functions](./angular-src/src/assets/functions.png)

## Built With

* [MongoDB/Mongoose](https://www.npmjs.com/package/mongoose) - The database for the project and the related small API.
* [Express](https://expressjs.com/) - Web backend framework.
* [Angular7](https://angular.io/) - Web frontend framework.
* [Nodejs](https://nodejs.org/en/) - Javascript running environment.