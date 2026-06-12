import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App         from './app/App.tsx';
import Admin       from './app/pages/Admin.tsx';
import Teams       from './app/pages/Teams.tsx';
import TeamProfile from './app/pages/TeamProfile.tsx';
import './styles/index.css';
import './styles/animations.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/teams/:teamId" element={<TeamProfile />} />
    </Routes>
  </BrowserRouter>
);
