import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store, persistor } from './store.ts';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import PagePostsList from './pages/PagePostsList.tsx';
import { ConfigProvider, Spin } from 'antd';
import PagePost from './pages/PagePost.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingOutlined } from '@ant-design/icons';
import PageEdit from './pages/PageEdit.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
    theme={{
      token: {
        fontFamily: 'Roboto, system-ui, sans-serif',
        fontSize: 14,
        colorText: "rgba(0, 0, 0, 0.85)",
      },
      components: {
        Menu: {
          itemBg: '#fff',
          subMenuItemBg: '#fff',
        },
      },
    }}
  >
    <Provider store={store}>
      <PersistGate loading={<Spin style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
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
    </Provider>
  </ConfigProvider>
  </StrictMode>,
)
