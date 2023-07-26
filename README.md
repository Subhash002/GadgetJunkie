# GadgetJunkie MERN Stack eCommerce App

Welcome to the GadgetJunkie project! This is a full-fledged eCommerce shop built using the MERN stack (MongoDB, Express, React, and Node.js) along with Redux Toolkit for state management. We will start building this app from scratch, guiding you through setting up the server, modeling data, creating a MongoDB database, seeding data, creating the user interface, managing state with Redux, implementing authentication using JWT, integrating payment with PayPal, and much more. This site is live on https://gadgetjunkie.onrender.com and deployment is done with with the help of __render__.


__Check out the project showcase video [here](https://www.youtube.com/watch?v=your_video_id). Click the link to watch the video and get a glimpse of the project in action.__

Admin User Creds - anwesh@gmail.com / 1234

## Features

The GadgetJunkie platform that we will be building will include the following features:

- Full-featured shopping cart with quantity
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Custom database seeder script

## Tech Stack

The GadgetJunkie app is built using the following technologies:

### Backend

- Node.js with Express as the server framework
- MongoDB for the database with Mongoose as the ODM
- JWT authentication (JSON web tokens) with HTTP-Only cookie
- bcryptjs for password hashing
- Multer for handling file uploads
- Colors for console log styling

### Frontend

- React with functional components & hooks
- React router for client-side routing
- React-Bootstrap UI library
- Redux Toolkit for state management
- Axios for handling HTTP requests
- @paypal/react-paypal-js for PayPal integration
- Various testing libraries for testing components

## Getting Started

## Steps to Set Up the Project

1. **Clone the repository:**

   ```
   git clone <repository_url>
   ```

2. **Set up the environment variables:**

   Make sure to set up the required environment variables for your backend and frontend.

3. **Set up the backend server using Node.js and MongoDB:**

   Set up your backend server using Node.js and MongoDB. Make sure you have the necessary configurations in place.

4. **Install frontend dependencies using npm:**

   ```
   cd frontend
   npm install
   ```

5. **Install backend dependencies:**

   ```
   npm install
   ```

6. **Run the application:**

   Use the following command to run both the React app and the server concurrently:

   ```
   npm run dev
   ```

   This command will start the development server for both the frontend and backend, and you can access the application in your browser.

Happy coding! 🚀

## Folder Structure of the Project

The project's folder structure is organized as follows:

Project Root/
- GadgetJunkie/
  - backend/
    - controllers/
    - middlewares/
    - models/
    - routes/
    - utils/
  - frontend/
    - public/
    - src/
      - actions/
      - components/
      - constants/
      - reducers/
      - screens/
      - store/
  - package.json
  - README.md
  - .env



The `backend` directory contains server-related files, routes, models, middleware, and utility functions. The `frontend` directory contains the React frontend application with folders for actions, components, constants, reducers, screens, and the global store.

## Backend Setup

To set up the backend:

1. Install the necessary dependencies using npm:

```bash
cd backend
npm install
```
Create a .env file in the backend folder with the following environment variables:
dotenv
Copy code
PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
Replace your_mongodb_uri_here with your MongoDB connection string and your_jwt_secret_here with a secret key for JWT authentication.

Seed the initial data into the MongoDB database:

Copy code
```bash
npm run data:import
Start the backend server:
```
Copy code
```bash
npm start
```
The backend server will run on port 5000 by default. You can access the API endpoints at http://localhost:5000/api.

Frontend Setup
To set up the frontend:

Install the necessary dependencies using npm:
bash
Copy code
```bash
cd frontend
npm install
```
Start the frontend development server:
bash
Copy code
```bash
npm start
```
The frontend development server will run on port 3000 by default. You can access the app at http://localhost:3000/.


Libraries Used
The following libraries are used in the backend and frontend respectively:

**Backend:**
- `bcryptjs: "^2.4.3"`
- `colors: "^1.4.0"`
- `cookie-parser: "^1.4.6"`
- `express: "^4.18.2"`
- `jsonwebtoken: "^9.0.1"`
- `mongoose: "^7.3.4"`
- `multer: "^1.4.5-lts.1"`

**Frontend:**
- `@paypal/react-paypal-js: "^8.1.0"`
- `@reduxjs/toolkit: "^1.9.5"`
- `@testing-library/jest-dom: "^5.16.5"`
- `@testing-library/react: "^13.4.0"`
- `@testing-library/user-event: "^13.5.0"`
- `axios: "^1.4.0"`
- `bootstrap: "^5.3.0"`
- `mernapp: "file:.."` (Assuming it's a local package dependency)
- `react: "^18.2.0"`
- `react-bootstrap: "^2.8.0"`
- `react-dom: "^18.2.0"`
- `react-helmet-async: "^1.3.0"`
- `react-icons: "^4.10.1"`
- `react-redux: "^8.1.1"`
- `react-router-bootstrap: "^0.26.2"`
- `react-router-dom: "^6.14.1"`
- `react-scripts: "5.0.1"`
- `react-spinners: "^0.13.8"`
- `react-toastify: "^9.1.3"`
- `web-vitals: "^2.1.4"`

Environment Variables
The application uses environment variables for configuration. Make sure to set the required environment variables in a .env file in the backend folder (as mentioned in the Backend Setup section).

Deployment
For deployment, follow the necessary steps based on your hosting platform. Ensure that the backend and frontend are deployed separately.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Thank you for choosing GadgetJunkie MERN Stack eCommerce App. We hope you enjoy building and using this powerful eCommerce platform! If you have any questions or need assistance, please refer to the documentation or reach out to the community for support.
