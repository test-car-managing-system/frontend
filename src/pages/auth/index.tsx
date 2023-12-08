import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import useApiError from '../../hooks/useApiError';
import { useQueryClient } from 'react-query';

const Auth = () => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  queryClient.setDefaultOptions({
    queries: {
      retry: false,
      onError: (error: any) => {
        handleError(error);
      },
    },
  });

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Auth;
