import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../layouts/Booking.css';
import Navbar from '../components/Navbar';

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // استخراج الداتا المبعوتة من الـ GarageMap
    const { spot, times: incomingTimes } = location.state || {};
    
    // =========================
    // Helpers
    // =========================
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const formatTime = (date) => {
        return date.toTimeString().slice(0, 5);
    };

    // =========================
    // State Initialization
    // =========================
    // لو الـ times جاية جاهزة من الخريطة نستخدمها فوراً، وإلا نحسب الديفولت
    const [times, setTimes] = useState(() => {
        if (incomingTimes) return incomingTimes;

        const now = new Date();
        const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
        return {
            date: formatDate(now),
            start: formatTime(now),
            end: formatTime(oneHourLater)
        };
    });

    // =========================
    // Safety Redirect
    // =========================
    useEffect(() => {
        if (!spot) {
            // لو مفيش مكان محجوز نرجعه للخريطة مش للفورم النهائي
            navigate('/garages'); 
        }
    }, [spot, navigate]);

    const hourlyRate = spot?.garage?.price || 15;

    // =========================
    // Calculations
    // =========================
    const calculateDuration = () => {
        if (!times.date || !times.start || !times.end) return 0;

        const start = new Date(`${times.date}T${times.start}`);
        const end = new Date(`${times.date}T${times.end}`);

        // حساب فرق التوقيت بالساعات
        const diff = (end - start) / (1000 * 60 * 60);
        return diff > 0 ? diff : 0;
    };

    const duration = calculateDuration();
    const total = duration * hourlyRate;

    // =========================
    // Navigation to Next Step
    // =========================
    const handleNext = () => {
        navigate('/vehicle-form', {
            state: {
                spot,
                times,
                total
            }
        });
    };

    return (
        <>
        <Navbar/>
        <div className="booking-page">
            <div className="booking-container">
                
                {/* LEFT SIDE: Inputs */}
                <div className="booking-left">
                    <button
                        className="back-btn"
                        onClick={() => navigate(-1)}
                    >
                        ← Back to Garage
                    </button>

                    <h1 className="spot-title">
                        Spot {spot?.name || 'A12'}
                    </h1>

                    <p className="spot-level">
                        Level L{spot?.floor || 1}
                    </p>

                    {/* DATE INPUT */}
                    <div className="input-group">
                        <label>Date</label>
                        <div className="input-wrapper">
                            <input
                                type="date"
                                value={times.date}
                                min={formatDate(new Date())}
                                onChange={(e) => setTimes({ ...times, date: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* TIME INPUTS */}
                    <div className="time-grid">
                        <div className="input-group">
                            <label>Start Time</label>
                            <div className="input-wrapper">
                                <input
                                    type="time"
                                    value={times.start}
                                    onChange={(e) => setTimes({ ...times, start: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>End Time</label>
                            <div className="input-wrapper">
                                <input
                                    type="time"
                                    value={times.end}
                                    min={times.start}
                                    onChange={(e) => setTimes({ ...times, end: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Pricing Card */}
                <div className="pricing-card">
                    <h2>Pricing Summary</h2>

                    <div className="summary-row">
                        <span>Hourly Rate</span>
                        <strong>${hourlyRate}/hr</strong>
                    </div>

                    <div className="summary-row">
                        <span>Duration</span>
                        <strong>{duration.toFixed(1)} hours</strong>
                    </div>

                    <div className="divider"></div>

                    <div className="summary-total">
                        <span>Total</span>
                        <h1>${total.toFixed(2)}</h1>
                    </div>
                </div>

            </div>

            {/* CONTINUE BUTTON */}
            <button
                className="next-step-btn"
                onClick={handleNext}
                disabled={duration <= 0}
            >
                Continue to Vehicle Details
            </button>
        </div>
        </>
    );
};

export default Booking;