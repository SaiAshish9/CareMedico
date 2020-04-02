import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage'

import Dashboard from './pages/dashboard/dashboard'

import {Switch,Route} from 'react-router-dom'


function App() {
  return (
    <div style={{overflowX:'hidden',background:'#f4f4f4',minHeight:'100vh',width:'100%'}}>
      

<Switch>
  <Route exact path="/" component={Dashboard}/>
  <Route   path="/dashboard" component={Dashboard}/>
</Switch>

    </div>
  );
}

export default App;
