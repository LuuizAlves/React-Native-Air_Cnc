import React, {useState} from 'react';

import Router from '../src/routes';
import './App.css';

import logo from './assets/logo.svg';

function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnc" />

      <div className="content">
        <Router/>
      </div>
    </div>
  );
}

export default App;
