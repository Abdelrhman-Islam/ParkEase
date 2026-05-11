import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Login from './pages/auth/Login'; // هتعملهم بعدين بنفس الستايل
import Register from './pages/auth/Register';
import GarageMap from './pages/GarageMap';
import MyBookings from './pages/MyBookings';
import VehicleForm from './pages/VehicleForm';
import Booking from './pages/Booking';

import ProtectedRoute from './guards/ProtectedRoute';

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Onboarding />} />
        
        {/* صفحات الـ Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        

        <Route element={<ProtectedRoute />}>

          <Route path="/garages" element={<GarageMap />} />
          <Route path='/vehicle-form' element = {<VehicleForm/>}/>
          <Route path='/booking' element = {<Booking/>}/>

        </Route>


      </Routes>
    </Router>
  );
}

export default App;