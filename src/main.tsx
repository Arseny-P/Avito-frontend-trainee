import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store } from './store.ts';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import PagePostsList from './pages/PagePostsList.tsx';
import { ConfigProvider, Grid } from 'antd';

const queryClient = new QueryClient();
// const { useBreakpoint } = Grid;

// const screens = useBreakpoint();

// const getFontSize = () => {
//   if (screens.xxl) return 16;
//   if (screens.md) return 14;
//   return 12;
// };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
    theme={{
      token: {
        fontFamily: 'Roboto, system-ui, sans-serif',
        fontSize: 14,
        colorText: "rgba(0, 0, 0, 0.85)",
      },
    }}
  >
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Navigate to="/abs" replace />} />
              <Route path="abs" element={<PagePostsList />}/>
            </Route>
          </Routes>
        </BrowserRouter>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </ConfigProvider>
  </StrictMode>,
)
