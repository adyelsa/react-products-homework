import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";

import UsersPage from "./pages/UsersPage";
import UserPage from "./pages/UserPage";
import UsersErrorPage from "./pages/UsersErrorPage";
import { usersLoader, userLoader } from "./usersLoaders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: (
      <p className="status">Загрузка...</p>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "users",
        loader: usersLoader,
        element: <UsersPage />,
        errorElement: <UsersErrorPage />,
        shouldRevalidate: ({
          currentUrl,
          nextUrl,
          defaultShouldRevalidate,
        }) => {
          if (
            currentUrl.pathname === nextUrl.pathname &&
            currentUrl.search !== nextUrl.search
          ) {
            return false;
          }

          return defaultShouldRevalidate;
        },
      },
      {
        path: "users/:id",
        loader: userLoader,
        element: <UserPage />,
        errorElement: <UsersErrorPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);