import { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextInput, PasswordInput, Button, Paper, Title, Text } from "@mantine/core";
import axios from "axios";
import { BACKEND_URL } from "@/constants";
import Cookies from "js-cookie";

const LoginForm = () => {
    const { user,setUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
const login = async(email:string,password:string)=>{
try {
    //TODO: Make a POST request to the backend URL: ${BACKEND_URL}/user/login.
    //Store the content of request in a 'res' constant which is used further in this code
    setUser({name:res.data.name,email:res.data.email,id:res.data.id})
    Cookies.set('token',res.data.token);
} catch (error) {
    console.error(error);
    throw new Error("Login failed")
}
}
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await login(email, password);
            // console.log()
            navigate("/"); // Redirect to the canvas
        } catch {
            setError("Invalid credentials. Please try again.");
        }
    };
useEffect(()=>{
    if(user){
        navigate("/");
    }
},[user])
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f9fafb",
            }}
        >
            <Paper
                radius="md"
                p="xl"
                withBorder
                style={{
                    maxWidth: "400px",
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: "white",
                }}
            >
                <Title order={2} mb="lg">
                    Login
                </Title>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        mb="md"
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        mb="md"
                    />
                    {error && (
                        <Text color="red" size="sm" mb="sm">
                            {error}
                        </Text>
                    )}
                    <Button type="submit" fullWidth>
                        Login
                    </Button>
                </form>
                <Text size="sm" mt="md">
                    Don't have an account?{" "}
                    <a href="/signup" style={{ color: "#1a73e8", textDecoration: "none" }}>
                        Sign Up
                    </a>
                </Text>
            </Paper>
        </div>
    );
};

export default LoginForm;
