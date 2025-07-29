import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Contextapi, ContextApi } from './Contextapi/Contextapi';
import Home from './components/Home';
import Header from './Header';
import Step1form from './components/Pages/Step1form';
import Step2form from './components/Pages/Step2form';
import Print from './components/Pages/Print';
import TrackStatus from './components/Pages/TrackStatus';
import Login from './components/Pages/Login';
import Dashboard from './components/Pages/Dashboard';
import { useState } from 'react';



function App() {
  const [loginName, setLoginName] = useState(localStorage.getItem('loginName'))
  const [role, setRole] = useState(localStorage.getItem('role'))
  return (
    <Contextapi.Provider value={{ role, loginName, setLoginName, setRole }}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/form' element={<Step1form />}></Route >
          <Route path='/step2' element={<Step2form />}></Route >
          <Route path='/print' element={<Print />}></Route >
          <Route path='/track' element={<TrackStatus />}></Route >
          <Route path='/login' element={<Login />}></Route >
          <Route path='/dashboard' element={< Dashboard />}></Route >
        </Routes>
      </Router >
    </Contextapi.Provider>

  );
}

export default App;
