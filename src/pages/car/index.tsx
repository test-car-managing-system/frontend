import { Navigate, Route, Routes } from 'react-router-dom';
import Car from './Car';
import CarDetail from './CarDetail';
import CarRegister from './CarRegister';
import CarStocks from './CarStocks';

const Cars = () => {
  return (
    <Routes>
      <Route path="/" element={<Car />} />
      <Route path="/stocks" element={<CarStocks />} />
      <Route path="/register" element={<CarRegister />} />
      <Route path="/detail/:id" element={<CarDetail />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Cars;
