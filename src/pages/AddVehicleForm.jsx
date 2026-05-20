import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../layouts/VehicleForm.css'; // نفس التنسيق عشان التوحيد

const AddVehicle = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
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
            // الإرسال للباك إند الجديد
            const response = await api.post('/vehicles', vehicle);
            
            if (response.status === 201 || response.status === 200) {
                alert("Vehicle Added Successfully! 🚗");
                // بعد الإضافة بنرجعه يكمل الـ Flow بتاع الحجز
                navigate(-1); 
            }
        } catch (error) {
            console.error("Error adding vehicle:", error.response?.data);
            alert("Failed to add vehicle. Please check your data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vehicle-page">
            <div className="vehicle-card">
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
                                    onChange={(e) => setVehicle({...vehicle, color: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <label>Type</label>
                            <div className="field">
                                <select onChange={(e) => setVehicle({...vehicle, type: e.target.value})}>
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
    );
};

export default AddVehicle;