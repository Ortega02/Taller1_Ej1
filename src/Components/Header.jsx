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
  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id);
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };
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
    <header className="header-container">
      <h1>Lista de compras</h1>
      <div>
        <select
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          <option>Agregar elemento</option>
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
      </div>
      <div className={`container-cart-products`}>
        {allProducts.length ? (
          allProducts.map((product) => (
            <div className="cart-product" key={product.id}>
              <div className="info-cart-product">
                <div className="info-cart-product">
                  <p className="titulo-producto-carrito">{product.title}</p>
                  <span className="precio-producto-carrito">
                    ${product.price}
                  </span>
                </div>
              </div>
              <div className="quantity-control-container">
                <button
                  className="quantity-button"
                  onClick={() => {
                    const newQuantity = product.quantity - 1;
                    if (newQuantity >= 1) {
                      const updatedProducts = allProducts.map((item) =>
                        item.id === product.id
                          ? { ...item, quantity: newQuantity }
                          : item
                      );

                      const newTotal = updatedProducts.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      );

                      setTotal(newTotal);
                      setAllProducts(updatedProducts);
                    }
                  }}
                >
                  {"<"}
                </button>
                <span className="product-quantity">{product.quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() => {
                    const newQuantity = product.quantity + 1;
                    const updatedProducts = allProducts.map((item) =>
                      item.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                    );

                    const newTotal = updatedProducts.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    );

                    setTotal(newTotal);
                    setAllProducts(updatedProducts);
                  }}
                >
                  {">"}
                </button>
              </div>

              <img
                src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                alt="cerrar"
                className="icon-close"
                onClick={() => onDeleteProduct(product)}
              />
            </div>
          ))
        ) : (
          <p className="cart-empty">La lista está vacía</p>
        )}
        <div className="cart-total">
          <h3>Total:</h3>
          <span className="total-pagar">${total}</span>
        </div>
      </div>

      <div className="container-icon">
        <div
          className="container-cart-icon"
          onClick={() => setActive(!active)}
        ></div>
      </div>
    </header>
  );
};
