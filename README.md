# Food Delivery API

Welcome to the Food Delivery API, a complete backend service for a food delivery system. This API provides a robust platform for handling food orders, user authentication, and restaurant management. Whether you're a restaurant owner or a developer looking to integrate food delivery functionality into your application, this API is a great starting point.

## <img src="https://cdn.iconscout.com/icon/free/png-256/free-layers-94-675757.png?f=webp" height=32 width=32> Tech Stack

- <img src="https://img.shields.io/badge/-TypeScript-555?logo=typescript" height=30> 
- <img src="https://img.shields.io/badge/-Node.js-555?logo=node.js" height=30> 
- <img src="https://img.shields.io/badge/-Express-555?logo=express" height=30> 
- <img src="https://img.shields.io/badge/-MongoDB-555?logo=mongodb" height=30> 

## 💡Features

- **User Authentication:** Secure user registration and login with JWT (JSON Web Tokens) for authentication.
- **Email Verification:** Verify user email with noedmailer and mailtrap.
- **Restaurant Management:** Add, update, and delete restaurant information.
- **Geospatial Query:** Find nearby restaurants using users coordinated.
- **Menu Management:** Create and manage restaurant menus with items, prices, and descriptions.
- **Order Management:** Allow users to place orders and track their delivery status. (coming soon)
- **Real-time Updates:** Real-time updates on order status using WebSockets. (coming soon)

## 🧑‍💻 Installation
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

    **For database:**
    <br>Create a folder environments with environment.ts and past the code below.
    ```js
    export function getEnvironmentVariables() {
      return {
        db_uri: <insert_string>;
        jwt_secret_key: <insert_string>;
      }
    }
    ```
    For db_uri create/login to your mongodb account and create new cluster and go to connect > connect with mongodb driver for node.js 
    
    For detailed instruction [click me](https://www.mongodb.com/languages/javascript/mongodb-and-npm-tutorial)
    <br>For video tutorial [click me](https://youtu.be/LTKgKt_t1JE?si=TVOShixJm1_Zw3cL)

    **For mail testing**
    <br>Create .env folder add NODEMAILER_USER and NODEMAILER_PASS with the value in your account.
    ```
    NODEMAILER_USER = "your mailtrap SMTP server username"
    NODEMAILER_PASS = "your mailtrap SMTP server password"
    ```
    Create/login to your mailtrap account go to email testing > my inbox > SMTP setting > show credentials
    
    For detailed instruction [click me](https://help.mailtrap.io/article/5-testing-integration)

5. Start the API server:
    ```sh
    npm start
    ```

The API should now be running locally on http://localhost:3000.

## <img src="https://cdn.iconscout.com/icon/free/png-256/free-social-285-116319.png?f=webp" height=32 width=32> Contributing
We welcome contributions from the open-source community to enhance my api's features, functionality, and documentation. Feel free to fork this repository, create your own branch, and submit pull requests.

### Make sure to follow the instruction below:

1. **Fork this repository.**
    
    Click on the fork button on the repository

2. **Clone the repostory:**

    Go to your forked repositry, Click on the code button and copy your repositroy's `(.git)` link.
  
    Then, clone the repository in ur machine using the command below

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

5. **If everything's good, then Commit Your Changes**

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

## API Reference

### User Routes

#### Sign up

```http
POST /api/user/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your name |
| `email` | `string` | **Required**. Your email |
| `phone` | `string` | **Required**. Your phone number |
| `password` | `string` | **Required**. Your password plaintext |
| `type` | `string` | **Required**. Type of account ( admin/restaurant/customer )  |
| `status` | `string` | **Required**. def: active |

#### Verify email

```http
PATCH /api/user/verify-email
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email |
| `verification_token` | `number` | **Required**. Your verification OTP sent to your email |

#### Resend verification email

```http
PATCH /api/user/resend-verification-token
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email |

#### Login

```http
POST /api/user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Your email |
| `password`      | `string` | **Required**. Your password plaintext |

#### Forgot password

```http
POST /api/user/forgot-password
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Your email |

#### Reset password

```http
PATCH /api/user/reset-password
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Your email |
| `password`      | `string` | **Required**. New password |
| `password_reset_token`      | `number` | **Required**. Reset token sent in email. |
| `Authorization`      | `string` | **Required**. Bearer token received from /forgot-password |

#### Get profile

```http
GET /api/user/get-profile/:email
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Your email |
| `name`      | `string` | New name |
| `phone`      | `string` | New phone |
| `type`      | `string` | New account type |
| `Authorization`      | `string` | **Required**. Bearer token received from /login |

#### Update profile

```http
PUT /api/user/update-profile
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Your email |
| `Authorization`      | `string` | **Required**. Bearer token received from /login |

