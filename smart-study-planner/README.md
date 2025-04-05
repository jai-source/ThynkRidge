# Smart Study Planner

An AI-powered study planning application that helps students organize their study sessions, track progress, and receive personalized recommendations.

## Features

- User Authentication (Sign up, Login, Logout)
- Study Plan Management (Create, Read, Update, Delete)
- Study Session Scheduling
- Study Material Management
- AI-Powered Study Recommendations
- Progress Tracking

## Tech Stack

- Frontend:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - NextAuth.js

- Backend:
  - Next.js API Routes
  - SQLite with Sequelize ORM
  - bcryptjs for password hashing

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smart-study-planner.git
   cd smart-study-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   DATABASE_URL=sqlite://./database.sqlite
   ```

4. Initialize the database:
   ```bash
   npm run db:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
smart-study-planner/
├── src/
│   ├── components/         # React components
│   ├── database/          # Database models and configuration
│   ├── pages/             # Next.js pages and API routes
│   ├── styles/            # Global styles
│   └── types/             # TypeScript type definitions
├── .env.local             # Environment variables
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/session` - Get current session

### Study Plans
- `GET /api/study-plans` - Get all study plans
- `POST /api/study-plans` - Create a new study plan
- `GET /api/study-plans/[id]` - Get a specific study plan
- `PUT /api/study-plans/[id]` - Update a study plan
- `DELETE /api/study-plans/[id]` - Delete a study plan

### Study Sessions
- `GET /api/study-sessions` - Get all study sessions for a plan
- `POST /api/study-sessions` - Create a new study session

### Study Materials
- `GET /api/study-materials` - Get all study materials for a plan
- `POST /api/study-materials` - Create a new study material

### Study Recommendations
- `GET /api/study-recommendations` - Get all recommendations for a plan
- `POST /api/study-recommendations` - Create a new recommendation
- `PUT /api/study-recommendations` - Update a recommendation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 