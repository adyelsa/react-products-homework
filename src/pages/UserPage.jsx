


import { Link, useLoaderData } from "react-router-dom";



const UserPage = () => {

    const user = useLoaderData();

  return (
    <section className="user-page">
      <Link to="/users" className="back-link">
        ← Назад к списку
      </Link>



      <article className="user-card">
        <h1>{user.name}</h1>
        <p>Email: {user.email}</p>
        <p>Телефон: {user.phone}</p>
        <p>Город: {user.address.city}</p>
        <p>Компания: {user.company.name}</p>
      </article>
    </section>
  );
};

export default UserPage;

