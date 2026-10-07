import {
  Link,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";

const UsersPage = () => {
  const users = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "asc";

  const updateParam = (name, value) => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);

      if (value) {
        next.set(name, value);
      } else {
        next.delete(name);
      }

      return next;
    }, { replace: true });
  };

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(query.trim().toLowerCase())
    )
    .sort((a, b) =>
      sort === "desc"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    );

  return (
    <section>
      <h1>Пользователи</h1>

      <div className="users-controls">
        <label>
          Поиск по имени
          <input
            type="search"
            placeholder="Например, Leanne"
            value={query}
            onChange={(event) =>
              updateParam("q", event.target.value)
            }
          />
        </label>

        <label>
          Сортировка
          <select
            value={sort}
            onChange={(event) =>
              updateParam("sort", event.target.value)
            }
          >
            <option value="asc">По имени: A → Z</option>
            <option value="desc">По имени: Z → A</option>
          </select>
        </label>
      </div>

      <p>Найдено: {filteredUsers.length}</p>

      <div className="users-grid">
        {filteredUsers.map((user) => (
          <article className="user-card" key={user.id}>
            <h2>
              <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </h2>

            <p>Email: {user.email}</p>
            <p>Город: {user.address.city}</p>
          </article>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p className="status">
          Никого не нашли. Измени поиск.
        </p>
      )}
    </section>
  );
};

export default UsersPage;
