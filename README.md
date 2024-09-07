
# Mana Vault - MTG Database Backend

## Overview

**Mana Vault** is a backend application built for managing Magic: The Gathering (MTG) card data. It provides powerful APIs for user authentication, card search, deck building, and personal collection management. The project is designed using **Node.js**, **Express**, **Sequelize (PostgreSQL)**, and **TypeScript**, and follows **Domain Driven Design (DDD)** principles.

## Key Features

- **User Authentication**: Secure JWT-based authentication with sign-up, login, and token generation.
- **Card Search Integration**: Seamless integration with the Scryfall API for searching Magic: The Gathering card data.
- **Deck Builder**: Allows users to create, modify, and manage their MTG decks.
- **Personal Card Collection Management**: Users can add cards to their personal collections and organize them.
- **Token-Based Authorization**: Secured access to protected routes using JWT tokens.

## Technologies Used

- **Node.js**: JavaScript runtime for building fast and scalable network applications.
- **Express.js**: Minimalist web framework for Node.js to build APIs.
- **Sequelize (PostgreSQL)**: Object Relational Mapper (ORM) for handling database operations with PostgreSQL.
- **TypeScript**: Adds static typing to JavaScript, enhancing code quality and maintainability.
- **Scryfall API**: External API used to fetch comprehensive MTG card data.

## Project Structure

Following **Domain Driven Design (DDD)**, the backend is organized into clearly defined domains:

```
src/
├── application/        # Application logic, commands, and use cases
├── domain/             # Core business logic, entities, and services
├── infrastructure/     # Database and external API integrations
├── interfaces/         # HTTP controllers, routes, and middleware
├── shared/             # Shared utilities and types
├── tests/              # Unit and integration tests
└── server.ts           # Application entry point
```

## Prerequisites

To run this project locally, you will need the following tools installed on your system:

- **Node.js**: v16.x or higher
- **PostgreSQL**: v13.x or higher
- **NPM**: v8.x or higher (or **Yarn** as an alternative)

## Environment Variables

A `.env` file is required to configure environment variables for the application:

```
# Database settings
DB_HOST=localhost
DB_PORT=5432
DB_NAME=manavault
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Secret
JWT_SECRET=your_jwt_secret

# Scryfall API (optional)
SCRYFALL_API_URL=https://api.scryfall.com

# Server settings
PORT=3000
```

## Setup Instructions

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/manavault-backend.git
cd manavault-backend
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Set Up the Database**

Ensure PostgreSQL is running, and create the necessary database:

```sql
CREATE DATABASE manavault;
```

### 4. **Run Migrations**

Run Sequelize migrations to set up the database schema:

```bash
npx sequelize-cli db:migrate
```

### 5. **Run the Application**

Start the development server:

```bash
npm run dev
```

The server will start on the port specified in the `.env` file (default: `3000`).

## API Overview

### **Authentication**

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in and receive a JWT token.

### **Decks**

- `GET /api/decks`: Get all decks for the authenticated user.
- `POST /api/decks`: Create a new deck.

### **Collections**

- `GET /api/collections`: Get all cards in the user's collection.
- `POST /api/collections`: Add a card to the user's collection.

### **Card Search (Scryfall Integration)**

- `GET /api/cards`: Search for MTG cards from the Scryfall API.

## Testing

Run unit and integration tests using **Jest**:

```bash
npm run test
```

## Deployment

For production, configure the necessary environment variables and use a platform like **Heroku**, **Vercel**, or **AWS** for deployment. To build the project for production:

```bash
npm run build
```

This will compile the TypeScript files and output them to the `dist/` directory.

## License

This project is for personal use and showcases my work.
