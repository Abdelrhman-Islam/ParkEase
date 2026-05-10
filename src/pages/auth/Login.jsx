import React, { useState } from 'react';
import Cookies from 'js-cookie'; // تأكد من عمل npm install js-cookie
import '../../layouts/auth/Form.css';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const Auth = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async () => {
        if (!credentials.email || !credentials.password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const res = await api.post('/login', credentials);
            
            // تخزين التوكن في كوكي (صلاحية 7 أيام)
            const token = res.data.access_token || res.data.token;
            Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
            
            // بيانات اليوزر العادية ممكن تسيبها في localStorage عادي للعرض فقط
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            navigate('/garages');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Incorrect email or password");
        }
    };

    return (
        <div className="page-shell">
            <Navbar/>
            <div className="container active">
                <h1>Welcome Back</h1>
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
                <button className="main-btn" onClick={handleLogin}>Sign In</button>
                <p className="switch">
                    Don't have an account? <span onClick={() => navigate('/register')}> Sign Up</span>
                </p>
            </div>
        </div>
    );
};

export default Auth;