import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import '../layouts/MyBookings.css';

const MyBookings = () => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('history');

    useEffect(() => {

        const getMyData = async () => {

            try {

                const res = await api.get('/my-bookings');

                setBookings(res.data ?? []);
               
            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        getMyData();

    }, []);

    const upcoming = bookings.filter(
        b => b.status === 'pending'
    );

    const history = bookings.filter(
        b => b.status !== 'pending'
    );

    const formatTime = (time) => {

        if (!time) return 'No Time';

        return new Date(time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

    };

    return (
        <>
            <Navbar />

            <div className="my-bookings-container">

                <h1>My Bookings</h1>

                <p className="subtitle">
                    View and manage your parking history
                </p>

                {/* Tabs */}

                <div className="tabs">

                    <button
                        className={`tab ${
                            tab === 'upcoming' ? 'active' : ''
                        }`}
                        onClick={() => setTab('upcoming')}
                    >
                        Upcoming ({upcoming.length})
                    </button>

                    <button
                        className={`tab ${
                            tab === 'history' ? 'active' : ''
                        }`}
                        onClick={() => setTab('history')}
                    >
                        History ({history.length})
                    </button>

                </div>

                {loading ? (

                    <p className="loading">
                        Loading...
                    </p>

                ) : (

                    <>
                        {/* Upcoming */}

                        {tab === 'upcoming' && (

                            <div className="tab-content active">

                                {upcoming.length > 0 ? (

                                    upcoming.map((b) => (

                                        <div
                                            className="card"
                                            key={b.id}
                                        >

                                            <div className="card-header">

                                                <h3>
                                                    Spot {b.spot?.name}
                                                </h3>

                                                <span className="status active-status">
                                                    Active
                                                </span>

                                            </div>

                                            <p>
                                                Level L{b.spot?.floor}
                                            </p>

                                            <div className="info">

                                                <span>
                                                    📅 {b.booking_date}
                                                </span>

                                                <span>
                                                    ⏰ {formatTime(b.start_time)}
                                                </span>

                                                <span>
                                                    📍 {b.vehicle?.plate_number}
                                                </span>

                                            </div>

                                            <div className="divider"></div>

                                            <div className="price">
                                                ${b.spot?.garage?.price || '15.00'}
                                            </div>

                                        </div>

                                    ))

                                ) : (

                                    <p className="empty-text">
                                        No upcoming bookings
                                    </p>

                                )}

                            </div>

                        )}

                        {/* History */}

                        {tab === 'history' && (

                            <div className="tab-content active">

                                {history.length > 0 ? (

                                    history.map((b) => (

                                        <div
                                            className="card"
                                            key={b.id}
                                        >

                                            <div className="card-header">

                                                <h3>
                                                    Spot {b.spot?.name}
                                                </h3>

                                                <span
                                                    className={`status ${
                                                        b.status === 'cancelled'
                                                            ? 'cancelled'
                                                            : 'completed'
                                                    }`}
                                                >
                                                    {b.status}
                                                </span>

                                            </div>

                                            <p>
                                                Level L{b.spot?.floor}
                                            </p>

                                            <div className="info">

                                                <span>
                                                    📅 {b.booking_date}
                                                </span>

                                                <span>
                                                    ⏰ {formatTime(b.start_time)}
                                                </span>

                                                <span>
                                                    📍 {b.vehicle?.plate_number}
                                                </span>

                                            </div>

                                            <div className="divider"></div>

                                            <div className="price">
                                                ${b.spot?.garage?.price || '20.00'}
                                            </div>

                                        </div>

                                    ))

                                ) : (

                                    <p className="empty-text">
                                        No booking history
                                    </p>

                                )}

                            </div>

                        )}

                    </>

                )}

            </div>
        </>
    );
};

export default MyBookings;