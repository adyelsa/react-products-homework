import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://dummyjson.com/products?limit=20", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось загрузить товары");
        }
        return response.json();
      })
      .then((data) => setProducts(data.products))
      .catch((error) => {
        if (!controller.signal.aborted) {
          setError(error.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) return <p className="status">Загрузка...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <div className="grid">
      {products.map((product) => {
        const isFavorite = favorites.some(
          (item) => item.id === product.id
        );

        return (
          <article key={product.id} className="card">
            <Link to={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.price}</p>
            </Link>

            <button
              type="button"
              className="favorite-button"
              aria-pressed={isFavorite}
              aria-label={
                isFavorite
                  ? `Убрать ${product.title} из избранного`
                  : `Добавить ${product.title} в избранное`
              }
              onClick={() => dispatch(toggleFavorite(product))}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </article>
        );
      })}
    </div>
  );
};

export default ProductsPage;