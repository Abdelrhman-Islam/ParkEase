import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import '../layouts/MyBookings.css';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('upcoming'); // خليناها تبدأ على الـ upcoming كـ UX أفضل لليوزر عشان يشوف حجزه النشط أول ما يفتح

    useEffect(() => {
        const getMyData = async () => {
            try {
                const res = await api.get('/my-bookings');
                setBookings(res.data ?? []);
            } catch (err) {
                console.error("Failed to fetch bookings:", err);
            } finally {
                setLoading(false);
            }
        };

        getMyData();
    }, []);

    const upcoming = bookings.filter(b => b.status === 'pending');
    const history = bookings.filter(b => b.status !== 'pending');

    // دالة فورمات آمنة تضمن عرض الوقت كما هو من السيرفر بدون تأثير الـ Timezone
    const formatTime = (timeString) => {
        if (!timeString) return 'No Time';
        
        try {
            // لو السيرفر باعت تاريخ كامل ISO string
            if (timeString.includes('T')) {
                const timePart = timeString.split('T')[1];
                const [hours, minutes] = timePart.split(':');
                return formatTo12Hour(hours, minutes);
            }
            
            // لو السيرفر باعت وقت فقط "HH:MM:SS"
            const [hours, minutes] = timeString.split(':');
            return formatTo12Hour(hours, minutes);
        } catch (e) {
            return timeString; // Fallback في حالة أي شكل غير متوقع
        }
    };

    // دالة مساعدة لتحويل الوقت لنظام 12 ساعة مع AM/PM
    const formatTo12Hour = (hours, minutes) => {
        let hr = parseInt(hours, 10);
        const ampm = hr >= 12 ? 'PM' : 'AM';
        hr = hr % 12;
        hr = hr ? hr : 12; // الساعة 00 تتحول لـ 12
        return `${String(hr).padStart(2, '0')}:${minutes} ${ampm}`;
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
                        className={`tab ${tab === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setTab('upcoming')}
                    >
                        Upcoming ({upcoming.length})
                    </button>

                    <button
                        className={`tab ${tab === 'history' ? 'active' : ''}`}
                        onClick={() => setTab('history')}
                    >
                        History ({history.length})
                    </button>
                </div>

                {loading ? (
                    <p className="loading">Loading...</p>
                ) : (
                    <>
                        {/* Upcoming Tab */}
                        {tab === 'upcoming' && (
                            <div className="tab-content active">
                                {upcoming.length > 0 ? (
                                    upcoming.map((b) => (
                                        <div className="card" key={b.id}>
                                            <div className="card-header">
                                                <h3>Spot {b.spot?.name}</h3>
                                                <span className="status active-status">Active</span>
                                            </div>
                                            <p>Level L{b.spot?.floor}</p>
                                            <div className="info">
                                                <span>📅 {b.booking_date}</span>
                                                <span>⏰ {formatTime(b.start_time)}</span>
                                                <span>📍 {b.vehicle?.plate_number || b.plate_number}</span>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="price">
                                                ${b.spot?.garage?.price || '15.00'}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="empty-text">No upcoming bookings</p>
                                )}
                            </div>
                        )}

                        {/* History Tab */}
                        {tab === 'history' && (
                            <div className="tab-content active">
                                {history.length > 0 ? (
                                    history.map((b) => (
                                        <div className="card" key={b.id}>
                                            <div className="card-header">
                                                <h3>Spot {b.spot?.name}</h3>
                                                <span className={`status ${b.status === 'cancelled' ? 'cancelled' : 'completed'}`}>
                                                    {b.status}
                                                </span>
                                            </div>
                                            <p>Level L{b.spot?.floor}</p>
                                            <div className="info">
                                                <span>📅 {b.booking_date}</span>
                                                <span>⏰ {formatTime(b.start_time)}</span>
                                                <span>📍 {b.vehicle?.plate_number || b.plate_number}</span>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="price">
                                                ${b.spot?.garage?.price || '20.00'}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="empty-text">No booking history</p>
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