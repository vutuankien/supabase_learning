# React & Supabase Dashboard

A modern, full-stack web application built with React, Vite, and Supabase. This project demonstrates a complete user authentication system (email/password, social logins) and a feature-rich dashboard for managing user data, styled with Tailwind CSS and Ant Design.

_(Replace this with a screenshot of your application's dashboard)_

---

## ✨ Features

- **Secure User Authentication**: Full sign-up, sign-in, and sign-out functionality.
- **Social Logins**: Integrated with Google and Facebook for easy authentication.
- **Protected Routes**: Client-side routing that protects dashboard access from unauthenticated users.
- **Interactive Dashboard**: A clean and responsive UI built with Ant Design.
- **User Management (CRUD)**:
  - **Create**: Add new users via a modal form.
  - **Read**: Display all users in a sortable, filterable table.
  - **Update**: Edit existing user information.
  - **Delete**: Remove users with a confirmation prompt.
- **Real-time Data**: Leverages Supabase's real-time capabilities to keep the UI in sync.
- **Responsive Design**: A mobile-first approach using Tailwind CSS ensures the app looks great on all devices.

---

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [React Router](https://reactrouter.com/)
- **Backend-as-a-Service**: [Supabase](https://supabase.com/) (Authentication, Postgres Database, Realtime)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), [Ant Design](https://ant.design/)
- **State Management**: React Context API

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
- A [Supabase](https://supabase.com/) account (the free tier is sufficient)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1.  Go to [supabase.com](https://supabase.com/) and create a new project.
2.  Navigate to your project's **SQL Editor**.
3.  Click **"New query"** and run the following SQL script to create the `users` table and set up Row Level Security (RLS) policies.

    ```sql
    -- Create the users table
    CREATE TABLE public.users (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      created_at timestamp with time zone NOT NULL DEFAULT now(),
      name text NULL,
      email text NULL,
      role text NULL,
      status boolean NULL,
      picture text NULL,
      CONSTRAINT users_pkey PRIMARY KEY (id)
    );

    -- Enable Row Level Security (RLS)
    ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

    -- Create policies for RLS
    -- This allows any authenticated user to perform CRUD operations.
    -- For a production app, you would want more restrictive policies.
    CREATE POLICY "Allow all access to authenticated users"
    ON public.users
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
    ```

4.  Go to your project's **Settings > API**.
5.  Find your **Project URL** and `anon` **public** key.

### 4. Configure Environment Variables

1.  In the `frontend` directory of your project, create a new file named `.env`.
2.  Copy and paste the following into the `.env` file, replacing the placeholder values with your actual Supabase credentials from the previous step.

    ```env
    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

### 5. Run the Development Server

Now you're all set! Run the following command to start the application.

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## 📂 Project Structure

```
src/
├── components/       # Reusable React components (Dashboard, SignIn, SignUp, etc.)
├── context/          # React Context for global state (AuthContext)
├── pages/            # Page components (if separating from components)
├── styles/           # Global styles and Tailwind config
├── App.jsx           # Main application component with routing setup
├── main.jsx          # Entry point of the React application
├── router.jsx        # React Router configuration
└── supabaseClient.js # Supabase client initialization
```

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

_This README was generated with the help of Gemini Code Assist._
