import { Outlet } from 'react-router-dom';

import Header from '@/components/common/Header';

export default function RootLayout() {
  return (
    <div className="min-h-dvh">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
