
import './App.css';
import React from 'react';
import Main from './components/Main';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    
     <Router>
        <div>
          <Main/>
        </div>
      </Router>
    
  );
}

export default App;
