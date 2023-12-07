import { Navigate, Route, Routes } from 'react-router-dom';
import Car from './Car';
import LayoutMenu from '../../components/layout/LayoutTemplate';

const Auth = () => {
  return (
    <Routes>
      <Route path="/" element={<Car />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Auth;
