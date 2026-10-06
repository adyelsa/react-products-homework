


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError("");
    setProduct(null);

    fetch(`https://dummyjson.com/products/${id}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Не удалось загрузить товар");
        }

        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <p className="status">Загрузка товара...</p>;
  }

  if (error) {
    return (
      <div className="status">
        <p role="alert">{error}</p>
        <Link to="/products">Вернуться в каталог</Link>
      </div>
    );
  }

  if (!product) {
    return <p className="status">Товар не найден</p>;
  }

  return (
    <section className="product-page">
      <Link to="/products" className="back-link">
        ← Назад в каталог
      </Link>

      <div className="product-details">
        <div className="product-image">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="product-info">
          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.title}</h1>

          <p className="product-description">
            {product.description}
          </p>

          <p className="product-price">
            ${product.price.toFixed(2)}
          </p>

          <div className="product-meta">
            {product.brand && (
              <p>Бренд: {product.brand}</p>
            )}
            <p>Рейтинг: {product.rating} / 5</p>
            <p>В наличии: {product.stock} шт.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;






