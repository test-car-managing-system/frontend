import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';

const Auth = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Auth;
