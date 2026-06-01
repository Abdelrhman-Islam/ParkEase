import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // نقرأ القيمة المبدئية مباشرة من الـ localStorage عشان ميتأخرش في أول تحميل
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        // فانكشن التشييك وتحديث الـ State
        const verifyAuth = () => {
            setIsAuth(!!localStorage.getItem('token'));
        };

        // 1. تشييك لما المسار يتغير (اليوزر يتنقل بين الصفحات)
        verifyAuth();

        // 2. الاستماع لأي حدث تغيير في الـ Auth (لو عمل login في صفحة تانية)
        window.addEventListener('authChange', verifyAuth);
        window.addEventListener('storage', verifyAuth); // تحسباً لو التغيير حصل في التاب تانية

        return () => {
            window.removeEventListener('authChange', verifyAuth);
            window.removeEventListener('storage', verifyAuth);
        };
    }, [location]); // هيعيد التشييك الذاتي مع كل نقلة صفحة

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuth(false);
        
        // نضرب الإشارة المخصصة عشان لو فيه مكونات تانية مستمعة
        window.dispatchEvent(new Event('authChange'));
        
        navigate('/');
    };

    return (
        <header className="topbar">
            <div className="brand">
                <span className="brand-icon">
                    <img src="/car_fixed_transparent.png" alt="Logo" className="brand-icon-image" />
                </span>
                <Link to="/" className="brand-name">ParkEase</Link>
            </div>

            <nav className="auth-actions">
                {/* الاعتماد هنا على الـ State اللي اسمها isAuth بشكل مباشر */}
                {isAuth ? (
                    <>
                        <Link to="/my-bookings" className="sign-in">My Bookings</Link>
                        <Link to="/add-vehicle" className="sign-in">Add Vehicles</Link>

                        <button onClick={handleLogout} className="sign-up">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="sign-in">Sign In</Link>
                        <Link to="/register" className="sign-up">Sign Up</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Navbar;