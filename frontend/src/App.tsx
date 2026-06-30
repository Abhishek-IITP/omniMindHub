import  { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');

  useEffect(() => {
    const savedTheme = localStorage.getItem('omnimind_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  if (view === 'landing') {
    return <LandingPage onEnter={() => setView('app')} />;
  }

  return <Dashboard onBackToLanding={() => setView('landing')} />;
}
