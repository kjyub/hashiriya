// styles
// import '@/styles/globals.css';

import { NavLink, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div>
      <header className="p-4 border-b">
        <nav className="flex gap-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
