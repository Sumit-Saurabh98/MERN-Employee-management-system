import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../component/Login';
import Signup from '../component/Signup';
import EmployeeDashboard from '../component/EmployeeDashboard';
function AllRoutes(props) {
    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/dashboard' element={<EmployeeDashboard/>}/>
        </Routes>
    );
}

export default AllRoutes;