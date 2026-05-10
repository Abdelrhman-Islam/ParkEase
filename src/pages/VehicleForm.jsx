import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../layouts/VehicleForm.css';

const VehicleForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // استقبال البيانات من صفحة الخريطة
    const { spot, currentLevel, times } = location.state || {};

    const [formData, setFormData] = useState({
        plate_number: '',
        vehicle_type: 'Sedan'
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // سحب بيانات اليوزر من الـ API (الملف الشخصي)
        api.get('/user-profile')
            .then(res => {
                if (res.data.vehicle) {
                    setFormData({
                        plate_number: res.data.vehicle.plate_number || '',
                        vehicle_type: res.data.vehicle.type || 'Sedan'
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Couldn't fetch user data", err);
                setLoading(false);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // نقل كل البيانات لصفحة الدفع
        navigate('/payment', { 
            state: { 
                spot, 
                currentLevel, 
                times, 
                vehicle: formData 
            } 
        });
    };

    if (loading) return <div className="loading">Loading user data...</div>;

    return (
        <div className="vehicle-wrapper">
            <div className="vehicle-card">
                <div className="booking-summary-mini">
                    <span>Spot: <strong>{spot?.name}</strong></span>
                    <span>Level: <strong>L{currentLevel}</strong></span>
                    <span>Time: <strong>{times?.start} - {times?.end}</strong></span>
                </div>

                <h2 className="form-title">Vehicle Details</h2>
                <p className="form-desc">Confirm or update your vehicle info</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Car Plate Number</label>
                        <input 
                            type="text" 
                            value={formData.plate_number}
                            onChange={(e) => setFormData({...formData, plate_number: e.target.value})}
                            placeholder="Ex: 123 ABC"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Vehicle Type</label>
                        <select 
                            value={formData.vehicle_type}
                            onChange={(e) => setFormData({...formData, vehicle_type: e.target.value})}
                        >
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Motorcycle">Motorcycle</option>
                            <option value="Truck">Truck</option>
                        </select>
                    </div>

                    <button type="submit" className="next-btn">Continue to Payment</button>
                </form>
            </div>
        </div>
    );
};

export default VehicleForm;