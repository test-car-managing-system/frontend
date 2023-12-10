import { Navigate, Route, Routes } from 'react-router-dom';
import TrackSelection from './TrackSelection';
import TrackSelectionDetail from './TrackSelectionDetail';
import TrackReservation from './TrackReservations';
import TrackReservationDetail from './TrackReservationDetail';
import Track from './Track';

const Cars = () => {
  return (
    <Routes>
      <Route path="/" element={<Track />} />
      <Route
        path="/reservations/new/detail/:id"
        element={<TrackSelectionDetail />}
      />
      <Route path="/reservations/new" element={<TrackSelection />} />
      <Route path="/reservations/:id" element={<TrackReservationDetail />} />
      <Route path="/reservations" element={<TrackReservation />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Cars;
