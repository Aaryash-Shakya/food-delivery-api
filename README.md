# Food Delivery API (Node.js, Express, TypeScript)

Welcome to the Food Delivery API, a backend service built with Node.js, Express, and TypeScript for managing food delivery orders. This API provides a robust platform for handling food orders, user authentication, and restaurant management. Whether you're a restaurant owner or a developer looking to integrate food delivery functionality into your application, this API is a great starting point.

## Features

- **User Authentication:** Secure user registration and login with JWT (JSON Web Tokens) for authentication.
- **Email Verification:** Verify user email with noedmailer and mailtrap.
- **Restaurant Management:** Add, update, and delete restaurant information. (coming soon)
- **Menu Management:** Create and manage restaurant menus with items, prices, and descriptions. (coming soon)
- **Order Management:** Allow users to place orders and track their delivery status. (coming soon)
- **Real-time Updates:** Real-time updates on order status using WebSockets. (coming soon)

## Installation

Follow these steps to set up the Food Delivery API on your local development environment:

1. Clone the repository:
  ```sh
  git clone https://github.com/Aaryash-Shakya/food-delivery-api.git
  cd food-delivery-api
  ```

2. Install dependencies:
  ```sh
  npm install
  ```

3. Set up environment variables:
  ```
  For databsae
    Login/Signup for your mongodb account
    create folder environments with with environment.ts which exports ur db_uri which you can find in your mongodb account.
    For detailed instruction (click me)[https://www.mongodb.com/docs/v2.2/reference/connection-string/]

  For mail testing
    Create a mailtrap account
    In .env folder add NODEMAILER_USER and NODEMAILER_PASS with the value in your account.
    For detailed instruction (click me)[https://mailtrap.io/blog/setup-smtp-server/] 
  ```

4. Start the API server:
  ```sh
  npm start
  ```

The API should now be running locally on http://localhost:3000.

## Contributing
We welcome contributions from the open-source community to enhance my api's features, functionality, and documentation. Feel free to fork this repository, create your own branch, and submit pull requests.

### Make sure to follow the instruction below:

1. **Fork this repository.**

Click on the fork button on the repository

2. **Clone the repostory:**

Go to your forked repositry, Click on the code button and copy your repositroy's `(.git)` link.
  
clone the repository like this.

  ```sh
  git clone https://github.com/<your-username>/food-delivery-api.git
  cd food-delivery-api
  ```

3. **Make a breanch and add your changes:**

In your local machine create a new branch

  ```sh
  git checkout -b <branch_name>
  ```

Add your changes to the branch

4. **Check the changed files**

  ```sh
  git status
  ```

5. **If all good, then Commit Your Changes**

  ```sh
  git add .
  git commit -m "<EXPLAIN-YOUR_CHANGES>"
  ```

6. **Push to Your Forked Repository**

  ```sh
  git push -u origin <branch_name>
  ```

7. **Create a Pull Request**

Go to your forked repository on GitHub, and you should see a "Compare & pull request" button. Click on it to create a pull request (PR).

Create a pull request with a clear description of your changes.
  
Your contribution will be reviewed, and upon approval, it will be merged into the main repository.

