const API = "https://jsonplaceholder.typicode.com/users";

export async function usersLoader({ request }) {
  const response = await fetch(API, {
    signal: request.signal,
  });

  if (!response.ok) {
    throw new Response("Не удалось загрузить пользователей", {
      status: response.status,
    });
  }

  return response.json();
}

export async function userLoader({ params, request }) {
  const response = await fetch(
    `${API}/${encodeURIComponent(params.id)}`,
    { signal: request.signal }
  );

  if (response.status === 404) {
    throw new Response("Пользователь не найден", {
      status: 404,
    });
  }

  if (!response.ok) {
    throw new Response("Не удалось загрузить пользователя", {
      status: response.status,
    });
  }

  const user = await response.json();

  if (!user.id) {
    throw new Response("Пользователь не найден", {
      status: 404,
    });
  }

  return user;
}


