// SignIn.jsx
import React, { useEffect } from "react";
import "./login.css";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const SignIn = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/upload");
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const handleEmailPasswordLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/upload");
            })
            .catch((error) => {
                alert("Invalid email or password.");
            });
    };

    return (
        <div className="signin-container">
            <div className="signin-card">
                <h2 className="signin-title">Welcome Back</h2>
                <form onSubmit={handleEmailPasswordLogin} className="signin-form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="signin-button">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
