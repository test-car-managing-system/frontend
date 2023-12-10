import { Navigate, Route, Routes } from 'react-router-dom';
import Car from './Car';
import CarDetail from './CarDetail';
import CarRegister from './CarRegister';
import CarStocks from './CarStocks';
import CarSelection from './CarSelection';
import CarSelectionDetail from './CarSelectionDetail';
import CarReservation from './CarReservation';

const Cars = () => {
  return (
    <Routes>
      <Route path="/" element={<Car />} />
      <Route path="/stocks" element={<CarStocks />} />
      <Route path="/reservations" element={<CarReservation />} />
      <Route path="/reservations/new" element={<CarSelection />} />
      <Route path="/reservations/new/:id" element={<CarSelectionDetail />} />
      <Route path="/register" element={<CarRegister />} />
      <Route path="/detail/:id" element={<CarDetail />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Cars;
