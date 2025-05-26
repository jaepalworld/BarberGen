import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarberMain from './components/BarberMain';
import Hair from './components/home/services/Hair';
import Codi from './components/home/services/Codi';
import Dressup from './components/home/services/Dressup';
import Random from './components/home/services/Random';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* 홈페이지 - 기존 BarberMain 컴포넌트 */}
          <Route path="/" element={<BarberMain />} />

          {/* 서비스 페이지들 */}
          <Route path="/Hair" element={<Hair />} />
          <Route path="/Codi" element={<Codi />} />
          <Route path="/Dressup" element={<Dressup />} />
          <Route path="/Random" element={<Random />} />

          {/* 404 페이지 - 선택사항 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

// 404 페이지 컴포넌트 (선택사항)
const NotFound = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0' }}>404</h1>
      <p style={{ fontSize: '1.5rem', margin: '0 0 2rem 0' }}>페이지를 찾을 수 없습니다</p>
      <button
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#fff',
          color: '#667eea',
          border: 'none',
          borderRadius: '25px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'transform 0.3s ease'
        }}
        onClick={() => window.location.href = '/'}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default App;