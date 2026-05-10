import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import '../layouts/GarageMap.css'; // تأكد إن ملف الـ CSS ده موجود

const GaragesList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // جلب رقم الدور من الـ URL (الـ Query Params)، والديفولت 1
    const queryParams = new URLSearchParams(location.search);
    const initialFloor = parseInt(queryParams.get('floor')) || 1;

    const [spots, setSpots] = useState([]);
    const [currentFloor, setCurrentFloor] = useState(initialFloor);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [loading, setLoading] = useState(true);

    // تحديث البيانات كل ما الدور يتغير
    useEffect(() => {
        fetchSpots();
        // تحديث الـ URL عشان يعكس الدور الحالي (api/garages?floor=1)
        navigate(`/garages?floor=${currentFloor}`, { replace: true });
    }, [currentFloor]);

    const fetchSpots = async () => {
        setLoading(true);
        try {
            // بنبعت رقم الدور للباك إند
            const res = await api.get(`/spots?floor=${currentFloor}`);
            setSpots(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching spots:", err);
            setLoading(false);
        }
    };

    const handleSpotClick = (spot) => {
        // لو المكان مشغول (red)، ميعملش حاجة
        if (spot.status === 'occupied') return;
        // لو متاح (green)، نخليه selected (blue)
        setSelectedSpot(spot);
    };

    const bookNow = async () => {
        if (!selectedSpot) return;
        try {
            await api.post('/bookings', {
                spot_id: selectedSpot.id,
                start_time: new Date().toISOString(), 
                end_time: new Date(Date.now() + 3600000).toISOString() 
            });
            alert(`تم حجز ${selectedSpot.name} بنجاح ✅`);
            setSelectedSpot(null);
            fetchSpots(); // تحديث الخريطة فوراً
        } catch (err) {
            alert(err.response?.data?.message || "الحجز فشل");
        }
    };

    return (
        <div className="page-wrapper bg-dark min-vh-100 text-white">
            <Navbar />
            
            <div className="container-fluid py-4">
                <div className="row">
                    {/* 1. بار اختيار الدور (Sidebar) */}
                    <div className="col-md-2 mb-4">
                        <div className="card bg-secondary border-0 p-3">
                            <h5 className="text-center mb-3">Floor</h5>
                            {[1, 2, 3].map(floor => (
                                <button 
                                    key={floor}
                                    className={`btn w-100 mb-2 ${currentFloor === floor ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => { setCurrentFloor(floor); setSelectedSpot(null); }}
                                >
                                    Floor {floor}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. منطقة الخريطة (Spots Grid) */}
                    <div className="col-md-10">
                        <div className="card bg-secondary border-0 p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2>Find Your Spot - Floor {currentFloor}</h2>
                                {/* Legend لتوضيح الألوان */}
                                <div className="legend d-flex gap-3">
                                    <span className="badge bg-success">● Available</span>
                                    <span className="badge bg-danger">● Occupied</span>
                                    <span className="badge bg-primary">● Selected</span>
                                </div>
                            </div>

                            {loading ? (
                                <div className="text-center loader">Loading map...</div>
                            ) : (
                                <div className="spots-grid">
                                    {spots.map(spot => (
                                        <div 
                                            key={spot.id}
                                            // بنحدد الكلاس بناءً على الـ status والـ selection
                                            className={`spot-box 
                                                ${spot.status === 'occupied' ? 'occupied' : 'available'} 
                                                ${selectedSpot?.id === spot.id ? 'selected' : ''}`
                                            }
                                            onClick={() => handleSpotClick(spot)}
                                        >
                                            {spot.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. بار الحجز العائم (Booking Box) */}
            {selectedSpot && (
                <div className="booking-bar bg-primary text-white p-3 shadow fixed-bottom">
                    <div className="container d-flex justify-content-between align-items-center">
                        <h4>Spot: {selectedSpot.name} (Floor {currentFloor})</h4>
                        <button className="btn btn-light btn-lg" onClick={bookNow}>Book Now</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GaragesList;