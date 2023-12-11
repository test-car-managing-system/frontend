import { Route, Routes, useLocation } from 'react-router-dom';
import DashBoard from './pages/dashboard/DashBoard';
import NotFound from './pages/common/NotFound';
import useApiError from './hooks/useApiError';
import { useQueryClient } from 'react-query';
import Template from './components/layout/Template';
import Car from './pages/car';
import Member from './pages/member';
import Track from './pages/track';
import GasStation from './pages/gas';
import MyPage from './pages/member/MyPage';

function App() {
  const location = useLocation();
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
    <Template>
      <Routes key={location.pathname} location={location}>
        <Route path="/cars/*" element={<Car />} />
        <Route path="/members/*" element={<Member />} />
        <Route path="/gas/*" element={<GasStation />} />
        <Route path="/tracks/*" element={<Track />} />
        <Route path="/me" element={<MyPage />} />
        <Route path="/" element={<DashBoard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Template>
  );
}

export default App;
