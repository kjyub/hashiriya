import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
import NotFound from '@/pages/NotFound';
import ScheduleEditPage from '@/pages/schedule/ScheduleEditPage';
import ScheduleListPage from '@/pages/schedule/ScheduleListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <NotFound />, // 루트 에러 경계
    children: [
      { index: true, element: <ScheduleListPage /> },
      { path: 'schedule', element: <ScheduleListPage /> },
      { path: 'schedule/write', element: <ScheduleEditPage /> },
      { path: 'schedule/edit/:id', element: <ScheduleEditPage /> },
      //   { path: 'about', element: <About /> },

      // 보호 라우트 예시
      //   {
      //     element: <RequireAuth />, // 가드(로그인 안 하면 리다이렉트)
      //     children: [
      //       {
      //         path: 'dashboard',
      //         element: <DashboardLayout />,
      //         children: [
      //           { index: true, lazy: DashIndex },
      //           { path: 'settings', lazy: DashSettings },
      //         ],
      //       },
      //     ],
      //   },

      //   // 예: 접근하면 로그인으로 보내는 redirect 라우트
      //   {
      //     path: 'login-redirect',
      //     loader: () => redirect('/login'),
      //   },

      //   { path: 'login', element: <Login /> },
      { path: '*', element: <NotFound /> }, // 404
    ],
  },
]);
