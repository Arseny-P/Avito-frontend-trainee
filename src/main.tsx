import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store, persistor, useAppSelector } from './store.ts';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import PagePostsList from './pages/PagePostsList.tsx';
import { ConfigProvider, Spin } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import PagePost from './pages/PagePost.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingOutlined } from '@ant-design/icons';
import PageEdit from './pages/PageEdit.tsx';
import { theme } from 'antd';
import { ThemeSync } from './modules/ColorMode/ThemeSync.tsx';
import { ColorModeSlice } from './modules/ColorMode/ColorMode.slice.ts';

const queryClient = new QueryClient();
const AppConfig = () => {
  const isDark = useAppSelector((state) => ColorModeSlice.selectors.isDark(state));
  const { darkAlgorithm, defaultAlgorithm } = theme;
  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
        token: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: 14,
          colorText: isDark ? "#ffffffdf" : "rgba(0, 0, 0, 0.85)",
          colorTextPlaceholder: isDark ? "rgba(255, 255, 255, 0.3)" : "#707176",
        },
        components: {
          Menu: {
            itemBg: isDark ? '#141414' : '#fff',
            subMenuItemBg: isDark ? '#141414' : '#fff',
          },
        },
      }}
    >
      <ThemeSync /> 
      
      <PersistGate 
        loading={<Spin style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />} 
        persistor={persistor}
      >
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Navigate to="/ads" replace />} />
                <Route path="ads" element={<PagePostsList />}/>
                <Route path='/ads/:id' element={<PagePost />} />
                <Route path='/ads/:id/edit' element={<PageEdit />} />
                <Route path="*" element={<Navigate to="/ads" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </ConfigProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider hashPriority="high">
      <Provider store={store}>
        <AppConfig />
      </Provider>
    </StyleProvider>
  </StrictMode>,
)
