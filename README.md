# BJ - Competitive Programming Site

## Overview
**BJ** is a web platform designed for competitive programming. It provides users with a space to solve algorithmic challenges, track their progress, and compete with others. The platform is built using **Nest.js** on the backend and **Vue.js** on the frontend, offering a robust and dynamic user experience.

## Features
- **User Registration and Authentication**: Secure login and registration system.
- **Problem Solving**: A list of programming challenges for users to solve.
- **Submissions**: Users can submit code solutions and get immediate feedback.
- **Leaderboard**: A real-time leaderboard that ranks users based on their performance.
- **Progress Tracking**: Track your progress across various problem categories.

## Technologies
### Backend:
- **Nest.js**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript**: Used for writing type-safe backend code.
- **PostgreSQL**: A relational database for managing users, problems, and submissions.
- **JWT**: For secure user authentication and session management.

### Frontend:
- **Vue.js**: A progressive framework for building the user interface.
- **TypeScript**: Ensures better type safety and maintainability.
- **Vue Router**: For managing page navigation.
- **Pinia**: State management for handling global state.
- **Axios**: For making API requests to the backend.

## Setup and Installation
### Prerequisites
- **Node.js** (v14 or later)
- **PostgreSQL** (v12 or later)

### Installation Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/llstyle/bj.git
   cd bj
   ```

2. **Install dependencies**:
   - Backend:
     ```bash
     cd backend
     npm install
     ```

   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Setup environment variables**:
   - Copy the `.env.example` file in both `backend` and `frontend` directories and configure the database, JWT secret, and other environment variables.

4. **Run PostgreSQL**:
   Ensure your PostgreSQL server is running, and the database is properly set up.

5. **Run the backend server**:
   ```bash
   cd backend
   npm run start:dev
   ```

6. **Run the frontend server**:
   ```bash
   cd frontend
   npm run serve
   ```

7. **Access the application**:
   Open your browser and go to `http://localhost:3000` to access the site.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Let me know if you'd like any changes!