import React, { useState } from 'react';
import '../../layouts/auth/Form.css';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const Auth = () => {
    const navigate = useNavigate();
    
    // 1. تظبيط الـ State للـ Inputs
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async () => {
        // تأكد إن البيانات مش فاضية قبل ما تبعت
        if (!credentials.email || !credentials.password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            // نبعت للـ Base URL اللي عملناه [cite: 2026-05-10]
            const res = await api.post('/login', credentials); 
            
            // تسيف التوكن وتدخل [cite: 2026-05-10]
            localStorage.setItem('token', res.data.token);
            navigate('/garages');
        } catch (err) {
            console.error(err);
            alert("Incorrect email or password");
        }
    };

    return (
        <div className="page-shell">
            <Navbar/>

            <div className="container active">
                <h1>Welcome Back</h1>
                <p>Sign in to your ParkEase account</p>
                
                {/* 2. ربط الـ Inputs بالـ State */}
                <input 
                    type="email" 
                    placeholder="your@email.com" 
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />

                {/* 3. ربط الزرار بالـ Function */}
                <button className="main-btn" onClick={handleLogin}>
                    Sign In
                </button>

                <p className="switch">
                    Don't have an account? 
                    <span onClick={() => navigate('/register')}> Sign Up</span>
                </p>
            </div>
        </div>
    );
};

export default Auth;