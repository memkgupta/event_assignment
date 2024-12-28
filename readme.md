# Contributing to cAlc

This document outlines the tasks for contributing to the cAlc project.

## Frontend Tasks

**1. Frontend Task 1: Make POST Request to Login Endpoint**

* **File:** `calc_frontend-main/src/components/Login.tsx` 
    - Use `axios` to make a POST request to the backend URL: `${BACKEND_URL}/user/login`.
    - Store the response from the API call in a constant (e.g., `res`) for further use within the component.

**2. Frontend Task 2: Make POST Request to Calculation Endpoint**

* **File:** `calc_frontend-main/src/screens/home/index.tsx`
    - Use `axios` to make a POST request to the backend URL: `${BACKEND_URL}/ai/calculate`. 
    - Include the following in the request:
        - `image`: The canvas content converted to a base64 encoded image data URL (`canvas.toDataURL('image/png')`).
        - `dict`: The current dictionary of variables (`dictOfVars`).
    - Include an `Authorization` header in the request, setting its value to `Bearer ${cookie}`.
    - Store the response from the API call in a constant (e.g., `response`) for further use within the component.

## Backend Tasks

**3. Backend Task 1: Implement Authentication Token Middleware**

* **File:** `ai_calc_backend-main/router/user.router.js`
    - Import the necessary authentication token from `auth.middleware.js`
    - If the token is invalid or missing, return an appropriate error response.
    - Apply this middleware to the `/me` and `/update` routes.
      
**4. Backend Task 2: Implement Login Functionality**

* **File:** `ai_calc_backend-main/controllers/user.controller.js`
    - Define a User model with an email property and a password property that is hashed using a secure hashing algorithm like bcrypt.
    - Implement a function to find a user by their email address. This function should query the database for a user with the provided email address and return the user object if found.
    - Implement a function to compare a provided password with a hashed password. This function should use a library like bcrypt to compare the two strings and return true if they match, and false otherwise.
    - Implement a function to generate a JSON Web Token (JWT). This function should take the user ID as input and generate a JWT that is signed with a secret key and has an expiration time.
    - In the login function, handle any potential errors that may occur during the login process, such as errors connecting to the database or errors hashing passwords.
    - In the login function, return a meaningful error message to the client if the login fails, such as "Invalid email or password".
    - In the login function, return a success message and the JWT token to the client if the login is successful. The response should also include the user's email address, name, and ID.
  
This README provides a clear and concise guide for contributors, outlining the tasks for both frontend and backend development.
