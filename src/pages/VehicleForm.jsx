import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../layouts/VehicleForm.css';
import Navbar from '../components/Navbar';

const VehicleForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { spot, times } = location.state || {};

    // سحب بيانات اليوزر المخزنة في الـ localStorage لو موجودة كقيمة مبدئية
    const savedUser = JSON.parse(localStorage.getItem('user')) || {};

    const [info, setInfo] = useState({
        fullName: savedUser.name || '',
        phoneNumber: savedUser.phone || '',
        driverLicenseId: savedUser.license?.number || '',
        plateNumber: savedUser.vehicle?.plate_number || ''
    });

    useEffect(() => {
        if (!spot || !times) {
            navigate('/booking');
        }
    }, [spot, times, navigate]);

    // الـ Effect ده هيفضل شغال عشان يضمن إن البيانات دي محدثة دايماً من السيرفر
    useEffect(() => {
        api.get('/user')
            .then((res) => {
                setInfo({
                    fullName: res.data.name || '',
                    phoneNumber: res.data.phone || '',
                    driverLicenseId: res.data.license?.number || '',
                    plateNumber: res.data.vehicle?.plate_number || ''
                });
                // تحديث كاش الـ localStorage بالبيانات الجديدة الجاية من السيرفر
                localStorage.setItem('user', JSON.stringify(res.data));
            })
            .catch(() => {});
    }, []);

    const handleContinue = async (e) => {
        e.preventDefault();
        try {
            const startTime = new Date(`${times.date}T${times.start}:00`).toISOString();
            const endTime = new Date(`${times.date}T${times.end}:00`).toISOString();

            await api.post('/bookings', {
                spot_id: spot.id,
                plate_number: info.plateNumber,
                booking_date: times.date,
                start_time: startTime,
                end_time: endTime,
            });

            alert("تم الحجز بنجاح!");
            navigate('/my-bookings');
        } catch (err) {
            console.error("Booking failed:", err.response?.data || err.message);
            alert(err.response?.data?.message || "حصل خطأ أثناء الحجز");
        }
    };

    const handleChange = (field, value) => {
        setInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <>
        <Navbar/>
        <main className="vehicle-page">
            <section className="form-card">
                <button
                    className="back-link"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <div className="hero">
                    <h1>Vehicle & Driver Details</h1>
                    <p>Please provide your information for entry access</p>
                </div>

                <form className="details-form" onSubmit={handleContinue}>
                    <div className="field-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={info.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={info.phoneNumber}
                            onChange={(e) => handleChange('phoneNumber', e.target.value)}
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label>Driver License / ID</label>
                        <input
                            type="text"
                            placeholder="DL123456789"
                            value={info.driverLicenseId}
                            onChange={(e) => handleChange('driverLicenseId', e.target.value)}
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label>License Plate Number</label>
                        <input
                            type="text"
                            placeholder="ABC-1234"
                            value={info.plateNumber}
                            onChange={(e) => handleChange('plateNumber', e.target.value)}
                            required
                        />
                    </div>

                    <p className="note">
                        Your plate number will be used to generate your entry pass for gate access.
                    </p>

                    <button type="submit" className="submit-btn">
                        Continue to Payment
                    </button>
                </form>
            </section>
        </main>
        </>
    );
};

export default VehicleForm;