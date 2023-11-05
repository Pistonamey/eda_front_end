import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetDecisionByFile from './pages/GetDecisionByFile';
import GetDecisionUserInput from './pages/GetDecisionUserInput';
import theme from './utils/themes';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AdvicePage from './pages/AdvicePage';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <div className="App">
      <CssBaseline />
<ThemeProvider theme={theme}>
       <Router>
          <Routes>
            <Route path="/" element={<GetDecisionByFile />} />
            <Route path="/userinput" element={<GetDecisionUserInput />} />
            <Route path="/advice-page" element={<AdvicePage/>} />
            <Route path="/ai_bot" element={<Chatbot/>} />
            </Routes>
        </Router>
        </ThemeProvider>
    </div>
  );
}

export default App;
