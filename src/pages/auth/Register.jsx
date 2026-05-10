import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../api/axios'; // تأكد من المسار

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '', // ضيف ده لو الباك بطلبه
        phone: ''
    });

    const handleRegister = async () => {
        // حتة جدعنة: تأكد إن الخانات مش فاضية قبل ما تبعت
        if(!formData.email || !formData.password) {
            alert("املي البيانات يا هندسة");
            return;
        }

        try {
            // استخدمنا api اللي عملنا لها import
            const res = await api.post('/register', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/garages');
        } catch (err) {
            // عشان تعرف السبب بالظبط بص في الكونسول
            console.error(err.response?.data);
            alert(err.response?.data?.message || "خطأ في التسجيل");
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
                    // حيلة سريعة: بنخلي الـ confirmation هو نفسه الـ password عشان ننجز
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