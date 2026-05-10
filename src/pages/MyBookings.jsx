import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMyData = async () => {
            try {
                const res = await api.get('/my-bookings');
                setBookings(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        getMyData();
    }, []);

    const handleCancel = async (id) => {
        if (window.confirm("عايز تلغي الحجز ده بجد؟")) {
            await api.delete(`/bookings/cancel/${id}`);
            setBookings(bookings.filter(b => b.id !== id));
        }
    };

    return (
        <>
        <Navbar/>
        <div className="bookings-container">
            <h2>حجوزاتي</h2>
            {loading ? <p>لحظة واحدة بنجيب بياناتك...</p> : (
                <div className="bookings-list">
                    {bookings.map(b => (
                        <div key={b.id} className="booking-card">
                            <p>مكان: {b.spot?.name}</p>
                            <p>الدور: {b.spot?.floor}</p>
                            <p>من: {new Date(b.start_time).toLocaleString()}</p>
                            <button onClick={() => handleCancel(b.id)}>إلغاء الحجز</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    );
};


export default MyBookings;