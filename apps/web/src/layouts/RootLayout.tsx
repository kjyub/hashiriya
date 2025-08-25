import { Outlet } from 'react-router-dom';

import Header from '@/components/common/Header';

export default function RootLayout() {
  return (
    <div>
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
