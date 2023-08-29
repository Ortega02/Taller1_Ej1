import React, { useState } from "react";
import { data } from "../data";

export const Header = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");

  const onAddProduct = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }

    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };

  return (
    <header>
      <h1>Tienda de Libros</h1>
      <select value={value} onChange={(event) => setValue(event.target.value)}>
        {data.map((product) => (
          <option key={product.id} value={product.title}>
            {product.title}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          const selectedProduct = data.find(
            (product) => product.title === value
          );
          if (selectedProduct) {
            onAddProduct(selectedProduct);
          }
        }}
      >
        Agregar
      </button>


          <div className={`container-cart-products ${active ? "" : "hidden-cart"}`}>
            {allProducts.length ? (
              allProducts.map((product) => (
                <div className="cart-product" key={product.id}>
                  <div className="info-cart-product">
                    <span className="cantidad-producto-carrito">
                      {product.quantity}
                    </span>
                    <p className="titulo-producto-carrito">{product.title}</p>
                    <span className="precio-producto-carrito">
                      ${product.price}
                    </span>
                  </div>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                    alt="cerrar"
                    className="icon-close"
                    // onClick={() => onDeleteProduct(product)}
                  />
                </div>
              ))
            ) : (
              <p className="cart-empty">El carrito está vacío</p>
            )}
          </div>
         

      <div className="container-icon">
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <div className="count-products">
            <span id="contador-productos">{countProducts}</span>
          </div>
        </div>

      </div>
    </header>
  );
};
