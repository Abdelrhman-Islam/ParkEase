import React from 'react';
import '../layouts/ParkingSpot.css';

const ParkingSpot = ({ spot, isSelected, onSelect }) => {
    // تحديد الحالة: متاح، مشغول، أو تم اختياره
    const status = spot.status === 'occupied' ? 'occupied' : (isSelected ? 'selected' : 'available');

    return (
        <div 
            className={`parking-spot ${status}`} 
            onClick={() => spot.status === 'available' && onSelect(spot)}
        >
            {/* عرض اسم الـ Spot (A1, B5, etc) */}
            <span className="spot-name">{spot.name}</span>
        </div>
    );
};

export default ParkingSpot;