import { Navigate, Route, Routes } from 'react-router-dom';
import TrackSelection from './TrackSelection';
import TrackSelectionDetail from './TrackSelectionDetail';

const Cars = () => {
  return (
    <Routes>
      <Route path="/" element={<TrackSelection />} />
      <Route
        path="/reservations/new/detail/:id"
        element={<TrackSelectionDetail />}
      />
      <Route path="/reservations/new" element={<TrackSelection />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Cars;
