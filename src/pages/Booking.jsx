import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../layouts/Booking.css';

const Booking = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { spot } = location.state || {};

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
    // Default Time Values
    // =========================

    const now = new Date();

    const oneHourLater = new Date(
        now.getTime() + 60 * 60 * 1000
    );

    // =========================
    // State
    // =========================

    const [times, setTimes] = useState({
        date: formatDate(now),
        start: formatTime(now),
        end: formatTime(oneHourLater)
    });

    // =========================
    // Redirect if no spot
    // =========================

    useEffect(() => {
        if (!spot) {
            navigate('/garage');
        }
    }, [spot, navigate]);

    // =========================
    // Calculate Duration
    // =========================

    const calculateHours = () => {

        const start = new Date(
            `2000-01-01T${times.start}`
        );

        const end = new Date(
            `2000-01-01T${times.end}`
        );

        const diff =
            (end - start) / (1000 * 60 * 60);

        return diff > 0 ? diff : 0;
    };

    // =========================
    // Pricing
    // =========================

    const hourlyRate = 5;

    const duration = calculateHours();

    const total = duration * hourlyRate;

    // =========================
    // Continue
    // =========================

    const handleNext = () => {

        if (!times.date ||
            !times.start ||
            !times.end) {
            return;
        }

        navigate('/vehicle-form', {
            state: {
                spot,
                times
            }
        });
    };

    return (
        <div className="booking-page">

            <div className="booking-container">

                {/* LEFT SIDE */}

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

                    {/* DATE */}

                    <div className="input-group">

                        <label>Date</label>

                        <div className="input-wrapper">

                            <input
                                type="date"
                                value={times.date}
                                min={formatDate(new Date())}
                                onChange={(e) =>
                                    setTimes({
                                        ...times,
                                        date: e.target.value
                                    })
                                }
                            />

                        </div>

                    </div>

                    {/* TIMES */}

                    <div className="time-grid">

                        <div className="input-group">

                            <label>Start Time</label>

                            <div className="input-wrapper">

                                <input
                                    type="time"
                                    value={times.start}
                                    onChange={(e) =>
                                        setTimes({
                                            ...times,
                                            start: e.target.value
                                        })
                                    }
                                />

                            </div>

                        </div>

                        <div className="input-group">

                            <label>End Time</label>

                            <div className="input-wrapper">

                                <input
                                    type="time"
                                    value={times.end}
                                    onChange={(e) =>
                                        setTimes({
                                            ...times,
                                            end: e.target.value
                                        })
                                    }
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="pricing-card">

                    <h2>Pricing Summary</h2>

                    <div className="summary-row">
                        <span>Hourly Rate</span>

                        <strong>
                            ${hourlyRate.toFixed(2)}/hr
                        </strong>
                    </div>

                    <div className="summary-row">

                        <span>Duration</span>

                        <strong>
                            {duration.toFixed(1)} hours
                        </strong>

                    </div>

                    <div className="divider"></div>

                    <div className="summary-total">

                        <span>Total</span>

                        <h1>
                            ${total.toFixed(2)}
                        </h1>

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
    );
};

export default Booking;