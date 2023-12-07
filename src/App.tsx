import { Route, Routes, useLocation } from 'react-router-dom';
import DashBoard from './pages/dashboard/DashBoard';
import NotFound from './pages/common/NotFound';

function App() {
  const location = useLocation();
  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<DashBoard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
