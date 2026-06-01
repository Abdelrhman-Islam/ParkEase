import React from 'react';
import '../layouts/ParkingSpot.css';

const ParkingSpot = ({ spot, isSelected, onSelect }) => {
    const isOccupied = spot.status === 'occupied';
    
    // تحديد الكلاس المناسب بناءً على الحالة
    const statusClass = isOccupied ? 'occupied' : (isSelected ? 'selected' : 'available');

    const handleClick = () => {
        if (!isOccupied && onSelect) {
            onSelect(spot);
        }
    };

    return (
        <div 
            className={`parking-spot ${statusClass}`} 
            onClick={handleClick}
            // تحسين الـ UX: منع الـ click تماماً لو مشغول عشان الـ CSS hover ميبقاش مربك
            style={{ cursor: isOccupied ? 'not-allowed' : 'pointer' }}
            // دعم قارئات الشاشة (Accessibility)
            role="button"
            aria-pressed={isSelected}
            aria-disabled={isOccupied}
        >
            <span className="spot-name">{spot.name}</span>
        </div>
    );
};

// استخدام React.memo لمنع إعادة ريندر الأماكن التانية اللي متأثرتش بالاختيار
export default React.memo(ParkingSpot, (prevProps, nextProps) => {
    return (
        prevProps.isSelected === nextProps.isSelected &&
        prevProps.spot.status === nextProps.spot.status &&
        prevProps.spot.name === nextProps.spot.name
    );
});