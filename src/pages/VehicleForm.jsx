import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../layouts/VehicleForm.css';
import Navbar from '../components/Navbar';
const VehicleForm = () => {



    const handleContinue = async (e) => {
    e.preventDefault();
    try {
        // 1. تسجيل العربية الأول (أو التأكد من وجودها)
        const vehicleRes = await api.post('/vehicles', {
            plate_number: info.plateNumber,
            type: 'car', // ديفولت
            license: info.driverLicenseId,
            model: 'Generic'
        });

        // 2. عمل الحجز (Booking)
        const bookingPayload = {
            spot_id: spot.id,
            vehicle_id: vehicleRes.data.vehicle.id,
            booking_date: times.date,
            start_time: `${times.date} ${times.start}`,
            end_time: `${times.date} ${times.end}`,
        };
        const bookingRes = await api.post('/bookings', bookingPayload);

        // 3. تأكيد الدفع اليدوي (Cash/Fake Payment) عشان يقلب Confirmed
        await api.post(`/payments/${bookingRes.data.id}`);

        alert("تم الحجز بنجاح! تقدر تروح الجراج دلوقتي.");
        navigate('/my-bookings');
    } catch (err) {
        console.error(err);
        alert("حصل مشكلة في الحجز، تأكد من البيانات.");
    }
};


    const location = useLocation();
    const navigate = useNavigate();
    
    const { spot, times } = location.state || {};

    const [info, setInfo] = useState({
        fullName: '',
        phoneNumber: '',
        driverLicenseId: '',
        plateNumber: ''
    });

    useEffect(() => {
        if (!spot || !times) {
            navigate('/booking');
        }
    }, [spot, times, navigate]);

    useEffect(() => {
        api.get('/user')
            .then((res) => {
                setInfo({
                    fullName: res.data.name || '',
                    phoneNumber: res.data.phone || '',
                    driverLicenseId: res.data.license?.number || '',
                    plateNumber: res.data.vehicle?.plate_number || ''
                });
            })
            .catch(() => {});
    }, []);

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

                    <p>
                        Please provide your information for entry access
                    </p>
                </div>

                <form className="details-form" onSubmit={handleContinue}>

                    <div className="field-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            placeholder="John Doe"
                            value={info.fullName}
                            onChange={(e) =>
                                handleChange('fullName', e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label>Phone Number</label>

                        <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={info.phoneNumber}
                            onChange={(e) =>
                                handleChange('phoneNumber', e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label>Driver License / ID</label>

                        <input
                            type="text"
                            placeholder="DL123456789"
                            value={info.driverLicenseId}
                            onChange={(e) =>
                                handleChange('driverLicenseId', e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label>License Plate Number</label>

                        <input
                            type="text"
                            placeholder="ABC-1234"
                            value={info.plateNumber}
                            onChange={(e) =>
                                handleChange('plateNumber', e.target.value)
                            }
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