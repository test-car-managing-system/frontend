import { Navigate, Route, Routes } from 'react-router-dom';
import Car from './Car';
import CarDetail from './CarDetail';

const Auth = () => {
  return (
    <Routes>
      <Route path="/" element={<Car />} />
      <Route path="/detail/:id" element={<CarDetail />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Auth;
