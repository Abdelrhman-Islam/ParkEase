import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ضيف دي
import api from '../api/axios';
import '../layouts/GarageMap.css';
import ParkingSpot from '../components/ParkingSpot';
    
const GarageMap = () => {
    const navigate = useNavigate(); // تعريف الـ navigate
    const [spots, setSpots] = useState([]);
    const [levels, setLevels] = useState([]); 
    const [currentLevel, setCurrentLevel] = useState(null);
    const [selectedSpot, setSelectedSpot] = useState(null);

    useEffect(() => {
        api.get('/spots').then(res => {
            const data = res.data;
            setSpots(data);
            
            const uniqueLevels = [...new Set(data.map(s => s.floor))].sort();
            setLevels(uniqueLevels);
            if (uniqueLevels.length > 0) setCurrentLevel(uniqueLevels[0]);
        });
    }, []);

    const handleBooking = (spot) => {
        // حساب الوقت تلقائياً: دلوقتي و بعد ساعة
        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); 

        // نبعت البيانات لصفحة الـ vehicle-form
        navigate('/vehicle-form', { 
            state: { 
                spot, 
                currentLevel,
                times: {
                    start: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    end: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            } 
        });
    };

    const renderRows = () => {
        const levelSpots = spots
            .filter(s => String(s.floor) === String(currentLevel))
            .sort((a, b) => a.id - b.id);

        if (levelSpots.length === 0) return <div className="text-muted p-5">No spots found.</div>;

        const spotsPerRow = 10;
        const rows = [];
        for (let i = 0; i < levelSpots.length; i += spotsPerRow) {
            rows.push(levelSpots.slice(i, i + spotsPerRow));
        }

        return rows.map((rowItems, index) => (
            <div key={index} className="parking-row-group">
                <div className="row-label">R{index + 1}</div> 
                <div className="parking-row">
                    {rowItems.map(spot => (
                        <ParkingSpot 
                            key={spot.id} 
                            spot={spot} 
                            isSelected={selectedSpot?.id === spot.id} 
                            onSelect={setSelectedSpot} 
                        />
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div className="parking-wrapper">
            <div className="parking-container">
                <div className="levels-sidebar">
                    {levels.map((lvl, index) => (
                        <button
                            key={lvl}
                            className={`level-btn ${currentLevel === lvl ? 'active' : ''}`}
                            onClick={() => { setCurrentLevel(lvl); setSelectedSpot(null); }}
                        >
                            L{index + 1}
                        </button>
                    ))}
                </div>

                <div className="map-card">
                    <div className="map-header">
                        <span className="current-lvl-text">Level {currentLevel}</span>
                        <div className="map-legend">
                            <span className="legend-item"><i className="box available"></i> Available</span>
                            <span className="legend-item"><i className="box occupied"></i> Occupied</span>
                            <span className="legend-item"><i className="box selected"></i> Selected</span>
                        </div>
                    </div>

                    <div className="parking-grid-area">
                        <div className="entrance-tag">Entrance →</div>
                        <div className="rows-container">
                            {renderRows()}
                        </div>
                    </div>
                </div>
            </div>
            
            {selectedSpot && (
                <div className="booking-card-overlay">
                    <div className="booking-card">
                        <div className="booking-info">
                            <h3 className="spot-title">Spot {selectedSpot.name}</h3>
                            <p className="spot-subtitle">Level L{currentLevel} • Available Now</p>
                        </div>
                        <button className="book-now-btn" onClick={() => handleBooking(selectedSpot)}>
                            Book Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GarageMap;