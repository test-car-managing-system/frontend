import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from './common/theme';
import { GlobalStyle } from './common/global-theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutMenu from './components/layout/LayoutTemplate';
import Auth from './pages/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const queryClient = new QueryClient();
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Routes key={location.pathname} location={location}>
          <Route path="/auth/*" element={<Auth />} />
          <Route
            path="*"
            element={
              <LayoutMenu>
                <App />
              </LayoutMenu>
            }
          />
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
