import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx';
import Dashboard from './components/Dashboard.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        )
    },
    {
        path: "/sign-in",
        element: <SignIn />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    }
])