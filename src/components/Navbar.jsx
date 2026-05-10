import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
    <>
        
        <header className="topbar">
            <div className="brand">
            <span className="brand-icon">
                <img src="../../public/car_fixed_transparent.png" alt="Logo" className="brand-icon-image" />
            </span>
            <Link to={"/"} className="brand-name">ParkEase</Link>
            </div>

            <nav className="auth-actions">
            <Link to="/login" className="sign-in">Sign In</Link>
            <Link to="/register" className="sign-up">Sign Up</Link>
            </nav>
        </header>
    </>
    )
}

export default Navbar;