import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavoritesCount } from "../store/favoritesSlice";
import { useThemeStore } from "../store/useThemeStore";

const MainLayout = () => {
  const favoritesCount = useSelector(selectFavoritesCount);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div className={`app theme-${theme}`}>
      <header className="header">
        <nav aria-label="Главное меню">
          <NavLink to="/" end>
            Главная
          </NavLink>

          <NavLink to="/products">
            Каталог
          </NavLink>

          <NavLink to="/users">
            Пользователи
          </NavLink>

          <NavLink to="/about">
            О нас
          </NavLink>
        </nav>

        <div className="header-actions">
          <span aria-live="polite">
            ❤️ Избранное: {favoritesCount}
          </span>

          <button
            type="button"
            className="theme-button"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙 Тёмная тема" : "☀️ Светлая тема"}
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>2026 Geeks Shop</footer>
    </div>
  );
};

export default MainLayout;