import { Navigate, Route, Routes } from 'react-router-dom';
import GasStationHistory from './GasStationHistory';
import GasStationHistoryDetail from './GasStationHistoryDetail';

const GasStation = () => {
  return (
    <Routes>
      <Route path="/history" element={<GasStationHistory />} />
      <Route path="/history/detail/:id" element={<GasStationHistoryDetail />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default GasStation;
