import React from "react";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
    const isAuth = Cookies.get('token');
    return(
    <>
        
        <header className="topbar">
            <div className="brand">
            <span className="brand-icon">
                <img src="/car_fixed_transparent.png" alt="Logo" className="brand-icon-image" />
            </span>
            <Link to={"/"} className="brand-name">ParkEase</Link>
            </div>

            <nav className="auth-actions">
                {isAuth ? (
                    <>
                        <Link to="/my-bookings" className="sign-in">My Bookings</Link>
                        <Link to="/add-vehicle" className="sign-in">Add Vehicle</Link>

                        <button onClick={() => { Cookies.remove('token'); window.location.href='/'; }} className="sign-up">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="sign-in">Sign In</Link>
                        <Link to="/register" className="sign-up">Sign Up</Link>
                    </>
                )}
            </nav>
        </header>
    </>
    )
}


export default Navbar;