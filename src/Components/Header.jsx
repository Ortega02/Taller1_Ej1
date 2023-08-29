import { useState } from 'react';
import { data } from "../data";
import Select from 'react-select';
export const Header = ({
    allProducts,
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal,
}) => {
    const [active, setActive] = useState(false);
   /* const onDeleteProduct = product => {
        const results = allProducts.filter(
            item => item.id !== product.id
        );
        setTotal(total - product.price * product.quantity);
        setCountProducts(countProducts - product.quantity);
        setAllProducts(results);
    };*/
    const onAddProduct = product => {
        if (allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setTotal(total + product.price * product.quantity); setCountProducts(countProducts + product.quantity);
            return setAllProducts([...products]);
        }
        setTotal(total + product.price * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);
    };
    return (
        <header>
            <h1>Tienda de Libros</h1>
            <div className='container-icon'>

                <div
                    className='container-cart-icon'
                    onClick={() => setActive(!active)}
                >
                   
                    <div className='count-products'>
                        <span id='contador-productos'>{countProducts}</span>
                    </div>
                </div>
                <div
                    className={`container-cart-products ${active ? '' : 'hidden-cart'
                        }`}
                >
                     <div className='container-items'>

<select>
        {data.map(product => (
          <option key={product.id} value={product.id}>{product.title}</option>
        ))}
      </select>
<button onClick={() => onAddProduct(product)}>Agregar</button>
        </div>
                    {allProducts.length ? (
                        <>
                            <div className='row-product'>
                                {allProducts.map(product => (
                                    <div className='cart-product'
                                        key={product.id}>
                                        <div className='info-cart-product'>
                                            <span
                                                className='cantidad-producto-carrito'>
                                                {product.quantity}
                                            </span>
                                            <p
                                                className='titulo-producto-carrito'>
                                                {product.title}
                                            </p>
                                            <span
                                                className='precio-producto-carrito'>
                                                ${product.price}
                                            </span>
                                            <img
                                                src={product.urlImage}  // Use the 'img' property for the image source
                                                alt={product.title}
                                                className='imagen-producto-carrito'
                                            />
                                        </div>
                                        <img
                                            src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                                            alt="cerrar"
                                            className="icon-close"
                                           // onClick={() => onDeleteProduct(product)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='cart-total'>
                                <h3>Total:</h3>
                                <span className='total-pagar'>${total}</span>
                            </div>
                        </>
                    ) : (
                        <p className='cart-empty'>El carrito está vacío</p>
                    )}
                </div>
            </div>
        </header>
    );
};