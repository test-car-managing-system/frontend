import { Navigate, Route, Routes } from 'react-router-dom';
import useApiError from '../../hooks/useApiError';
import { useQueryClient } from 'react-query';
import Members from './Members';
import MemberDetail from './MemberDetail';
import MemberRegister from './MemberRegister';

const Member = () => {
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
      <Route path="/" element={<Members />} />
      <Route path="/detail/:id" element={<MemberDetail />} />
      <Route path="/register" element={<MemberRegister />} />
      <Route path="/me" element={<Members />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Member;
