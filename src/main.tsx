import { createRoot } from 'react-dom/client';
import App   from './app/App.tsx';
import Admin from './app/pages/Admin.tsx';
import './styles/index.css';
import './styles/animations.css';

const isAdmin = window.location.pathname.startsWith('/admin');

createRoot(document.getElementById('root')!).render(
  isAdmin ? <Admin /> : <App />
);
