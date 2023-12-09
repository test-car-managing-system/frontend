import { Navigate, Route, Routes } from 'react-router-dom';
import Track from './Track';

const Cars = () => {
  return (
    <Routes>
      <Route path="/" element={<Track />} />
      <Route path="/reservations/new" element={<Track />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Cars;
