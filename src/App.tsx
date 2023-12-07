import { Route, Routes, useLocation } from 'react-router-dom';
import Auth from './pages/auth';
import DashBoard from './pages/dashboard/DashBoard';
import NotFound from './pages/common/NotFound';
import useApiError from './hooks/useApiError';
import { useQueryClient } from 'react-query';
import LayoutMenu from './components/layout/LayoutTemplate';

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
    <LayoutMenu>
      <Routes key={location.pathname} location={location}>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/" element={<DashBoard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LayoutMenu>
  );
}

export default App;
