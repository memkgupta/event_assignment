import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import "@mantine/core/styles.css";
import LoginForm from "./components/Login";
import SignupForm from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "@/screens/home";
import { MantineProvider } from "@mantine/core";

const paths = [
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    { path: "/login", element: <LoginForm /> },
    { path: "/signup", element: <SignupForm /> },
];

const BrowserRouter = createBrowserRouter(paths);

const App = () => {
    return (
        <AuthProvider>
            <MantineProvider>
                <RouterProvider router={BrowserRouter} />
            </MantineProvider>
        </AuthProvider>
    );
};

export default App;
