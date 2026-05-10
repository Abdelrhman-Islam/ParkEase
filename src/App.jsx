import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Login from './pages/auth/Login'; // هتعملهم بعدين بنفس الستايل
import Register from './pages/auth/Register';
import GarageMap from './pages/GarageMap';
import MyBookings from './pages/MyBookings';
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
        
        {/* صفحة الجراجات بعد اللوجين */}
        <Route path="/garages" element={<GarageMap />} />
      </Routes>
    </Router>
  );
}

export default App;