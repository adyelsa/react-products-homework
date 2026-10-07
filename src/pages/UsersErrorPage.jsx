


import {
  Link,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";

const UsersErrorPage = () => {
  const error = useRouteError();
  const isResponse = isRouteErrorResponse(error);

  const title =
    isResponse && error.status === 404
      ? "Пользователь не найден"
      : "Не удалось загрузить данные";

  return (
    <section className="status" role="alert">
      <h1>{title}</h1>



      <p>
        {isResponse
          ? `Код ошибки: ${error.status}`
          : "Проверь подключение к интернету и попробуй снова."}
      </p>

      <Link to="/users">← Назад к списку</Link>
    </section>
  );
};

export default UsersErrorPage;


