import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import '../layouts/VehicleForm.css';

const AddVehicle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    
    // الاحتفاظ بالـ state القادم من صفحة الحجز (spot, times, total)
    const bookingState = location.state || {};

    const [vehicle, setVehicle] = useState({
        plate_number: '',
        model: '',
        type: 'car',
        license: '',
        color: 'Black'
    });

    const handleAddVehicle = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/vehicles', vehicle);
            
            if (response.status === 201 || response.status === 200) {
                alert("Vehicle Added Successfully! ");
                
                // نرجع لصفحة الفورم وبنبعت الـ booking state كاملة
                // وبنمرر معاها الـ newlyAddedVehicle عشان نختارها تلقائياً هناك
                navigate('/vehicle-form', {
                    state: {
                        ...bookingState,
                        newlyAddedVehicle: response.data // الباكيند هيرجع الـ vehicle object كامل بالـ ID
                    }
                });
            }
        } catch (error) {
            console.error("Error adding vehicle:", error.response?.data);
            alert("Failed to add vehicle. Please check your data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar/>
            <div className="vehicle-page">
                <div className="vehicle-card">
                    {/* Back button تحسباً لو اليوزر غير رأيه وعايز يرجع من غير ما يضيف */}
                    <button 
                        className="back-btn" 
                        onClick={() => navigate('/vehicle-form', { state: bookingState })}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '15px' }}
                    >
                        ← Cancel
                    </button>

                    <h2 className="form-title">Add New Vehicle</h2>
                    <p className="form-desc">Register your vehicle details</p>

                    <form onSubmit={handleAddVehicle}>
                        {/* Plate Number */}
                        <div className="input-wrapper">
                            <label>Plate Number</label>
                            <div className="field">
                                <input 
                                    type="text" 
                                    placeholder="ABC-123"
                                    value={vehicle.plate_number}
                                    onChange={(e) => setVehicle({...vehicle, plate_number: e.target.value})}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Model */}
                        <div className="input-wrapper">
                            <label>Vehicle Model</label>
                            <div className="field">
                                <input 
                                    type="text" 
                                    placeholder="Toyota Corolla 2024"
                                    value={vehicle.model}
                                    onChange={(e) => setVehicle({...vehicle, model: e.target.value})}
                                    required 
                                />
                            </div>
                        </div>

                        {/* License */}
                        <div className="input-wrapper">
                            <label>License Number</label>
                            <div className="field">
                                <input 
                                    type="text" 
                                    placeholder="LIC-9988"
                                    value={vehicle.license}
                                    onChange={(e) => setVehicle({...vehicle, license: e.target.value})}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Color & Type Grid */}
                        <div className="time-grid">
                            <div className="input-wrapper">
                                <label>Color</label>
                                <div className="field">
                                    <input 
                                        type="text" 
                                        placeholder="Black"
                                        value={vehicle.color}
                                        onChange={(e) => setVehicle({...vehicle, color: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <label>Type</label>
                                <div className="field">
                                    <select 
                                        value={vehicle.type} 
                                        onChange={(e) => setVehicle({...vehicle, type: e.target.value})}
                                    >
                                        <option value="car">Car</option>
                                        <option value="motorcycle">Motorcycle</option>
                                        <option value="truck">Truck</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="confirm-btn" disabled={loading}>
                            {loading ? "Adding..." : "Add Vehicle"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddVehicle;