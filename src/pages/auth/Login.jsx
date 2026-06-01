import React, { useState } from 'react';
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

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        // منع الفورم من عمل full reload للصفحة
        if (e) e.preventDefault();

        if (!credentials.email || !credentials.password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);

            const res = await api.post('/login', credentials);

            console.log(res.data);

            const token = res.data.access_token;
            const user = res.data.user;

            // 1. حفظ البيانات في الـ LocalStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // 2. تحديث هيدر الـ Axios للريكويستات الجاية
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // 3. السطر السحري: إيقاظ الـ Navbar لتحديث حالته فوراً
            window.dispatchEvent(new Event('authChange'));

            // 4. توجيه اليوزر لصفحة الجراجات
            navigate('/garages');

        } catch (err) {
            console.error(err);
            alert(
                err.response?.data?.message ||
                'Login failed. Please check your credentials.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-shell">
            <Navbar />

            <div className="container active">
                <h1>Welcome Back</h1>

                {/* تحويل المكون إلى فورم حقيقي لدعم ميزات المتصفح والـ Auto-fill */}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={credentials.email}
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                email: e.target.value
                            })
                        }
                        autoComplete="email"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                password: e.target.value
                            })
                        }
                        autoComplete="current-password"
                        required
                    />

                    <button
                        type="submit"
                        className="main-btn"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="switch">
                    Don't have an account?{' '}
                    <span onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Auth;