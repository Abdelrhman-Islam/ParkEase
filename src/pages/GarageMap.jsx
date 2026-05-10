import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const GaragesList = () => {
    const [garages, setGarages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/garages').then(res => setGarages(res.data));
    }, []);

    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="container mt-5">
                <h1 className="text-white mb-4">Available Garages</h1>
                <div className="row">
                    {garages.map(garage => (
                        <div key={garage.id} className="col-md-4 mb-4">
                            <div 
                                className="card bg-dark text-white border-primary h-100" 
                                style={{ cursor: 'pointer', transition: '0.3s' }}
                                onClick={() => navigate(`/map/${garage.id}`)}
                            >
                                <div className="card-body text-center">
                                    <h3 className="card-title">{garage.name}</h3>
                                    <p className="card-text text-muted">{garage.location}</p>
                                    <button className="btn btn-outline-primary mt-3">View Map</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GaragesList;