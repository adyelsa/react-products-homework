import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="app">
      <header className="header">
        <nav aria-label="Главное меню">
          <NavLink to="/" end>Главная</NavLink>
          <NavLink to="/products">Каталог</NavLink>
          <NavLink to="/about">О нас</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>2026 Geeks Shop</footer>
    </div>
  );
};

export default MainLayout;