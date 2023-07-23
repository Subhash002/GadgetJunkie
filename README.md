```markdown
# GadgetJunkie MERN Stack eCommerce App

Welcome to the GadgetJunkie project! This is a full-fledged eCommerce shop built using the MERN stack (MongoDB, Express, React, and Node.js) along with Redux Toolkit for state management. We will start building this app from scratch, guiding you through setting up the server, modeling data, creating a MongoDB database, seeding data, creating the user interface, managing state with Redux, implementing authentication using JWT, integrating payment with PayPal, and much more.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Folder Structure](#folder-structure)
5. [Backend Setup](#backend-setup)
6. [Frontend Setup](#frontend-setup)
7. [Libraries Used](#libraries-used)
8. [Environment Variables](#environment-variables)
9. [Deployment](#deployment)
10. [License](#license)

## Features

The GadgetJunkie eCommerce platform will include the following features:

1. Full-featured shopping cart with quantity control.
2. Product reviews and ratings to help users make informed decisions.
3. Top products carousel to showcase popular items.
4. Product pagination for better user experience.
5. Product search feature to find specific items easily.
6. User profile page displaying previous orders.
7. Admin product management to add, edit, and delete products.
8. Admin user management for user access control.
9. Admin Order details page to view and manage orders.
10. Mark orders as delivered option for order status updates.
11. Seamless checkout process including shipping and payment methods.
12. PayPal and credit card integration for secure payments.
13. Custom database seeder script to populate initial data.

## Tech Stack

The GadgetJunkie app is built using the following technologies:

### Backend

- Node.js with Express as the server framework.
- MongoDB for the database with Mongoose as the ODM.
- JWT authentication for user authentication.
- bcryptjs for password hashing.
- Multer for handling file uploads.
- Colors for console log styling.

### Frontend

- React with functional components and hooks.
- React Router for client-side routing.
- React-Bootstrap for a responsive UI design.
- Redux Toolkit for global state management.
- Axios for handling HTTP requests.
- PayPal API integration for payment processing.
- Various testing libraries for testing components.

## Getting Started

To get started with the GadgetJunkie app, follow these steps:

1. Clone the repository.
2. Set up the backend server using Node.js and MongoDB.
3. Install frontend dependencies using npm.
4. Start the development server for both backend and frontend.

## Folder Structure

The project's folder structure is organized as follows:

```
GadgetJunkie/
|-- backend/
|   |-- controllers/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|   |-- utils/
|-- frontend/
|   |-- public/
|   |-- src/
|       |-- actions/
|       |-- components/
|       |-- constants/
|       |-- reducers/
|       |-- screens/
|       |-- store/
|-- package.json
|-- README.md
|-- .env (sample environment variables file)
```

The `backend` directory contains server-related files, routes, models, middleware, and utility functions. The `frontend` directory contains the React frontend application with folders for actions, components, constants, reducers, screens, and the global store.

## Backend Setup

To set up the backend:

1. Install the necessary dependencies using npm:

```bash
cd backend
npm install
```

2. Create a `.env` file in the `backend` folder with the following environment variables:

```dotenv
PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
```

Replace `your_mongodb_uri_here` with your MongoDB connection string and `your_jwt_secret_here` with a secret key for JWT authentication.

3. Seed the initial data into the MongoDB database:

```bash
npm run data:import
```

4. Start the backend server:

```bash
npm start
```

The backend server will run on port 5000 by default. You can access the API endpoints at `http://localhost:5000/api`.

## Frontend Setup

To set up the frontend:

1. Install the necessary dependencies using npm:

```bash
cd frontend
npm install
```

2. Start the frontend development server:

```bash
npm start
```

The frontend development server will run on port 3000 by default. You can access the app at `http://localhost:3000/`.

## Libraries Used

The following libraries are used in the backend and frontend respectively:

### Backend

- bcryptjs: "^2.4.3"
- colors: "^1.4.0"
- cookie-parser: "^1.4.6"
- express: "^4.18.2"
- jsonwebtoken: "^9.0.1"
- mongoose: "^7.3.4"
- multer: "^1.4.5-lts.1"

### Frontend

- @paypal/react-paypal-js: "^8.1.0"
- @reduxjs/toolkit: "^1.9.5"
- @testing-library/jest-dom: "^5.16.5"
- @testing-library/react: "^13.4.0"
- @testing-library/user-event: "^13.5.0"
- axios: "^1.4.0"
- bootstrap: "^5.3.0"
- mernapp: "file:.." (Assuming it's a local package dependency)
- react: "^18.2.0"
- react-bootstrap: "^2.8.0"
- react-dom: "^18.2.0"
- react-helmet-async: "^1.3.0"
- react-icons: "^4.10.1"
- react-redux: "^8.1.1"
- react-router-bootstrap: "^0.26.2"
- react-router-dom: "^6.14.1"
- react-scripts: "5.0.1"
- react-spinners: "^0.13.8"
- react-toastify: "^9.1.3"
- web-vitals: "^2.1.4"

## Environment Variables

The application uses environment variables for configuration. Make sure to set the required environment variables in a `.env` file in the backend folder (as mentioned in the Backend Setup section).

## Deployment

For deployment, follow the necessary steps based on your hosting platform. Ensure that the backend and frontend are deployed separately.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for choosing GadgetJunkie MERN Stack eCommerce App. We hope you enjoy building and using this powerful eCommerce platform! If you have any questions or need assistance, please refer to the documentation or reach out to the community for support. Happy coding!
```
