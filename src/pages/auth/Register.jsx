import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../api/axios'; 

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '', 
        phone: ''
    });

    const handleRegister = async () => {
        if(!formData.email || !formData.password) {
            alert("Missing Data");
            return;
        }

        try {
            const res = await api.post('/register', formData);
            
            // سحب التوكن أياً كان مسماه من الباك إند
            const token = res.data.token || res.data.access_token;
            
            Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            navigate('/garages');
        } catch (err) {
            console.error(err.response?.data);
            alert(err.response?.data?.message || "Registration error");
        }
    };

    return (
        <div className="page-shell">
            <Navbar/>
            <div className="container active">
                <h1>Create Account</h1>
                <input 
                    type="text" 
                    placeholder="Name" 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setFormData({...formData, password: e.target.value, password_confirmation: e.target.value})} 
                />
                <input 
                    type="text" 
                    placeholder="Phone" 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                />
                <button className="main-btn" onClick={handleRegister}>Sign Up</button>
            </div>
        </div>
    );
};

export default Register;