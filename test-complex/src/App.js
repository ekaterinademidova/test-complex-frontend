import React from 'react';
import './App.css';
import styled from 'styled-components';
import {Route, BrowserRouter as Router, NavLink, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';

const Nav = styled.nav`
  height: 50px;
  width: 100%;
  background-color: #8DD2E8; 
  line-height: 50px; 
  display: flex;
  justify-content: flex-end;
`;

const Footer = styled.footer`
  height: 50px;
  width: 100%;
  padding: 0 30px;
  background-color: #8DD2E8; 
  line-height: 50px; 
  position: absolute
  display: flex;
  justify-content: flex-start;
`;

function App() {
  return (
    <Router>
      <div className='container'>
        <Nav>
          <NavLink to='/' className='nav-link'>Home</NavLink>
          <NavLink to='/dashboard' className='nav-link'>Dashboard</NavLink>
          <NavLink to='/login' className='nav-link'>Login</NavLink>
        </Nav>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <Footer>
          Test Complex, 2021
        </Footer>
      </div>
    </Router>
  );
}

export default App;
