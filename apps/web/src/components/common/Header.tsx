import { cn } from '@ui';
import { NavLink } from 'react-router';

export default function Header() {
  return (
    <header className="max-md:hidden sticky z-50 top-0 inset-x-0 flex flex-col justify-end w-full h-14">
      <nav
        className={cn([
          'flex justify-between h-10',
          '[&>div.nav]:flex [&>div.nav]:items-center [&>div.nav]:h-full [&>div.nav]:gap-2',
          '[&>div.nav]:bg-gradient-to-t [&>div.nav]:from-[#474f81]/50 [&>div.nav]:to-[#565c95]/50',
          '[&>div.nav]:backdrop-blur-lg',
          '[&_a.nav]:px-4 [&_a.nav]:text-white/80 [&_a.nav]:hover:text-white [&_a.nav]:text-base [&_a.nav]:transition-colors',
          '[&_a.nav.active]:text-amber-300',
        ])}
      >
        <Navigation />
        <UserMenu />
      </nav>
    </header>
  );
}

const Navigation = () => {
  return (
    <div className="nav pl-4 pr-12 [clip-path:polygon(0%_0%,100%_0%,calc(100%-36px)_100%,0%_100%)]">
      <NavLink to="/" className="px-2 text-base text-white text-shadow-light font-semibold">
        HASHRIYA
      </NavLink>
      <NavLink to="/schedule" className="nav">
        스케줄
      </NavLink>
      <NavLink to="/record" className="nav">
        기록
      </NavLink>
    </div>
  );
};

const UserMenu = () => {
  return (
    <div className="nav pl-12 pr-4 [clip-path:polygon(36px_0%,100%_0%,100%_100%,0_100%)]">
      <NavLink to="/" className="nav">
        로그인
      </NavLink>
    </div>
  );
};
