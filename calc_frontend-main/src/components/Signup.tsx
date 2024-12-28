import { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextInput, PasswordInput, Button, Paper, Title, Text } from "@mantine/core";

import axios from "axios";
import { BACKEND_URL } from "@/constants";

const SignupForm = () => {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const signup = async(email:string,password:string,name:string)=>{
        try {
           await axios.post(`${BACKEND_URL}/user/signup`,{email,password,name},);
            // Cookies.set('token',res.data.token);
        } catch (error) {
            console.error(error);
            throw new Error("Signup failed")
        }
        }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await signup( email, password,name);
            alert("Signup successful!");
            navigate("/"); // Redirect to canvas after successful signup
        } catch {
            setError("Signup failed. Please try again.");
        }
    };
useEffect(()=>{
    if(user){
        navigate("/")
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
                    Sign Up
                </Title>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        mb="md"
                    />
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
                        Sign Up
                    </Button>
                </form>
                <Text size="sm" mt="md">
                    Already have an account?{" "}
                    <a href="/login" style={{ color: "#1a73e8", textDecoration: "none" }}>
                        Log In
                    </a>
                </Text>
            </Paper>
        </div>
    );
};

export default SignupForm;
